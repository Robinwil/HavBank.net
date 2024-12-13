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

		// Content Security Policy
		response.headers.set(
			'Content-Security-Policy',
			"default-src 'self'; " +
				"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google.com https://*.googletagmanager.com; " +
				"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
				"img-src 'self' data: https: https://*.google.com https://*.googleapis.com; " +
				"font-src 'self' https://fonts.gstatic.com; " +
				"connect-src 'self' https://*.google.com https://*.googleapis.com https://api.openai.com; " +
				"frame-ancestors 'none';"
		);

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
