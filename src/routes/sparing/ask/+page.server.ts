import { redirect } from '@sveltejs/kit';

export const prerender = false;

// ASK = Aksjesparekonto; maps best to the investering hub in the current IA.
export function load() {
	throw redirect(308, '/privat/investering');
}
