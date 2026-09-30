// Production entrypoint (replaces build/index.js).
//
// svelte-adapter-bun serves prerendered pages and static assets directly, so
// hooks.server.ts never runs for them. This wrapper adds the security headers
// to every response, prerendered or server-rendered.
// Run with `bun --smol serve.js` (see Dockerfile).
import process from 'node:process';
import { getHandler } from './build/handler.js';

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
		const res = await handle(req, srv);
		return res ? withHeaders(res) : res; // undefined after a websocket upgrade
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
