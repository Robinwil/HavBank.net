<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { showDemoNotice } from '$lib/stores/demoNotice.svelte.js';

	let showBankIDAlternative = $state(false);

	function handleBankIDRecovery() {
		showDemoNotice({ detail: 'Gjenoppretting med BankID er ikke koblet til noe reelt system.' });
	}

	function handleEmailSubmit(event) {
		event.preventDefault();
		showDemoNotice({ detail: 'Ingen e-post blir sendt.' });
	}
</script>

<svelte:head>
	<title>Glemt passord – HavBank | Gjenopprett tilgang med BankID</title>
	<meta
		name="description"
		content="Gjenopprett tilgang til nettbanken med BankID. HavBank spør aldri om passord, PIN eller BankID-koder på e-post eller telefon."
	/>
	<meta name="robots" content="noindex, nofollow" />
	<link rel="canonical" href="https://havbank.no/glemt-passord" />
</svelte:head>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<div class="text-center">
			{#if browser && Icon}
				<Icon
					icon="heroicons:key"
					class="mx-auto h-12 w-12 text-blue-900 dark:text-blue-100"
				/>
			{/if}
			<h1 class="mt-6 section-title text-center">Glemt passord eller brukernavn?</h1>
			<p class="mt-3 text-base text-gray-600 dark:text-gray-300">
				Du kan gjenopprette tilgang med BankID. Det tar under ett minutt.
			</p>
		</div>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white dark:bg-gray-800 px-4 py-8 shadow sm:rounded-lg sm:px-10">
			<!-- Security notice -->
			<div class="rounded-md bg-blue-50 dark:bg-blue-900/10 p-4 mb-6">
				<div class="flex">
					<div class="flex-shrink-0">
						{#if browser && Icon}
							<Icon icon="heroicons:shield-check" class="h-5 w-5 text-blue-400" />
						{/if}
					</div>
					<div class="ml-3">
						<h2 class="text-sm font-medium text-blue-800 dark:text-blue-200">
							Slik beskytter du deg mot svindel
						</h2>
						<div class="mt-2 text-sm text-blue-700 dark:text-blue-100">
							<p>
								Del aldri passord, PIN eller BankID-koder. HavBank spør aldri om dette på
								e-post, SMS eller telefon. Vi ringer deg aldri for å be deg godkjenne innlogging
								eller overføringer.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Primary path: BankID -->
			<button
				type="button"
				onclick={handleBankIDRecovery}
				class="flex w-full items-center justify-center gap-x-2 btn-primary"
			>
				{#if browser && Icon}
					<Icon icon="heroicons:identification" class="h-5 w-5" />
				{/if}
				Gjenopprett med BankID
			</button>

			<p class="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
				Du blir sendt til BankID for signering. Deretter setter du et nytt passord.
			</p>

			<!-- Secondary path: no BankID -->
			<div class="mt-8">
				<button
					type="button"
					class="flex w-full items-center justify-between text-left text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400"
					onclick={() => (showBankIDAlternative = !showBankIDAlternative)}
					aria-expanded={showBankIDAlternative}
					aria-controls="bankid-alternative"
				>
					<span>Har du ikke BankID?</span>
					{#if browser && Icon}
						<Icon
							icon={showBankIDAlternative
								? 'heroicons:chevron-up'
								: 'heroicons:chevron-down'}
							class="h-5 w-5"
						/>
					{/if}
				</button>

				{#if showBankIDAlternative}
					<div
						id="bankid-alternative"
						class="mt-4 rounded-md border border-gray-200 dark:border-gray-700 p-4 space-y-3 text-sm text-gray-700 dark:text-gray-300"
					>
						<p>
							Du trenger BankID for å gjenopprette tilgang på egen hånd. Slik bestiller du:
						</p>
						<ol class="list-decimal pl-5 space-y-2">
							<li>
								Logg inn på BankID-portalen til en bank der du allerede er kunde, eller besøk
								<a
									href="https://www.bankid.no/privat/"
									class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
									rel="noopener noreferrer"
									target="_blank">bankid.no</a
								>.
							</li>
							<li>
								Bestill BankID på mobil eller kodebrikke. Bekreftelse sendes som anbefalt post
								via Posten.
							</li>
							<li>Aktiver BankID og kom tilbake hit for å gjenopprette passordet.</li>
						</ol>
						<p class="mt-3">
							Trenger du hjelp? Ring kundeservice på
							<a
								href="tel:+4700000000"
								class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
								>+47 00 00 00 00</a
							>
							(hverdager 08:00–20:00).
						</p>
					</div>
				{/if}
			</div>

			<!-- Alternative: receive reset link -->
			<div class="mt-8">
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
					</div>
					<div class="relative flex justify-center text-sm">
						<span class="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
							eller gjenopprett brukernavn på e-post
						</span>
					</div>
				</div>

				<form class="mt-6 space-y-4" onsubmit={handleEmailSubmit}>
					<div>
						<label
							for="email"
							class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							E-postadresse registrert hos HavBank
						</label>
						<div class="mt-1">
							<input
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								required
								class="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
							/>
						</div>
					</div>
					<button type="submit" class="flex w-full justify-center btn-primary">
						Send meg brukernavn
					</button>
					<p class="text-xs text-gray-500 dark:text-gray-400">
						Finnes e-posten i systemet, får du en melding innen få minutter. Tilgang settes
						aldri tilbake uten signering med BankID.
					</p>
				</form>
			</div>
		</div>

		<!-- Emergency / contact strip -->
		<div class="mt-6 rounded-md border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 p-4">
			<div class="flex">
				<div class="flex-shrink-0">
					{#if browser && Icon}
						<Icon
							icon="heroicons:exclamation-triangle"
							class="h-5 w-5 text-red-600 dark:text-red-400"
						/>
					{/if}
				</div>
				<div class="ml-3 text-sm text-red-800 dark:text-red-200">
					<p class="font-semibold">Mistenker du svindel eller uautorisert bruk?</p>
					<p class="mt-1">
						Ring sperretelefonen på
						<a
							href="tel:+4700000000"
							class="font-semibold underline decoration-dotted underline-offset-2">+47 00 00 00 00</a
						>
						— døgnåpent. Les mer på
						<a
							href="/sikkerhet"
							class="font-semibold underline decoration-dotted underline-offset-2">sikkerhet</a
						>.
					</p>
				</div>
			</div>
		</div>

		<p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
			Husker du passordet?
			<a
				href="/login"
				class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
				>Tilbake til innlogging</a
			>
		</p>
	</div>
</div>
