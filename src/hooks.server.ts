import { registerWithRegistry } from './register';

// Fire-and-forget registration with the r01.no fleet registry.
// Silent if any required env var is missing (e.g. local dev).
const env = process.env;
if (env.REGISTRY_URL && env.REGISTRY_SIGNING_SECRET && env.REGISTRY_FQDN && env.REGISTRY_NAME) {
	registerWithRegistry({
		fqdn: env.REGISTRY_FQDN,
		parent_fqdn: env.REGISTRY_PARENT_FQDN,
		name: env.REGISTRY_NAME,
		description: env.REGISTRY_DESCRIPTION,
		registry_url: env.REGISTRY_URL,
		signing_secret: env.REGISTRY_SIGNING_SECRET
	}).catch((err) => {
		console.error('[registry] registration error:', err);
	});
}

// Vulnerability scanners (WordPress/PHP probes, dotfiles, etc.) make up most of the
// traffic. Answer them with a tiny plain-text 404 instead of rendering the full
// layout through SvelteKit, which is what kept the Bun heap large.
const BOT_PROBE =
	/\.(php\d?|asp|aspx|jsp|cgi|env|ini|sql|bak|old|swp|yml|yaml|pot)$|^\/(wp-|\.(?!well-known)|(wordpress|xmlrpc|phpmyadmin|pma|cgi-bin|vendor)(\/|$))/i;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (BOT_PROBE.test(event.url.pathname)) {
		return new Response('Not found', {
			status: 404,
			headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' }
		});
	}

	try {
		const response = await resolve(event);

		// Security Headers
		response.headers.set('X-Frame-Options', 'DENY');
		response.headers.set('X-Content-Type-Options', 'nosniff');
		response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

		// Additional recommended security headers
		response.headers.set('X-XSS-Protection', '1; mode=block');
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
		response.headers.set(
			'Permissions-Policy',
			'camera=(), microphone=(), geolocation=(), payment=()'
		);

		// Note: Content-Security-Policy is managed by SvelteKit's kit.csp config in svelte.config.js
		// which uses nonce-based CSP for proper script-src security without unsafe-eval or unsafe-inline.

		// Demo site warning header
		response.headers.set(
			'X-Demo-Site',
			'This is a demonstration website. No real banking services are provided.'
		);

		return response;
	} catch (error) {
		console.error('Hook error:', error);
		// Return a fallback response or rethrow the error
		throw error;
	}
}
