<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	let showPassword = $state(false);
	let formData = $state({
		fodselsnummer: '',
		password: ''
	});

	const demoAlert =
		'Dette er en fiktiv nettside laget for utdanningsformål. Ingen reelle banktjenester tilbys.';

	function handleSubmit(event) {
		event.preventDefault();
		alert(demoAlert);
	}

	function handleBankID() {
		alert(demoAlert);
	}
</script>

<svelte:head>
	<title>Logg inn – HavBank | Sikker pålogging</title>
	<meta name="description" content="Dette er en fiktiv innloggingsside laget for utdanningsformål. Ingen reelle banktjenester tilbys." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<div class="text-center">
			{#if browser && Icon}
				<Icon icon="heroicons:building-library" class="mx-auto h-12 w-12 text-blue-900 dark:text-blue-100" />
			{/if}
			<h2 class="mt-6 section-title text-center">
				Logg inn på nettbank
			</h2>
		</div>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white dark:bg-gray-800 px-4 py-8 shadow sm:rounded-lg sm:px-10">
			<div class="rounded-md bg-blue-50 dark:bg-blue-900/10 p-4 mb-6">
				<div class="flex">
					<div class="flex-shrink-0">
						{#if browser && Icon}
							<Icon icon="heroicons:shield-check" class="h-5 w-5 text-blue-400" />
						{/if}
					</div>
					<div class="ml-3">
						<h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">Sikker pålogging</h3>
						<div class="mt-2 text-sm text-blue-700 dark:text-blue-100">
							<p>
								Vi anbefaler BankID for pålogging til nettbanken. Del aldri ditt fødselsnummer eller passord med andre.
							</p>
						</div>
					</div>
				</div>
			</div>

			<button
				type="button"
				onclick={handleBankID}
				class="flex w-full items-center justify-center gap-x-2 btn-primary mb-4"
			>
				{#if browser && Icon}
					<Icon icon="heroicons:identification" class="h-5 w-5" />
				{/if}
				Logg inn med BankID
			</button>

			<div class="relative my-6">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
						eller fødselsnummer og passord
					</span>
				</div>
			</div>

			<form class="space-y-6" onsubmit={handleSubmit}>
				<div>
					<label for="fodselsnummer" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
						Fødselsnummer (11 siffer)
					</label>
					<div class="mt-1">
						<input
							id="fodselsnummer"
							name="fodselsnummer"
							type="text"
							inputmode="numeric"
							autocomplete="username"
							maxlength="11"
							pattern="[0-9]{11}"
							required
							class="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
							bind:value={formData.fodselsnummer}
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
						Passord
					</label>
					<div class="mt-1 relative">
						<input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							required
							class="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
							bind:value={formData.password}
						/>
						<button
							type="button"
							class="absolute inset-y-0 right-0 flex items-center pr-3"
							onclick={() => (showPassword = !showPassword)}
							aria-label={showPassword ? 'Skjul passord' : 'Vis passord'}
						>
							{#if browser && Icon}
								<Icon
									icon={showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'}
									class="h-5 w-5 text-gray-400"
								/>
							{/if}
						</button>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							class="h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
						/>
						<label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
							Husk meg
						</label>
					</div>

					<div class="text-sm">
						<a href="/glemt-passord" class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
							Glemt passord?
						</a>
					</div>
				</div>

				<div>
					<button type="submit" class="flex w-full justify-center btn-primary">
						Logg inn
					</button>
				</div>
			</form>

			<div class="mt-6">
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
					</div>
					<div class="relative flex justify-center text-sm">
						<span class="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
							Sikkerhetstips
						</span>
					</div>
				</div>

				<div class="mt-6 grid gap-4">
					<div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						{#if browser && Icon}
							<Icon icon="heroicons:shield-check" class="mr-3 h-5 w-5 text-gray-400" />
						{/if}
						Sjekk at nettadressen starter med https://
					</div>
					<div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						{#if browser && Icon}
							<Icon icon="heroicons:lock-closed" class="mr-3 h-5 w-5 text-gray-400" />
						{/if}
						Del aldri ditt passord med andre
					</div>
					<div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						{#if browser && Icon}
							<Icon icon="heroicons:computer-desktop" class="mr-3 h-5 w-5 text-gray-400" />
						{/if}
						Logg alltid ut når du er ferdig
					</div>
				</div>
			</div>
		</div>
	</div>
</div> 