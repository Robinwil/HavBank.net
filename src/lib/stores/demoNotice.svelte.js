/**
 * Shared reactive state for the "demo notice" toast that appears whenever a
 * user tries to do something that would require real banking — logging in,
 * BankID authentication, submitting an application, downloading a report, etc.
 *
 * All interactive stubs on the site should call `showDemoNotice()` instead of
 * using `alert()` so the styling, copy, and accessibility behaviour stays
 * consistent across the entire fictitious site.
 */

const DEFAULT_MESSAGE =
	'Dette er en fiktiv nettside laget for utdanningsformål. Ingen reelle banktjenester tilbys.';

export const demoNoticeState = $state({
	/** @type {boolean} */
	isOpen: false,
	/** @type {string} */
	message: DEFAULT_MESSAGE,
	/** @type {string | null} Optional extra line, e.g. "Søknaden er ikke sendt inn." */
	detail: null
});

/**
 * Open the demo notice. Pass a `detail` string to add a contextual second
 * line (for example: "Søknaden er ikke sendt inn." or "Rapporten er ikke
 * tilgjengelig for nedlasting."). The base message stays the same.
 *
 * @param {{ detail?: string | null, message?: string }} [options]
 */
export function showDemoNotice(options = {}) {
	demoNoticeState.message = options.message ?? DEFAULT_MESSAGE;
	demoNoticeState.detail = options.detail ?? null;
	demoNoticeState.isOpen = true;
}

export function hideDemoNotice() {
	demoNoticeState.isOpen = false;
}
