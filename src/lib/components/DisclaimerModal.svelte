<script>
	import { browser } from '$app/environment';
	import { onMount, tick } from 'svelte';
	import Icon from '@iconify/svelte';

	const STORAGE_KEY = 'havbank-disclaimer-dismissed';

	let isOpen = $state(false);
	/** @type {HTMLButtonElement | undefined} */
	let acknowledgeButton = $state();

	onMount(() => {
		if (!browser) return;

		try {
			const dismissed = sessionStorage.getItem(STORAGE_KEY);
			if (dismissed !== 'true') {
				isOpen = true;
			}
		} catch {
			// sessionStorage unavailable (strict private mode etc.) — show anyway.
			isOpen = true;
		}
	});

	$effect(() => {
		if (!browser) return;

		if (isOpen) {
			const previousOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			tick().then(() => acknowledgeButton?.focus());
			return () => {
				document.body.style.overflow = previousOverflow;
			};
		}
	});

	function acknowledge() {
		try {
			sessionStorage.setItem(STORAGE_KEY, 'true');
		} catch {
			// Ignore storage failures; the modal still closes for this view.
		}
		isOpen = false;
	}

	function handleKeydown(event) {
		// Deliberately NOT closing on Escape — the user must actively acknowledge.
		if (event.key === 'Tab') {
			event.preventDefault();
			acknowledgeButton?.focus();
		}
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center bg-gray-950/80 backdrop-blur-sm p-0 sm:p-4 md:p-6"
		role="dialog"
		tabindex="-1"
		aria-modal="true"
		aria-labelledby="disclaimer-title"
		aria-describedby="disclaimer-body"
		onkeydown={handleKeydown}
	>
		<div
			class="relative flex w-full max-w-3xl max-h-full sm:max-h-[calc(100vh-3rem)] flex-col bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-red-900/20 dark:ring-red-500/30 sm:rounded-2xl overflow-hidden"
		>
			<!-- Header (sticky at top of flex column, red palette reserved for fraud/security warnings). -->
			<div class="shrink-0 bg-red-700 dark:bg-red-800 px-5 sm:px-8 md:px-10 py-4 sm:py-6 text-white">
				<div class="flex items-start gap-3 sm:gap-4">
					{#if browser && Icon}
						<Icon
							icon="heroicons:exclamation-triangle"
							class="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0 mt-0.5"
							aria-hidden="true"
						/>
					{/if}
					<div class="min-w-0">
						<p class="text-[0.65rem] sm:text-xs md:text-sm font-semibold uppercase tracking-widest text-red-100">
							Viktig advarsel · Les før du fortsetter
						</p>
						<h2
							id="disclaimer-title"
							class="mt-1 sm:mt-2 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight break-words"
						>
							Dette er IKKE en ekte nettside
						</h2>
					</div>
				</div>
			</div>

			<!-- Scrollable body — only this part scrolls when the viewport is short. -->
			<div
				id="disclaimer-body"
				class="flex-1 min-h-0 overflow-y-auto px-5 sm:px-8 md:px-10 py-5 sm:py-7 space-y-4 sm:space-y-5 text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
			>
				<p class="text-gray-900 dark:text-white font-semibold text-base sm:text-lg md:text-xl">
					HavBank.net er et
					<span class="underline decoration-red-600 decoration-2 underline-offset-4">fiktivt hobbyprosjekt</span>
					— ingen reell bank, ingen finansielle tjenester, ingen kundeforhold.
				</p>

				<div class="rounded-lg bg-red-50 dark:bg-red-950/40 ring-1 ring-red-200 dark:ring-red-900/50 p-3 sm:p-4 md:p-5">
					<p class="font-semibold text-red-900 dark:text-red-200 text-sm sm:text-base">
						Finanstilsynet har publisert en offentlig advarsel mot HavBank.
					</p>
					<p class="mt-1.5 sm:mt-2 text-red-900/90 dark:text-red-100/90 text-sm sm:text-base">
						Les advarselen direkte hos Finanstilsynet:
					</p>
					<a
						href="https://www.finanstilsynet.no/nyhetsarkiv/nyheter/2026/finanstilsynet-advarer-mot-havbank/"
						target="_blank"
						rel="noopener noreferrer"
						class="mt-2 sm:mt-3 inline-flex items-start gap-2 font-semibold text-red-800 dark:text-red-200 underline underline-offset-4 decoration-2 hover:text-red-900 dark:hover:text-red-100 text-sm sm:text-base break-all"
					>
						{#if browser && Icon}
							<Icon
								icon="heroicons:arrow-top-right-on-square"
								class="h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5"
								aria-hidden="true"
							/>
						{/if}
						<span>finanstilsynet.no/…/finanstilsynet-advarer-mot-havbank</span>
					</a>
				</div>

				<div class="space-y-3 sm:space-y-4">
					<h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
						Vi beklager — vi var ikke tydelige nok
					</h3>
					<p>
						Vi skulle vært direkte og tydelige på at dette kun er et designprosjekt. Det var vi ikke,
						og det beklager vi oppriktig overfor alle som har blitt forvirret av nettsiden.
					</p>
					<p class="font-semibold text-gray-900 dark:text-white">
						Finanstilsynet har helt rett — det er fantastisk at de fant nettsiden, og det er akkurat
						sånn de skal opptre.
					</p>
					<p>
						Det er helt forståelig at de reagerer på en nettside som ser ut som en bank uten tydelig
						avsender. En eventuell backend, skjema eller innloggingsflyt kan dessuten legges til
						senere — advarselen er derfor en fullt rimelig føre-var-handling. Samtidig finnes det
						andre signaler som også peker mot at dette er et hobbyprosjekt: åpen kildekode på GitHub,
						manglende organisasjonsnummer, manglende oppføring i Enhetsregisteret, og tekniske spor
						(for eksempel at den nåværende versjonen er en ren SvelteKit-statisk-side uten server).
						Vi skulle gjort det enda lettere å finne denne informasjonen.
					</p>
					<p>
						Takk, Finanstilsynet, for at dere passer på. Og beklager hvis hobbyprosjektet mitt har
						brukt unødvendig mye ressurser hos dere.
					</p>
				</div>

				<p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-3 sm:pt-4">
					Ved å klikke <strong>OK</strong> bekrefter du at du forstår at HavBank ikke er en reell bank,
					ikke har konsesjon fra Finanstilsynet, og at ingen handling på denne siden har noen finansiell
					konsekvens.
				</p>
			</div>

			<!-- Footer (sticky at bottom of flex column). -->
			<div
				class="shrink-0 px-5 sm:px-8 md:px-10 py-3 sm:py-5 bg-gray-50 dark:bg-gray-800/60 border-t border-gray-200 dark:border-gray-800 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4"
			>
				<div class="flex flex-col sm:flex-row gap-2 sm:gap-5 text-xs sm:text-sm text-center sm:text-left">
					<a
						href="/om-prosjektet"
						onclick={acknowledge}
						class="font-medium text-blue-900 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 underline underline-offset-4"
					>
						Les hele artikkelen om prosjektet
					</a>
					<a
						href="https://www.finanstilsynet.no/nyhetsarkiv/nyheter/2026/finanstilsynet-advarer-mot-havbank/"
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-blue-900 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 underline underline-offset-4"
					>
						Finanstilsynets advarsel →
					</a>
				</div>
				<button
					bind:this={acknowledgeButton}
					type="button"
					class="btn-primary w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
					onclick={acknowledge}
				>
					OK — jeg forstår at dette ikke er en ekte bank
				</button>
			</div>
		</div>
	</div>
{/if}
