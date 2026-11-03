// Production entrypoint (replaces build/index.js).
//
// svelte-adapter-bun serves prerendered pages and static assets directly, so
// hooks.server.ts never runs for them. This wrapper adds the security headers
// to every response, prerendered or server-rendered.
// Run with `bun --smol serve.js` (see Dockerfile).
import process from 'node:process';
import { getHandler } from './build/handler.js';

// The site is a statement at `/` and `/om-prosjektet`, with the old site under `/demo`.
// These run here rather than in hooks.server.ts because prerendered pages and static
// files never reach the hooks.

// First path segments of the old site. They go to the statement, not to the demo.
const OLD_PATHS =
	/^\/(baerekraft|bedrift|bestill-time|bli-kunde|glemt-passord|investor|karriere|kontakt|login|om-oss|personvern|privat|sikkerhet|sparing|tilgjengelighet|tjenester)(\/|$)/;

// Everything else gets noindex: /demo, /_app, errors, and any path added later.
const INDEXABLE = new Set([
	'/',
	'/om-prosjektet',
	'/robots.txt',
	'/sitemap.xml',
	'/favicon.png',
	'/.well-known/security.txt'
]);

// Short, so a stale copy can't sit in the CDN for hours.
const DISCOVERY_PATHS = new Set(['/robots.txt', '/sitemap.xml']);

const SECURITY_HEADERS = {
	'X-Frame-Options': 'DENY',
	'X-Content-Type-Options': 'nosniff',
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
	'X-XSS-Protection': '1; mode=block',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
	'X-Demo-Site': 'This is a demonstration website. No real banking services are provided.'
};

/** @param {Response} res */
function withHeaders(res) {
	let out = res;
	try {
		for (const [k, v] of Object.entries(SECURITY_HEADERS)) out.headers.set(k, v);
	} catch {
		// Immutable headers: copy the response and try again.
		out = new Response(res.body, res);
		for (const [k, v] of Object.entries(SECURITY_HEADERS)) out.headers.set(k, v);
	}
	// Prerendered pages only carry CSP in a <meta> tag, which can't express
	// frame-ancestors. Add it as a header. Multiple CSP headers intersect, so
	// this never loosens a policy SvelteKit already set.
	if (!out.headers.has('Content-Security-Policy')) {
		out.headers.set('Content-Security-Policy', "frame-ancestors 'none'");
	}
	return out;
}

/** @param {string} value */
function parseBytes(value) {
	const mult = { K: 1024, M: 1024 ** 2, G: 1024 ** 3 }[value.at(-1)?.toUpperCase() ?? ''];
	return mult ? Number(value.slice(0, -1)) * mult : Number(value);
}

const { fetch: handle, websocket } = getHandler();

const server = Bun.serve({
	hostname: process.env.HOST ?? '0.0.0.0',
	port: process.env.PORT ?? '3000',
	idleTimeout: parseInt(process.env.IDLE_TIMEOUT ?? '10', 10),
	maxRequestBodySize: parseBytes(process.env.BODY_SIZE_LIMIT ?? '512K'),
	async fetch(req, srv) {
		const { pathname } = new URL(req.url);

		// The Dockerfile's health check needs a 2xx, or Traefik drops the container.
		if (pathname === '/health') {
			return withHeaders(
				new Response('ok\n', {
					headers: {
						'Content-Type': 'text/plain; charset=utf-8',
						'Cache-Control': 'no-store',
						'X-Robots-Tag': 'noindex'
					}
				})
			);
		}
		if (OLD_PATHS.test(pathname)) {
			return withHeaders(
				new Response(null, {
					status: 301,
					// no-store: browsers would keep a cached 301 even after this is undone.
					headers: { Location: '/', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }
				})
			);
		}

		// Nothing on this site takes input, so no form can reach the server.
		if (req.method !== 'GET' && req.method !== 'HEAD') {
			return withHeaders(
				new Response('Method Not Allowed\n', {
					status: 405,
					headers: {
						Allow: 'GET, HEAD',
						'Content-Type': 'text/plain; charset=utf-8',
						'Cache-Control': 'no-store',
						'X-Robots-Tag': 'noindex'
					}
				})
			);
		}

		const res = await handle(req, srv);
		if (!res) return res; // undefined after a websocket upgrade

		const out = withHeaders(res);
		if (!INDEXABLE.has(pathname)) out.headers.set('X-Robots-Tag', 'noindex');
		if (DISCOVERY_PATHS.has(pathname)) out.headers.set('Cache-Control', 'public, max-age=300');
		// The browser refuses any native form submit, even before the page has hydrated.
		// A second CSP header only tightens the first.
		if (pathname === '/demo' || pathname.startsWith('/demo/')) {
			out.headers.append('Content-Security-Policy', "form-action 'none'");
		}
		return out;
	},
	...(websocket ? { websocket } : {})
});

console.log(`Listening on ${server.url}`);

async function shutdown(reason) {
	console.info('Stopping server...');
	process.emit('sveltekit:shutdown', reason);
	await server.stop(true);
	process.exit(0);
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
