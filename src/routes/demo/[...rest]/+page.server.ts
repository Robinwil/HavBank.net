import { error } from '@sveltejs/kit';

export const prerender = false;

// Unknown /demo paths get the 404 inside the demo layout, so they carry the banner too.
export function load() {
	error(404, 'Not found');
}
