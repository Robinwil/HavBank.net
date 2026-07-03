import adapter from 'svelte-adapter-bun';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'nonce',
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
