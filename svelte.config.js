import adapter from 'svelte-adapter-bun';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			// Some pages link to routes that don't exist yet (they 404 at runtime too).
			// Log them instead of failing the build; any other error still fails.
			handleHttpError: ({ status, path, referrer, message }) => {
				if (status === 404) {
					console.warn(`[prerender] broken link ${path} (from ${referrer})`);
					return;
				}
				throw new Error(message);
			},
			// Same for in-page anchors that point at ids that don't exist.
			handleMissingId: 'warn'
		},
		csp: {
			mode: 'auto', // hashes for prerendered pages, nonces for SSR ones
			directives: {
				'default-src': ["'self'"],
				'script-src': ["'self'"], // SvelteKit auto-adds nonce-{random} here
				'style-src': ["'self'", "'unsafe-inline'"], // kept for dynamic inline styles (progress bars, clip-paths)
				'img-src': ["'self'", 'data:'],
				'font-src': ["'self'"],
				'connect-src': ["'self'"],
				'frame-ancestors': ["'none'"],
				'base-uri': ["'self'"],
				'form-action': ["'self'"]
			}
		}
	}
};

export default config;
