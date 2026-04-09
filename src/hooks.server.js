/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
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
