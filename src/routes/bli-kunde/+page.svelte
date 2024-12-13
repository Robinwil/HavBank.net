<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	const IconifyIcon = Icon;


	// Form state
	let formData = $state({
		type: 'private', // private or business
		name: '',
		email: '',
		phone: '',
		preferredDate: '',
		preferredTime: '',
		topic: 'bli-kunde',
		message: '',
		acceptTerms: false
	});

	let isSubmitting = $state(false);
	let submitError = $state('');
	let submitSuccess = $state(false);

	const timeSlots = [
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00'
	];

	const topics = [
		{
			id: 'bli-kunde',
			name: 'Bli kunde',
			description: 'Opprett kundeforhold i HavBank'
		},
		{
			id: 'lan',
			name: 'Lån og kreditt',
			description: 'Boliglån, forbrukslån eller kreditt'
		},
		{
			id: 'sparing',
			name: 'Sparing og investering',
			description: 'BSU, fond eller aksjer'
		},
		{
			id: 'forsikring',
			name: 'Forsikring',
			description: 'Innbo, reise eller livsforsikring'
		}
	];

	const requirements = [
		{
			title: 'Gyldig legitimasjon',
			description: 'Pass, førerkort eller nasjonalt ID-kort',
			icon: 'heroicons:identification'
		},
		{
			title: 'Norsk personnummer',
			description: 'Eller D-nummer for utenlandske statsborgere',
			icon: 'heroicons:document-text'
		},
		{
			title: 'Bostedsadresse',
			description: 'Norsk folkeregistrert adresse',
			icon: 'heroicons:home'
		}
	];

	async function handleSubmit() {
		if (!formData.acceptTerms) {
			submitError = 'Du må godkjenne vilkårene for å fortsette';
			return;
		}

		isSubmitting = true;
		submitError = '';
		submitSuccess = false;

		try {
			const response = await fetch('/api/booking', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error('Kunne ikke sende forespørselen. Prøv igjen senere.');
			}

			submitSuccess = true;
			formData = {
				type: 'private',
				name: '',
				email: '',
				phone: '',
				preferredDate: '',
				preferredTime: '',
				topic: 'bli-kunde',
				message: '',
				acceptTerms: false
			};
		} catch (error) {
			submitError = error.message;
		} finally {
			isSubmitting = false;
		}
	}

	// Disable past dates in date picker
	$effect(() => {
		if (browser) {
			const today = new Date().toISOString().split('T')[0];
			const dateInput = document.getElementById('preferredDate');
			if (dateInput) {
				dateInput.min = today;
			}
		}
	});
</script>

<svelte:head>
	<title>Bli kunde | HavBank - Start ditt kundeforhold</title>
	<meta
		name="description"
		content="Bli kunde i HavBank. Book et møte med våre rådgivere og start ditt kundeforhold i dag."
	/>
	<meta name="keywords" content="bli kunde, bank, møtebooking, rådgivning, kundeforhold, norge" />
	<meta property="og:title" content="Bli kunde | HavBank" />
	<meta
		property="og:description"
		content="Book et møte med våre rådgivere og start ditt kundeforhold i HavBank."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/bli-kunde" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Bli kunde i HavBank
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi gjør det enkelt å bli kunde. Book et møte med en av våre rådgivere, så hjelper vi deg i
					gang med ditt nye kundeforhold.
				</p>
			</div>
		</div>
	</div>

	<!-- Requirements Section -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Dette trenger du for å bli kunde
			</h2>
		</div>
		<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
			<div class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
				{#each requirements as requirement}
					<div class="flex flex-col">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								<Icon icon={requirement.icon} class="h-7 w-7 text-blue-600" />
							{/if}
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
								{requirement.title}
							</h3>
						</div>
						<p class="flex-auto text-base leading-7 text-gray-600 dark:text-gray-400">
							{requirement.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Booking Form Section -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
			<div>
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
					Book et møte
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
					Velg tidspunkt som passer deg, så tar vi kontakt for å bekrefte møtet. Du kan velge mellom
					videomøte eller fysisk møte i en av våre filialer.
				</p>

				{#if submitSuccess}
					<div
						class="rounded-md bg-green-50 dark:bg-green-900/30 p-4 mb-8 border border-green-400/50"
					>
						<div class="flex">
							<div class="flex-shrink-0">
								{#if browser && Icon}
									<Icon
										icon="heroicons:check-circle"
										class="h-5 w-5 text-green-400"
										aria-hidden="true"
									/>
								{/if}
							</div>
							<div class="ml-3">
								<h3 class="text-sm font-medium text-green-800 dark:text-green-300">
									Møteforespørsel mottatt
								</h3>
								<div class="mt-2 text-sm text-green-700 dark:text-green-400">
									<p>
										Vi har mottatt din forespørsel og vil kontakte deg innen 24 timer for å bekrefte
										møtet.
									</p>
								</div>
							</div>
						</div>
					</div>
				{/if}

				{#if submitError}
					<div class="rounded-md bg-red-50 dark:bg-red-900/30 p-4 mb-8 border border-red-400/50">
						<div class="flex">
							<div class="flex-shrink-0">
								{#if browser && Icon}
									<Icon
										icon="heroicons:exclamation-circle"
										class="h-5 w-5 text-red-400"
										aria-hidden="true"
									/>
								{/if}
							</div>
							<div class="ml-3">
								<h3 class="text-sm font-medium text-red-800 dark:text-red-300">Det oppstod en feil</h3>
								<div class="mt-2 text-sm text-red-700 dark:text-red-400">
									<p>{submitError}</p>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<form onsubmit={handleSubmit} class="space-y-6">
					<div class="space-y-6 sm:space-y-5">
						<div>
							<label for="customer-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kundetype</label>
							<div class="mt-2 space-x-4">
								<label class="inline-flex items-center">
									<input
										type="radio"
										id="customer-type-private"
										bind:group={formData.type}
										value="private"
										class="form-radio text-blue-600"
									/>
									<span class="ml-2 text-gray-700 dark:text-gray-300">Privatkunde</span>
								</label>
								<label class="inline-flex items-center">
									<input
										type="radio"
										id="customer-type-business"
										bind:group={formData.type}
										value="business"
										class="form-radio text-blue-600"
									/>
									<span class="ml-2 text-gray-700 dark:text-gray-300">Bedriftskunde</span>
								</label>
							</div>
						</div>

						<div>
							<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Navn</label
							>
							<div class="mt-1">
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									required
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>E-post</label
							>
							<div class="mt-1">
								<input
									type="email"
									id="email"
									bind:value={formData.email}
									required
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Telefon</label
							>
							<div class="mt-1">
								<input
									type="tel"
									id="phone"
									bind:value={formData.phone}
									required
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label for="topic" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Hva ønsker du å snakke om?</label
							>
							<div class="mt-1">
								<select
									id="topic"
									bind:value={formData.topic}
									required
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								>
									{#each topics as topic}
										<option value={topic.id}>{topic.name} - {topic.description}</option>
									{/each}
								</select>
							</div>
						</div>

						<div>
							<label for="preferredDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Ønsket dato</label
							>
							<div class="mt-1">
								<input
									type="date"
									id="preferredDate"
									bind:value={formData.preferredDate}
									required
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label for="preferredTime" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Ønsket tidspunkt</label
							>
							<div class="mt-1">
								<select
									id="preferredTime"
									bind:value={formData.preferredTime}
									required
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								>
									<option value="">Velg tidspunkt</option>
									{#each timeSlots as time}
										<option value={time}>{time}</option>
									{/each}
								</select>
							</div>
						</div>

						<div>
							<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Melding (valgfritt)</label
							>
							<div class="mt-1">
								<textarea
									id="message"
									bind:value={formData.message}
									rows="4"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								></textarea>
							</div>
						</div>

						<div class="relative flex items-start">
							<div class="flex h-6 items-center">
								<input
									id="acceptTerms"
									type="checkbox"
									bind:checked={formData.acceptTerms}
									class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
								/>
							</div>
							<div class="ml-3 text-sm leading-6">
								<label for="acceptTerms" class="text-gray-700 dark:text-gray-300"
									>Jeg godtar at HavBank kan kontakte meg og behandle mine personopplysninger i henhold
									til <a href="/personvern" class="text-blue-600 hover:text-blue-500"
										>personvernerklæringen</a
									>.</label
								>
							</div>
						</div>
					</div>

					<div class="pt-5">
						<button
							type="submit"
							disabled={isSubmitting}
							class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? 'Sender...' : 'Book møte'}
						</button>
					</div>
				</form>
			</div>

			<div class="lg:pl-8">
				<div class="sticky top-8">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
						Hvorfor velge HavBank?
					</h3>
					<div class="space-y-6">
						<div class="flex gap-x-3">
							{#if browser && Icon}
								<Icon icon="heroicons:shield-check" class="h-6 w-6 text-blue-600" />
							{/if}
							<div>
								<h4 class="text-base font-semibold text-gray-900 dark:text-white">
									Trygg og solid bank
								</h4>
								<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
									Vi er en norsk bank med over 50 års erfaring og er under tilsyn av Finanstilsynet.
								</p>
							</div>
						</div>

						<div class="flex gap-x-3">
							{#if browser && Icon}
								<Icon icon="heroicons:device-phone-mobile" class="h-6 w-6 text-blue-600" />
							{/if}
							<div>
								<h4 class="text-base font-semibold text-gray-900 dark:text-white">
									Moderne løsninger
								</h4>
								<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
									Med vår mobilbank og nettbank får du full oversikt over økonomien din, hvor som helst.
								</p>
							</div>
						</div>

						<div class="flex gap-x-3">
							{#if browser && Icon}
								<Icon icon="heroicons:user-group" class="h-6 w-6 text-blue-600" />
							{/if}
							<div>
								<h4 class="text-base font-semibold text-gray-900 dark:text-white">
									Personlig rådgivning
								</h4>
								<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
									Du får din egen personlige rådgiver som hjelper deg med å nå dine økonomiske mål.
								</p>
							</div>
						</div>

						<div class="flex gap-x-3">
							{#if browser && Icon}
								<Icon icon="heroicons:currency-dollar" class="h-6 w-6 text-blue-600" />
							{/if}
							<div>
								<h4 class="text-base font-semibold text-gray-900 dark:text-white">
									Konkurransedyktige vilkår
								</h4>
								<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
									Vi tilbyr gode betingelser på lån, sparing og dagligbank.
								</p>
							</div>
						</div>
					</div>

					<div class="mt-8 rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
						<div class="flex gap-x-3">
							{#if browser && Icon}
								<Icon icon="heroicons:information-circle" class="h-6 w-6 text-blue-600" />
							{/if}
							<div>
								<h4 class="text-base font-semibold text-gray-900 dark:text-white">Visste du at?</h4>
								<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
									Du kan bli kunde digitalt med BankID, eller book et møte med en av våre rådgivere for
									personlig oppfølging.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Legal Disclaimer -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Ved å sende inn dette skjemaet samtykker du til at HavBank kan kontakte deg angående ditt
				ønske om å bli kunde. Alle henvendelser behandles konfidensielt i henhold til gjeldende
				personvernlovgivning. For å bli kunde må du være over 18 år og ha norsk personnummer eller
				D-nummer.
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
	input[type="text"],
	input[type="email"],
	input[type="tel"],
	input[type="date"],
	select,
	textarea {
		@apply px-4 py-2;
	}

	textarea {
		@apply resize-none;
	}

	/* Custom radio button styles */
	input[type="radio"] {
		@apply h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500;
	}

	/* Custom checkbox styles */
	input[type="checkbox"] {
		@apply rounded border-gray-300 text-blue-600 focus:ring-blue-500;
	}
</style> 