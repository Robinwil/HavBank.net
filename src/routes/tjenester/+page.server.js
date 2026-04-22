import { redirect } from '@sveltejs/kit';

export const prerender = false;

// No dedicated /tjenester hub in the redesign; send to the private banking hub.
export function load() {
	throw redirect(308, '/privat');
}
