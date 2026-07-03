import { redirect } from '@sveltejs/kit';

export const prerender = false;

// Private-context pension links follow the same pattern as /sparing -> /privat/sparing.
export function load() {
	throw redirect(308, '/privat/sparing');
}
