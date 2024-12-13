<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
	let IconifyIcon = Icon;

	onMount(async () => {
		// Scroll behavior fix
		if (window.location.hash === '#kalkulator') {
			setTimeout(() => {
				const element = document.getElementById('kalkulator');
				if (element) {
					const headerOffset = 100;
					const elementPosition = element.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					});
				}
			}, 100);
		}
	});

	// Loan calculator state
	let purchasePrice = $state(4000000);
	let downPayment = $state(600000);
	let interestRate = $state(4.15);
	let loanTerm = $state(25);
	let paymentFrequency = $state('monthly');

	// Min/Max values
	const MIN_PURCHASE_PRICE = 500000;
	const MAX_PURCHASE_PRICE = 20000000;
	const MIN_DOWN_PAYMENT = 0;
	const MIN_INTEREST_RATE = 2;
	const MAX_INTEREST_RATE = 10;
	const MIN_LOAN_TERM = 5;
	const MAX_LOAN_TERM = 30;

	// Calculate derived values
	let monthlyPayment = $derived(
		calculateMonthlyPayment(purchasePrice - downPayment, interestRate, loanTerm, paymentFrequency)
	);

	let totalInterest = $derived(
		calculateTotalInterest(purchasePrice - downPayment, interestRate, loanTerm, paymentFrequency)
	);

	let loanToValue = $derived(((purchasePrice - downPayment) / purchasePrice) * 100);
	let equityPercentage = $derived(100 - loanToValue);

	let equityWarning = $derived(equityPercentage < 10 ? 'under-10' : equityPercentage < 15 ? 'under-15' : 'ok');

	// Format functions
	function formatCurrency(amount) {
		return new Intl.NumberFormat('nb-NO', {
			style: 'currency',
			currency: 'NOK',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(amount);
	}

	function formatPercentage(value) {
		return new Intl.NumberFormat('nb-NO', {
			style: 'percent',
			minimumFractionDigits: 1,
			maximumFractionDigits: 1
		}).format(value / 100);
	}

	// Market rates (these would typically come from an API)
	const rates = [
		{
			name: 'Ordinært boliglån',
			nominal: 4.15,
			effective: 4.27,
			requirements: ['Inntil 85% av boligverdi', 'Fast inntekt', 'God betjeningsevne']
		},
		{
			name: 'Førstehjemslån',
			nominal: 4.05,
			effective: 4.17,
			requirements: ['Under 34 år', 'Første bolig', 'Inntil 95% av boligverdi']
		},
		{
			name: 'Grønt boliglån',
			nominal: 3.95,
			effective: 4.07,
			requirements: ['Energimerke A eller B', 'Inntil 85% av boligverdi', 'Miljøsertifisert bolig']
		},
		{
			name: 'Seniorlån',
			nominal: 4.25,
			effective: 4.37,
			requirements: ['Over 60 år', 'Nedbetalt bolig', 'Ingen krav til inntekt']
		}
	];

	function calculateMonthlyPayment(principal, rate, years, frequency) {
		const monthlyRate = rate / 100 / 12;
		const numberOfPayments = years * (frequency === 'monthly' ? 12 : 26);
		const payment =
			(principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
			(Math.pow(1 + monthlyRate, numberOfPayments) - 1);
		return frequency === 'monthly' ? payment : (payment * 12) / 26;
	}

	function calculateTotalInterest(principal, rate, years, frequency) {
		const payment = calculateMonthlyPayment(principal, rate, years, frequency);
		const numberOfPayments = years * (frequency === 'monthly' ? 12 : 26);
		return payment * numberOfPayments - principal;
	}

	const requirements = [
		{
			title: 'Betjeningsevne',
			description: '5% renteøkning skal kunne betjenes',
			icon: 'heroicons:calculator'
		},
		{
			title: 'Egenkapital',
			description: 'Minimum 15% av boligens verdi',
			icon: 'heroicons:banknotes'
		},
		{
			title: 'Gjeldsgrad',
			description: 'Maksimalt 5 ganger brutto årsinntekt',
			icon: 'heroicons:scale'
		}
	];

	const documents = [
		{
			title: 'Inntektsdokumentasjon',
			items: ['Siste 3 lønnsslipper', 'Siste skattemelding', 'Arbeidskontrakt']
		},
		{
			title: 'Verdivurdering',
			items: ['Takst eller verdivurdering', 'Tilstandsrapport', 'Kjøpekontrakt (ved kjøp)']
		},
		{
			title: 'Annen dokumentasjon',
			items: ['Legitimasjon', 'Eventuell medlåntaker', 'Formuesoversikt']
		}
	];

	const features = [
		{
			name: 'Fleksibel nedbetaling',
			description: 'Velg mellom månedlige eller 14-daglige betalinger. Avdragsfrihet mulig.',
			icon: 'heroicons:calendar'
		},
		{
			name: 'Rentebinding',
			description: 'Tilbyr fastrente i 3, 5 eller 10 år for forutsigbarhet.',
			icon: 'heroicons:lock-closed'
		},
		{
			name: 'Digital søknad',
			description: 'Enkel søknadsprosess med rask behandling.',
			icon: 'heroicons:device-phone-mobile'
		},
		{
			name: 'Personlig rådgiver',
			description: 'Fast kontaktperson gjennom hele prosessen.',
			icon: 'heroicons:user-circle'
		}
	];
</script>

<svelte:head>
	<title>Boliglån | HavBank - Konkurransedyktige boliglån</title>
	<meta
		name="description"
		content="HavBank tilbyr konkurransedyktige boliglån med fleksible betingelser. Beregn ditt lån med vår kalkulator og søk digitalt."
	/>
	<meta name="keywords" content="boliglån, huslån, boligkjøp, førstehjemslån, grønt boliglån, norge" />
	<meta property="og:title" content="Boliglån | HavBank" />
	<meta
		property="og:description"
		content="Konkurransedyktige boliglån med fleksible betingelser. Beregn ditt lån med vår kalkulator."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/privat/boliglan" />
</svelte:head>

<style>
	input[type="range"] {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		-ms-appearance: none;
		width: 100%;
		height: 2px;
		background: #1e293b;
		border-radius: 8px;
		outline: none;
		margin: 0;
		padding: 0;
	}

	input[type="range"]::-webkit-slider-thumb {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: white;
		cursor: pointer;
		border: 2px solid #3b82f6;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		margin-top: -9px;
		-webkit-appearance: none;
	}

	input[type="range"]::-moz-range-thumb {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: white;
		cursor: pointer;
		border: 2px solid #3b82f6;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	input[type="range"]::-moz-range-track {
		width: 100%;
		height: 2px;
		background: #1e293b;
		border-radius: 8px;
	}

	input[type="range"]::-webkit-slider-runnable-track {
		width: 100%;
		height: 2px;
		background: #1e293b;
		border-radius: 8px;
	}

	.equity-slider {
		background: linear-gradient(to right, #ef4444 0%, #eab308 50%, #22c55e 100%);
	}

	.equity-slider::-webkit-slider-runnable-track {
		background: linear-gradient(to right, #ef4444 0%, #eab308 50%, #22c55e 100%);
	}

	.equity-slider::-moz-range-track {
		background: linear-gradient(to right, #ef4444 0%, #eab308 50%, #22c55e 100%);
	}
</style>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Boliglån
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi tilbyr konkurransedyktige boliglån tilpasset dine behov. Bruk vår kalkulator for å beregne
					månedlige kostnader og søk digitalt.
				</p>
				<div class="mt-10 flex items-center gap-x-6">
					<a
						href="/privat/boliglan/sok"
						class="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700"
					>
						Søk boliglån
					</a>
					<a
						href="/bestill-time"
						class="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
					>
						Snakk med rådgiver
						{#if browser && Icon}
							{@const IconComponent = Icon}
							<IconComponent 
								icon="heroicons:arrow-right" 
								class="ml-2 w-5 h-5" 
							/>
						{:else}
							<span aria-hidden="true">→</span>
						{/if}
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Loan Calculator -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700" id="kalkulator">
				<div class="p-8">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Lånekalkulator</h2>
					<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
						<div class="space-y-8">
							<!-- Purchase Price Slider -->
							<div>
								<div class="flex justify-between items-center mb-2">
									<label for="purchasePrice" class="text-sm text-gray-300">
										Kjøpesum
									</label>
									<span class="text-sm text-white">
										{formatCurrency(purchasePrice)}
									</span>
								</div>
								<div class="relative mt-2">
									<input
										type="range"
										name="purchasePrice"
										id="purchasePrice"
										bind:value={purchasePrice}
										min={MIN_PURCHASE_PRICE}
										max={MAX_PURCHASE_PRICE}
										step="100000"
										class="w-full"
									/>
									<div class="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-400">
										<span>{formatCurrency(MIN_PURCHASE_PRICE)}</span>
										<span>{formatCurrency(MAX_PURCHASE_PRICE)}</span>
									</div>
								</div>
							</div>

							<!-- Down Payment Slider -->
							<div>
								<div class="flex justify-between items-center mb-2">
									<label for="downPayment" class="text-sm text-gray-300">
										Egenkapital
									</label>
									<div class="text-right">
										<span class="text-sm text-white">
											{formatCurrency(downPayment)}
										</span>
										<span class="text-xs text-gray-400 ml-1">
											({formatPercentage(equityPercentage)})
										</span>
									</div>
								</div>
								{#if equityWarning === 'under-10'}
									<div class="mb-2 text-sm text-red-400">
										<div class="flex items-center gap-1">
											{#if browser && Icon}
												{@const IconComponent = Icon}
												<IconComponent icon="heroicons:exclamation-triangle" class="h-4 w-4" />
											{/if}
											Egenkapital under 10% krever særskilt vurdering
										</div>
									</div>
								{:else if equityWarning === 'under-15'}
									<div class="mb-2 text-sm text-yellow-400">
										<div class="flex items-center gap-1">
											{#if browser && Icon}
												{@const IconComponent = Icon}
												<IconComponent icon="heroicons:information-circle" class="h-4 w-4" />
											{/if}
											Redusert egenkapitalkrav på 10% gjelder
										</div>
									</div>
								{/if}
								<div class="relative mt-2">
									<input
										type="range"
										name="downPayment"
										id="downPayment"
										bind:value={downPayment}
										min={MIN_DOWN_PAYMENT}
										max={purchasePrice * 0.5}
										step="50000"
										class="w-full equity-slider"
									/>
									<div class="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-400">
										<span>0%</span>
										<span>50%</span>
									</div>
								</div>
							</div>

							<!-- Interest Rate Slider -->
							<div>
								<div class="flex justify-between items-center mb-2">
									<label for="interestRate" class="text-sm text-gray-300">
										Rente
									</label>
									<span class="text-sm text-white">
										{interestRate.toFixed(2)}%
									</span>
								</div>
								<div class="relative mt-2">
									<input
										type="range"
										name="interestRate"
										id="interestRate"
										bind:value={interestRate}
										min={MIN_INTEREST_RATE}
										max={MAX_INTEREST_RATE}
										step="0.05"
										class="w-full"
									/>
									<div class="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-400">
										<span>{MIN_INTEREST_RATE}%</span>
										<span>{MAX_INTEREST_RATE}%</span>
									</div>
								</div>
							</div>

							<!-- Loan Term Slider -->
							<div>
								<div class="flex justify-between items-center mb-2">
									<label for="loanTerm" class="text-sm text-gray-300">
										Nedbetalingstid
									</label>
									<span class="text-sm text-white">
										{loanTerm} år
									</span>
								</div>
								<div class="relative mt-2">
									<input
										type="range"
										name="loanTerm"
										id="loanTerm"
										bind:value={loanTerm}
										min={MIN_LOAN_TERM}
										max={MAX_LOAN_TERM}
										class="w-full"
									/>
									<div class="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-400">
										<span>{MIN_LOAN_TERM} år</span>
										<span>{MAX_LOAN_TERM} år</span>
									</div>
								</div>
							</div>

							<!-- Payment Frequency -->
							<div>
								<label for="paymentFrequency" class="block text-sm text-gray-300 mb-2">
									Betalingsfrekvens
								</label>
								<div class="grid grid-cols-2 gap-4">
									<button
										class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors
										{paymentFrequency === 'monthly'
											? 'bg-blue-600 text-white border-blue-600'
											: 'border-gray-600 text-gray-300 hover:bg-gray-800'}"
										onclick={() => (paymentFrequency = 'monthly')}
									>
										Månedlig
									</button>
									<button
										class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors
										{paymentFrequency === 'biweekly'
											? 'bg-blue-600 text-white border-blue-600'
											: 'border-gray-600 text-gray-300 hover:bg-gray-800'}"
										onclick={() => (paymentFrequency = 'biweekly')}
									>
										14-daglig
									</button>
								</div>
							</div>
						</div>

						<div class="bg-[#1a1f2e] p-6 rounded-lg">
							<h3 class="text-lg font-semibold text-white mb-6">Lånedetaljer</h3>
							<dl class="space-y-6">
								<div>
									<dt class="text-sm text-gray-400">Lånebeløp</dt>
									<dd class="mt-1 text-3xl font-semibold text-white">
										{formatCurrency(purchasePrice - downPayment)}
									</dd>
								</div>
								<div>
									<dt class="text-sm text-gray-400">
										{paymentFrequency === 'monthly' ? 'Månedlig' : '14-daglig'} betaling
									</dt>
									<dd class="mt-1 text-3xl font-semibold text-white">
										{formatCurrency(monthlyPayment)}
									</dd>
								</div>
								<div>
									<dt class="text-sm text-gray-400">Totale rentekostnader</dt>
									<dd class="mt-1 text-3xl font-semibold text-white">
										{formatCurrency(totalInterest)}
									</dd>
								</div>
								<div>
									<dt class="text-sm text-gray-400">Belåningsgrad</dt>
									<dd class="mt-1">
										<div class="flex items-center">
											<div class="flex-grow h-2 bg-gray-700 rounded-full overflow-hidden">
												<div
													class="h-full transition-all duration-300 rounded-full
													{equityWarning === 'under-10'
														? 'bg-red-500'
														: equityWarning === 'under-15'
														? 'bg-yellow-500'
														: 'bg-green-500'}"
													style="width: {loanToValue}%"
												></div>
											</div>
											<span class="ml-2 text-lg font-semibold text-white">
												{loanToValue.toFixed(1)}%
											</span>
										</div>
									</dd>
								</div>
							</dl>
							<div class="mt-8">
								<a
									href="/privat/boliglan/sok"
									class="block w-full text-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
								>
									Søk nå
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Info Section -->
				<div class="mt-8 ml-6 flex items-start gap-2 text-gray-300">
					{#if browser && Icon}
						{@const IconComponent = Icon}
						<IconComponent
							icon="heroicons:information-circle"
							class="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5"
						/>
					{/if}
					<div class="text-sm mb-6">
						<p class="font-medium text-white">Redusert egenkapitalkrav</p>
						<p class="mt-1">
							Kravet for egenkapital for boliglån er nå senket fra 15% til 10%. Dette gjør det enklere for
							flere å komme inn i boligmarkedet. Lavere egenkapital enn 10% kan vurderes i spesielle
							tilfeller.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Current Rates -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				Våre boliglån
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vi tilbyr konkurransedyktige renter og fleksible nedbetalingsplaner tilpasset din situasjon.
			</p>

			<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
				{#each rates as rate}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{rate.name}</h3>
						<div class="mt-2 space-y-2">
							<p class="text-3xl font-bold text-gray-900 dark:text-white">{rate.nominal}%</p>
							<p class="text-sm text-gray-500 dark:text-gray-400">
								Effektiv rente: {rate.effective}%
							</p>
						</div>
						<ul class="mt-4 space-y-2">
							{#each rate.requirements as requirement}
								<li class="flex items-start gap-x-2 text-sm text-gray-600 dark:text-gray-300">
									{#if browser && Icon}
										{@const IconComponent = Icon}
										<IconComponent 
											icon="heroicons:check"
											class="h-5 w-5 text-blue-700 dark:text-blue-400 mt-0.5"
										/>
									{/if}
									{requirement}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Features -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Fordeler med boliglån hos oss
			</h2>
			<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
				{#each features as feature}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								{@const IconComponent = Icon}
								<IconComponent 
									icon={feature.icon}
									class="h-6 w-6 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{feature.name}</h3>
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Requirements -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Krav til låntaker</h2>
			<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
				{#each requirements as requirement}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								{@const IconComponent = Icon}
								<IconComponent 
									icon={requirement.icon}
									class="h-6 w-6 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
								{requirement.title}
							</h3>
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400">{requirement.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Required Documents -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Nødvendig dokumentasjon
			</h2>
			<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
				{#each documents as doc}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{doc.title}</h3>
						<ul class="space-y-2">
							{#each doc.items as item}
								<li class="flex items-start gap-x-2 text-sm text-gray-600 dark:text-gray-300">
									{#if browser && Icon}
										{@const IconComponent = Icon}
										<IconComponent 
											icon="heroicons:document-text"
											class="h-5 w-5 text-blue-700 dark:text-blue-400 mt-0.5"
										/>
									{/if}
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Legal Disclaimer -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32 pb-24">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Alle lånetilbud gis med forbehold om kredittgodkjenning. Nominelle og effektive renter er oppgitt
				per 01.01.2024 og kan endres i henhold til markedsforhold og bankens retningslinjer. Eksempel på
				effektiv rente: 4,27 % ved lånebeløp 2 millioner over 25 år, etableringsgebyr 2 000 kr,
				termingebyr 85 kr. Totalt å betale over lånets løpetid: 3 282 460 kr. For fullstendige vilkår,
				se vår prisliste og låneavtale.
			</p>
		</div>
	</div>
</div> 