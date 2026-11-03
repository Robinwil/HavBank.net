// Production entrypoint (replaces build/index.js).
//
// svelte-adapter-bun serves prerendered pages and static assets directly, so
// hooks.server.ts never runs for them. This wrapper adds the security headers
// to every response, prerendered or server-rendered.
// Run with `bun --smol serve.js` (see Dockerfile).
import process from 'node:process';

// TEMPORARY: the site is closed. Every path answers with this page and SvelteKit
// isn't loaded, so prerendered pages, static files and forms are closed as well.
// To reopen, revert the commit that added this.
const STOPPED_PAGE = `<!doctype html>
<html lang="nb">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Midlertidig stengt</title>
<style>
:root { color-scheme: light dark; }
body { margin: 0; min-height: 100vh; display: grid; place-content: center; padding: 2rem; font-family: system-ui, sans-serif; text-align: center; }
h1 { margin: 0 0 0.5rem; font-size: 1.5rem; }
p { margin: 0.25rem 0; }
</style>
</head>
<body>
<main>
<h1>Midlertidig stengt</h1>
<p>Denne nettsiden er midlertidig stengt.</p>
<p lang="en">This website is temporarily closed.</p>
</main>
</body>
</html>
`;

const STOPPED_HEADERS = {
	'Content-Type': 'text/html; charset=utf-8',
	'Cache-Control': 'no-store',
	'Retry-After': '86400',
	'X-Robots-Tag': 'noindex',
	'Content-Security-Policy':
		"default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
};

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

const server = Bun.serve({
	hostname: process.env.HOST ?? '0.0.0.0',
	port: process.env.PORT ?? '3000',
	idleTimeout: parseInt(process.env.IDLE_TIMEOUT ?? '10', 10),
	maxRequestBodySize: parseBytes(process.env.BODY_SIZE_LIMIT ?? '512K'),
	fetch(req) {
		// The Dockerfile's health check needs a 2xx, or Traefik drops the container.
		if (new URL(req.url).pathname === '/health') {
			return withHeaders(
				new Response('ok\n', {
					headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
				})
			);
		}
		return withHeaders(new Response(STOPPED_PAGE, { status: 503, headers: STOPPED_HEADERS }));
	}
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
