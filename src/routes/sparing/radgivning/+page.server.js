import { redirect } from '@sveltejs/kit';

export const prerender = false;

// Advisory intent maps to the booking flow in the redesigned IA.
export function load() {
	throw redirect(308, '/bestill-time');
}
