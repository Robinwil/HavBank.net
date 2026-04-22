<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { showDemoNotice } from '$lib/stores/demoNotice.svelte.js';

	let submitting = $state(false);

	function parseNumberParam(value, fallback) {
		const n = Number(value);
		return Number.isFinite(n) && n > 0 ? n : fallback;
	}

	let initialLoanAmount = $derived(
		parseNumberParam($page.url.searchParams.get('belop'), 3400000)
	);
	let initialLoanTerm = $derived(
		parseNumberParam($page.url.searchParams.get('lopetid'), 25)
	);

	let formData = $state({
		purpose: 'kjop',
		loanAmount: 3400000,
		equity: 600000,
		loanTerm: 25,
		housingType: 'enebolig',
		employment: 'fast',
		grossIncomeYear: 650000,
		coApplicant: false,
		coApplicantIncome: 0,
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		acceptTerms: false,
		acceptCredit: false
	});

	$effect(() => {
		formData.loanAmount = initialLoanAmount;
		formData.loanTerm = initialLoanTerm;
	});

	function formatCurrency(amount) {
		if (!Number.isFinite(amount)) return 'kr 0';
		return new Intl.NumberFormat('nb-NO', {
			style: 'currency',
			currency: 'NOK',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(amount);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!formData.acceptTerms || !formData.acceptCredit) return;
		submitting = true;
		setTimeout(() => {
			submitting = false;
			showDemoNotice({ detail: 'Søknaden er ikke sendt inn — ingen data lagres.' });
		}, 400);
	}

	const nextSteps = [
		{
			step: '1',
			title: 'Du sender søknad',
			description: 'Vi bekrefter mottak på e-post innen få minutter.'
		},
		{
			step: '2',
			title: 'Kredittvurdering',
			description:
				'Vi henter opplysninger fra Folkeregisteret, Skatteetaten og kredittopplysningsbyrå.'
		},
		{
			step: '3',
			title: 'Foreløpig svar',
			description: 'Du får foreløpig svar på e-post innen 2 virkedager, med finansieringsbevis hvis godkjent.'
		},
		{
			step: '4',
			title: 'Signering',
			description:
				'Endelig lånedokument signeres med BankID. Utbetaling skjer ved overtakelse av bolig.'
		}
	];

	const laterDocuments = [
		'Siste 3 lønnsslipper',
		'Skattemelding for foregående år',
		'Eventuell takst eller verdivurdering',
		'Kjøpekontrakt eller prospekt (ved kjøp)'
	];
</script>

<svelte:head>
	<title>Søk om boliglån – HavBank | Foreløpig svar innen 2 virkedager</title>
	<meta
		name="description"
		content="Søk om boliglån digitalt hos HavBank. Signer med BankID og få foreløpig svar på e-post innen 2 virkedager."
	/>
	<meta name="robots" content="noindex, nofollow" />
	<link rel="canonical" href="https://havbank.net/privat/boliglan/sok" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero -->
	<div class="relative isolate overflow-hidden">
		<div class="page-container py-16 sm:py-24">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<p class="section-eyebrow">Boliglån</p>
				<h1 class="page-title mt-2">Søk om boliglån</h1>
				<p class="page-lead">
					Svar på noen enkle spørsmål. Vi sender foreløpig svar på e-post innen 2 virkedager og
					utsteder finansieringsbevis hvis søknaden er godkjent.
				</p>
			</div>
		</div>
	</div>

	<!-- Main grid: form + sidebar -->
	<div class="page-container mb-24">
		<div class="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
			<!-- FORM -->
			<div class="lg:col-span-2">
				<form class="space-y-10" onsubmit={handleSubmit}>
					<!-- Purpose -->
					<fieldset>
						<legend class="text-lg font-semibold text-gray-900 dark:text-white">
							Hva skal lånet brukes til?
						</legend>
						<div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
							{#each [{ id: 'kjop', label: 'Kjøp av bolig' }, { id: 'refinansiering', label: 'Refinansiering' }, { id: 'paabygg', label: 'Påbygg / oppussing' }] as option}
								<label
									class="flex cursor-pointer items-center gap-x-3 rounded-md border border-gray-300 p-4 text-sm font-medium transition-colors hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-400"
									class:bg-blue-50={formData.purpose === option.id}
									class:dark:bg-blue-900={formData.purpose === option.id}
									class:border-blue-500={formData.purpose === option.id}
								>
									<input
										type="radio"
										bind:group={formData.purpose}
										value={option.id}
										class="h-4 w-4 text-blue-900 focus:ring-blue-500"
									/>
									<span class="text-gray-900 dark:text-gray-100">{option.label}</span>
								</label>
							{/each}
						</div>
					</fieldset>

					<!-- Loan amount + equity -->
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label
								for="loanAmount"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Ønsket lånebeløp</label
							>
							<div class="mt-2">
								<input
									id="loanAmount"
									type="number"
									min="100000"
									max="20000000"
									step="10000"
									bind:value={formData.loanAmount}
									required
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
							<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
								{formatCurrency(formData.loanAmount)}
							</p>
						</div>
						<div>
							<label
								for="equity"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Egenkapital</label
							>
							<div class="mt-2">
								<input
									id="equity"
									type="number"
									min="0"
									max="20000000"
									step="10000"
									bind:value={formData.equity}
									required
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
							<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
								{formatCurrency(formData.equity)} — Finanstilsynet krever minst 15 % egenkapital.
							</p>
						</div>
					</div>

					<!-- Term + housing -->
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label
								for="loanTerm"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Ønsket nedbetalingstid (år)</label
							>
							<input
								id="loanTerm"
								type="number"
								min="5"
								max="30"
								bind:value={formData.loanTerm}
								required
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							/>
						</div>
						<div>
							<label
								for="housingType"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Boligtype</label
							>
							<select
								id="housingType"
								bind:value={formData.housingType}
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							>
								<option value="enebolig">Enebolig</option>
								<option value="leilighet">Leilighet (selveier)</option>
								<option value="borettslag">Leilighet (borettslag)</option>
								<option value="rekkehus">Rekkehus / tomannsbolig</option>
								<option value="hytte">Fritidsbolig</option>
							</select>
						</div>
					</div>

					<!-- Income -->
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label
								for="employment"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Arbeidsforhold</label
							>
							<select
								id="employment"
								bind:value={formData.employment}
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							>
								<option value="fast">Fast ansettelse</option>
								<option value="midlertidig">Midlertidig ansettelse</option>
								<option value="selvstendig">Selvstendig næringsdrivende</option>
								<option value="pensjonist">Pensjonist</option>
							</select>
						</div>
						<div>
							<label
								for="grossIncomeYear"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Brutto årsinntekt</label
							>
							<input
								id="grossIncomeYear"
								type="number"
								min="0"
								max="10000000"
								step="10000"
								bind:value={formData.grossIncomeYear}
								required
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							/>
							<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
								{formatCurrency(formData.grossIncomeYear)} per år
							</p>
						</div>
					</div>

					<!-- Co-applicant -->
					<div class="rounded-md border border-gray-200 dark:border-gray-700 p-4">
						<label class="flex items-start gap-x-3">
							<input
								type="checkbox"
								bind:checked={formData.coApplicant}
								class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
							/>
							<span>
								<span class="block text-sm font-medium text-gray-900 dark:text-white">
									Jeg søker sammen med medsøker
								</span>
								<span class="block text-xs text-gray-500 dark:text-gray-400">
									Medsøker legges til på lånet og deler ansvar for nedbetaling.
								</span>
							</span>
						</label>

						{#if formData.coApplicant}
							<div class="mt-4">
								<label
									for="coApplicantIncome"
									class="block text-sm font-medium text-gray-700 dark:text-gray-300"
									>Medsøkers brutto årsinntekt</label
								>
								<input
									id="coApplicantIncome"
									type="number"
									min="0"
									max="10000000"
									step="10000"
									bind:value={formData.coApplicantIncome}
									class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
						{/if}
					</div>

					<!-- Contact info -->
					<fieldset>
						<legend class="text-lg font-semibold text-gray-900 dark:text-white">
							Kontaktopplysninger
						</legend>
						<div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<label
									for="firstName"
									class="block text-sm font-medium text-gray-700 dark:text-gray-300"
									>Fornavn</label
								>
								<input
									id="firstName"
									type="text"
									bind:value={formData.firstName}
									required
									class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
							<div>
								<label
									for="lastName"
									class="block text-sm font-medium text-gray-700 dark:text-gray-300"
									>Etternavn</label
								>
								<input
									id="lastName"
									type="text"
									bind:value={formData.lastName}
									required
									class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
							<div>
								<label
									for="email"
									class="block text-sm font-medium text-gray-700 dark:text-gray-300"
									>E-post</label
								>
								<input
									id="email"
									type="email"
									bind:value={formData.email}
									required
									class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
							<div>
								<label
									for="phone"
									class="block text-sm font-medium text-gray-700 dark:text-gray-300"
									>Mobil</label
								>
								<input
									id="phone"
									type="tel"
									bind:value={formData.phone}
									required
									class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
								/>
							</div>
						</div>
					</fieldset>

					<!-- Consents -->
					<div class="space-y-4">
						<label class="flex items-start gap-x-3">
							<input
								type="checkbox"
								bind:checked={formData.acceptCredit}
								required
								class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
							/>
							<span class="text-sm text-gray-700 dark:text-gray-300">
								Jeg samtykker til at HavBank henter kredittopplysninger og opplysninger fra
								Skatteetaten og Folkeregisteret for å behandle lånesøknaden.
							</span>
						</label>
						<label class="flex items-start gap-x-3">
							<input
								type="checkbox"
								bind:checked={formData.acceptTerms}
								required
								class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
							/>
							<span class="text-sm text-gray-700 dark:text-gray-300">
								Jeg har lest og godtar
								<a
									href="/personvern"
									class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400"
									>personvernerklæringen</a
								>
								og bekrefter at opplysningene er riktige.
							</span>
						</label>
					</div>

					<div class="rounded-md border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/10 p-4">
						<div class="flex gap-x-3">
							{#if browser && Icon}
								<Icon
									icon="heroicons:information-circle"
									class="h-5 w-5 flex-shrink-0 text-blue-900 dark:text-blue-400"
								/>
							{/if}
							<p class="text-sm text-blue-900/80 dark:text-blue-100">
								Dette er en demo. I en reell søknad vil du signere med BankID før søknaden sendes.
							</p>
						</div>
					</div>

					<button
						type="submit"
						disabled={submitting || !formData.acceptTerms || !formData.acceptCredit}
						class="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#if submitting}
							Sender søknad …
						{:else}
							Signer og send med BankID
						{/if}
					</button>
				</form>
			</div>

			<!-- SIDEBAR -->
			<aside class="lg:pl-4">
				<div class="sticky top-8 space-y-6">
					<div class="card-elevated">
						<h2 class="text-base font-semibold text-gray-900 dark:text-white">Hva skjer etter jeg sender?</h2>
						<ol class="mt-6 space-y-5">
							{#each nextSteps as s}
								<li class="flex gap-x-3">
									<div
										class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-900 text-xs font-semibold text-white dark:bg-blue-800"
									>
										{s.step}
									</div>
									<div>
										<h3 class="text-sm font-semibold text-gray-900 dark:text-white">
											{s.title}
										</h3>
										<p class="mt-1 text-xs text-gray-600 dark:text-gray-300">{s.description}</p>
									</div>
								</li>
							{/each}
						</ol>
					</div>

					<div class="card-soft">
						<h2 class="text-base font-semibold text-gray-900 dark:text-white">Vi trenger senere</h2>
						<ul class="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
							{#each laterDocuments as doc}
								<li class="flex gap-x-2">
									{#if browser && Icon}
										<Icon
											icon="heroicons:paper-clip"
											class="h-5 w-5 flex-none text-blue-900 dark:text-blue-400"
										/>
									{/if}
									{doc}
								</li>
							{/each}
						</ul>
						<p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
							Du laster opp dokumentene i nettbanken etter foreløpig godkjennelse.
						</p>
					</div>

					<div class="card-soft">
						<h2 class="text-base font-semibold text-gray-900 dark:text-white">Trenger du hjelp?</h2>
						<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
							Snakk med en boligrådgiver på
							<a
								href="tel:+4700000000"
								class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400"
								>+47 00 00 00 00</a
							>
							eller
							<a
								href="/bestill-time?tema=boliglan"
								class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400"
								>book et møte</a
							>.
						</p>
					</div>
				</div>
			</aside>
		</div>
	</div>

	<!-- Example effective rate + legal footer -->
	<div class="page-container">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8 space-y-3">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				<strong class="text-gray-900 dark:text-white">Effektiv rente-eksempel:</strong>
				Effektiv rente 4,27 % ved nominell rente 4,15 %, lån kr 2 000 000, nedbetalingstid 25 år.
				Kostnad kr 1 282 000. Totalt å betale kr 3 282 000.
			</p>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				HavBank AS (org.nr. 924 850 771) er under tilsyn av Finanstilsynet. Søknader behandles i
				henhold til finansavtaleloven § 48 og kravene til egnethetsvurdering. Innvilgelse
				forutsetter kredittgodkjenning og tilfredsstillende sikkerhet i pantobjektet.
				Finanstilsynets utlånsforskrift begrenser gjeld til 5 ganger brutto årsinntekt.
			</p>
		</div>
	</div>
</div>
