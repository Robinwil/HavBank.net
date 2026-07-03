<script lang="ts">
	import { browser } from '$app/environment';
	import { tick } from 'svelte';
	import Icon from '@iconify/svelte';
	import {
		securityContactState,
		closeSecurityContact,
		SECURITY_EMAIL,
		SECURITY_PGP_KEY,
		SECURITY_PGP_FINGERPRINT,
		SECURITY_PGP_KEY_URL,
		SECURITY_TXT_URL
	} from '$lib/stores/securityContact.svelte.js';

	let closeButton = $state<HTMLButtonElement>();
	let emailCopied = $state(false);
	let keyCopied = $state(false);
	let emailTimer: ReturnType<typeof setTimeout> | undefined;
	let keyTimer: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		if (!browser) return;

		if (securityContactState.isOpen) {
			const previousOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			tick().then(() => closeButton?.focus());
			return () => {
				document.body.style.overflow = previousOverflow;
				emailCopied = false;
				keyCopied = false;
				clearTimeout(emailTimer);
				clearTimeout(keyTimer);
			};
		}
	});

	async function copy(text: string, which: 'email' | 'key') {
		if (!browser) return;
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			// Fallback for environments without clipboard permission —
			// select text via a temporary textarea so the user can copy manually.
			const ta = document.createElement('textarea');
			ta.value = text;
			ta.setAttribute('readonly', '');
			ta.style.position = 'fixed';
			ta.style.left = '-9999px';
			document.body.appendChild(ta);
			ta.select();
			try {
				document.execCommand('copy');
			} catch {
				// Give up silently — user can still select the visible text.
			}
			document.body.removeChild(ta);
		}

		if (which === 'email') {
			emailCopied = true;
			clearTimeout(emailTimer);
			emailTimer = setTimeout(() => (emailCopied = false), 2000);
		} else {
			keyCopied = true;
			clearTimeout(keyTimer);
			keyTimer = setTimeout(() => (keyCopied = false), 2000);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeSecurityContact();
		}
	}
</script>

{#if securityContactState.isOpen}
	<button
		type="button"
		class="fixed inset-0 z-[95] bg-gray-950/75 backdrop-blur-sm cursor-default"
		aria-label="Lukk sikkerhetskontakt"
		onclick={closeSecurityContact}
	></button>

	<div
		class="fixed inset-0 z-[96] flex items-stretch sm:items-center justify-center p-0 sm:p-4 md:p-6 pointer-events-none"
		role="dialog"
		tabindex="-1"
		aria-modal="true"
		aria-labelledby="security-contact-title"
		aria-describedby="security-contact-body"
		onkeydown={handleKeydown}
	>
		<div
			class="pointer-events-auto flex w-full max-w-2xl max-h-full sm:max-h-[calc(100vh-3rem)] flex-col bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-blue-900/10 dark:ring-blue-500/20 sm:rounded-2xl overflow-hidden"
		>
			<!-- Header -->
			<div
				class="shrink-0 flex items-start gap-3 px-5 sm:px-7 py-4 sm:py-5 bg-blue-900 dark:bg-blue-950 text-white"
			>
				{#if browser && Icon}
					<Icon
						icon="heroicons:lock-closed"
						class="h-6 w-6 sm:h-7 sm:w-7 shrink-0 mt-0.5"
						aria-hidden="true"
					/>
				{/if}
				<div class="min-w-0 flex-1">
					<p
						class="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-widest text-blue-200"
					>
						Sikkerhetskontakt · Responsible disclosure
					</p>
					<h2 id="security-contact-title" class="mt-0.5 text-lg sm:text-xl font-bold leading-snug">
						Ta kontakt om sikkerhet eller misvisende innhold
					</h2>
				</div>
				<button
					type="button"
					class="shrink-0 rounded-md p-1 -m-1 text-blue-100 hover:bg-blue-800 dark:hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					aria-label="Lukk"
					onclick={closeSecurityContact}
					bind:this={closeButton}
				>
					{#if browser && Icon}
						<Icon icon="heroicons:x-mark" class="h-5 w-5" aria-hidden="true" />
					{/if}
				</button>
			</div>

			<!-- Body (scrollable) -->
			<div
				id="security-contact-body"
				class="flex-1 min-h-0 overflow-y-auto px-5 sm:px-7 py-5 sm:py-6 space-y-5 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed"
			>
				<p>
					Har du funnet en sårbarhet, eller mener du at noe på HavBank.net er misvisende eller
					villedende? Send en e-post. Sensitive detaljer bør krypteres med PGP-nøkkelen under.
				</p>

				<!-- Email row -->
				<div
					class="rounded-lg ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4"
				>
					<p
						class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400"
					>
						E-post
					</p>
					<div class="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
						<a
							href="mailto:{SECURITY_EMAIL}"
							class="font-mono text-base sm:text-lg font-semibold text-blue-900 dark:text-blue-300 underline underline-offset-4 hover:text-blue-800 dark:hover:text-blue-200 break-all"
						>
							{SECURITY_EMAIL}
						</a>
						<div class="flex gap-2 sm:ml-auto shrink-0">
							<a
								href="mailto:{SECURITY_EMAIL}"
								class="inline-flex items-center gap-1.5 rounded-md bg-blue-900 dark:bg-blue-800 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-blue-800 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
							>
								{#if browser && Icon}
									<Icon icon="heroicons:envelope" class="h-4 w-4" aria-hidden="true" />
								{/if}
								Åpne e-post
							</a>
							<button
								type="button"
								onclick={() => copy(SECURITY_EMAIL, 'email')}
								class="inline-flex items-center gap-1.5 rounded-md bg-white dark:bg-gray-700 px-3 py-1.5 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 ring-1 ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
							>
								{#if browser && Icon}
									<Icon
										icon={emailCopied ? 'heroicons:check' : 'heroicons:clipboard-document'}
										class="h-4 w-4"
										aria-hidden="true"
									/>
								{/if}
								{emailCopied ? 'Kopiert' : 'Kopier'}
							</button>
						</div>
					</div>
					<!-- Dedicated live region (see RFC-adjacent ARIA authoring practices):
					     `role="status"` + aria-live="polite" belongs on the announcer, not
					     the trigger. Screen readers read this once on each state change. -->
					<span role="status" aria-live="polite" class="sr-only">
						{emailCopied ? 'E-postadresse kopiert til utklippstavlen.' : ''}
					</span>
				</div>

				<!-- PGP key -->
				<div
					class="rounded-lg ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4"
				>
					<div class="flex items-start justify-between gap-3">
						<div>
							<p
								class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400"
							>
								PGP-nøkkel (offentlig)
							</p>
							<p class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
								Bruk denne for å kryptere sensitive detaljer før du sender e-post.
							</p>
						</div>
						<button
							type="button"
							onclick={() => copy(SECURITY_PGP_KEY, 'key')}
							class="shrink-0 inline-flex items-center gap-1.5 rounded-md bg-white dark:bg-gray-700 px-3 py-1.5 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 ring-1 ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
						>
							{#if browser && Icon}
								<Icon
									icon={keyCopied ? 'heroicons:check' : 'heroicons:clipboard-document'}
									class="h-4 w-4"
									aria-hidden="true"
								/>
							{/if}
							{keyCopied ? 'Kopiert' : 'Kopier nøkkel'}
						</button>
					</div>
					<pre
						class="mt-3 max-h-60 overflow-auto rounded-md bg-gray-900 text-gray-100 p-3 text-[0.7rem] sm:text-xs leading-snug font-mono ring-1 ring-gray-700 select-all whitespace-pre"
						aria-label="PGP public key block">{SECURITY_PGP_KEY}</pre>
					<span role="status" aria-live="polite" class="sr-only">
						{keyCopied ? 'PGP-nøkkel kopiert til utklippstavlen.' : ''}
					</span>

					<!-- Fingerprint + out-of-band verification. Without a second source
					     to cross-check the key against, someone MITM'ing this page could
					     in principle swap it. The fingerprint + the r01.no copy make
					     that substantially harder. -->
					<dl class="mt-4 space-y-2 text-xs sm:text-sm">
						<div class="flex flex-col sm:flex-row sm:gap-2">
							<dt class="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
								Fingeravtrykk:
							</dt>
							<dd class="font-mono break-all text-gray-800 dark:text-gray-100 select-all">
								{SECURITY_PGP_FINGERPRINT}
							</dd>
						</div>
						<div class="flex flex-col sm:flex-row sm:gap-2">
							<dt class="font-semibold text-gray-700 dark:text-gray-300 shrink-0">Verifiser:</dt>
							<dd class="text-gray-600 dark:text-gray-400">
								Samme nøkkel er publisert på
								<a
									href={SECURITY_PGP_KEY_URL}
									target="_blank"
									rel="noopener noreferrer"
									class="font-mono underline underline-offset-4 hover:text-blue-800 dark:hover:text-blue-300 break-all"
								>
									r01.no/.well-known/pgp-key.txt
								</a>. Sammenlign fingeravtrykket for en ekstra verifiseringskanal.
							</dd>
						</div>
					</dl>
				</div>

				<p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
					Denne nøkkelen er knyttet til <span class="font-mono">{SECURITY_EMAIL}</span>. Vennligst
					ikke send ekte personopplysninger (fødselsnummer, kontonummer o.l.) — HavBank behandler
					ikke slike data. Automatiserte skannere finner samme kontaktinformasjon på
					<a
						href={SECURITY_TXT_URL}
						target="_blank"
						rel="noopener noreferrer"
						class="font-mono underline underline-offset-4 hover:text-blue-800 dark:hover:text-blue-300"
						>/.well-known/security.txt</a
					>
					(RFC 9116).
				</p>
			</div>

			<!-- Footer -->
			<div
				class="shrink-0 px-5 sm:px-7 py-3 sm:py-4 bg-gray-50 dark:bg-gray-800/60 border-t border-gray-200 dark:border-gray-800 flex justify-end"
			>
				<button type="button" class="btn-primary px-5 py-2 text-sm" onclick={closeSecurityContact}>
					Lukk
				</button>
			</div>
		</div>
	</div>
{/if}
