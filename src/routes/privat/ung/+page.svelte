<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let Icon = $state(null);

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.default;
	});

	const products = [
		{
			id: 'bsu',
			name: 'BSU',
			rate: '6.5% rente',
			icon: 'heroicons:home'
		},
		{
			id: 'kort',
			name: 'Ungdomskort',
			rate: 'Helt gratis',
			icon: 'heroicons:credit-card'
		},
		{
			id: 'lan',
			name: 'Førstehjemslån',
			rate: 'Fra 4.35%',
			icon: 'heroicons:key'
		}
	];

	const youthProducts = [
		{
			name: 'BSU',
			description: 'Boligsparing for Ungdom - markedets beste sparerente',
			rate: '6.5%',
			features: [
				'Markedets beste rente på 6,5%',
				'Spar opptil 27 500 kr årlig',
				'20% skattefradrag',
				'Perfekt for boligsparing'
			],
			benefits: [
				'Høyere egenkapital',
				'Gunstige lånevilkår',
				'Automatisk sparing',
				'Fleksibel spareplan'
			],
			icon: 'heroicons:home'
		},
		{
			name: 'Ungdomskort',
			description: 'Gratis bankkort med alle funksjoner inkludert',
			rate: '0',
			features: [
				'Helt gratis VISA-kort',
				'Gebyrfri nettbank',
				'Gratis mobilbank',
				'Apple/Google Pay'
			],
			benefits: [
				'Ingen årspris',
				'Gratis uttak i alle minibanker',
				'Reiseforsikring inkludert',
				'Rabatt hos utvalgte partnere'
			],
			icon: 'heroicons:credit-card'
		},
		{
			name: 'Førstehjemslån',
			description: 'Spesialtilpasset boliglån for førstegangskjøpere',
			rate: '4.35',
			features: [
				'Konkurransedyktig rente',
				'Opptil 85% finansiering',
				'Fleksibel nedbetalingstid',
				'Avdragsfrihet mulig'
			],
			benefits: [
				'Personlig rådgiver',
				'Digital søknadsprosess',
				'Gratis verdivurdering',
				'Gunstig forsikring'
			],
			icon: 'heroicons:key'
		}
	];

	// Calculator state using runes
	let selectedProduct = $state('bsu');
	let monthlyAmount = $state(2500);
	let years = $state(5);
	let loanAmount = $state(2500000);
	let hasIncome = $state(false);
	let age = $state(25);

	// Derived values using runes
	let effectiveRate = $derived(() => {
		switch (selectedProduct) {
			case 'bsu':
				return 6.5;
			case 'lan':
				return hasIncome ? 4.35 : 4.85;
			default:
				return 0;
		}
	});

	let monthlyPayment = $derived(() => {
		if (selectedProduct === 'lan') {
			const monthlyRate = effectiveRate() / (100 * 12);
			const months = years * 12;
			return Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1));
		}
		return 0;
	});

	let totalSavings = $derived(() => {
		if (selectedProduct === 'bsu') {
			const monthlyRate = effectiveRate() / 1200;
			const months = years * 12;
			const monthlyFutureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
			return Math.round(monthlyFutureValue);
		}
		return 0;
	});

	let taxBenefit = $derived(() => {
		if (selectedProduct === 'bsu') {
			const yearlyAmount = monthlyAmount * 12;
			return Math.round(Math.min(yearlyAmount, 27500) * 0.2);
		}
		return 0;
	});

	function formatCurrency(amount) {
		if (typeof amount !== 'number' || !isFinite(amount)) return 'kr 0';
		return new Intl.NumberFormat('nb-NO', {
			style: 'currency',
			currency: 'NOK',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(amount);
	}

	function formatPercent(value) {
		if (typeof value !== 'number' || !isFinite(value)) return '0.00%';
		return value.toFixed(2) + '%';
	}

	function selectProduct(product) {
		selectedProduct = product;
	}
</script>

<svelte:head>
	<title>Ungdomsbank | HavBank - BSU, Gratis Kort og Førstehjemslån</title>
	<meta
		name="description"
		content="Spesialtilpassede banktjenester for unge under 34 år. BSU med markedets beste rente, gratis bankkort og gunstig førstehjemslån."
	/>
	<meta name="keywords" content="ungdomsbank, BSU, førstehjemslån, gratis bankkort, ung, student, norge" />
	<meta property="og:title" content="Ungdomsbank | HavBank" />
	<meta
		property="og:description"
		content="Spesialtilpassede banktjenester for unge under 34 år hos HavBank."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/privat/ung" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Bank for unge
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi gir deg markedets beste BSU-rente, gratis bankkort og gunstig førstehjemslån. Alt
					skreddersydd for deg under 34 år.
				</p>
				<div class="mt-10 flex items-center gap-x-6">
					<a
						href="/bli-kunde"
						class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						Bli kunde
					</a>
					<a href="#kalkulator" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
						Prøv kalkulatoren <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Products Grid -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each youthProducts as product}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								<Icon icon={product.icon} class="h-6 w-6 text-blue-600" />
							{/if}
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h2>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
						<div class="mb-6">
							{#if product.name === 'Ungdomskort'}
								<span class="text-3xl font-bold text-gray-900 dark:text-white">Gratis</span>
								<span class="text-gray-600 dark:text-gray-400">for deg under 34</span>
							{:else}
								<span class="text-3xl font-bold text-gray-900 dark:text-white">{product.rate}%</span>
								<span class="text-gray-600 dark:text-gray-400">rente</span>
							{/if}
						</div>
						<div class="space-y-6">
							<div>
								<h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Egenskaper</h3>
								<ul class="space-y-2">
									{#each product.features as feature}
										<li class="flex items-start gap-x-2 text-sm text-gray-600 dark:text-gray-300">
											{#if browser && Icon}
												<Icon
													icon="heroicons:check"
													class="h-5 w-5 text-blue-600 flex-shrink-0"
												/>
											{/if}
											{feature}
										</li>
									{/each}
								</ul>
							</div>
							<div>
								<h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Fordeler</h3>
								<ul class="space-y-2">
									{#each product.benefits as benefit}
										<li class="flex items-start gap-x-2 text-sm text-gray-600 dark:text-gray-300">
											{#if browser && Icon}
												<Icon
													icon="heroicons:star"
													class="h-5 w-5 text-blue-600 flex-shrink-0"
												/>
											{/if}
											{benefit}
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Calculator Section -->
	<div class="calculator-container mt-32" id="kalkulator">
		<div class="calculator-card p-8 rounded-xl">
			<h2 class="text-2xl font-bold text-white mb-8">Ungdomskalkulator</h2>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				{#each products as product}
					<button 
						class="product-card {selectedProduct === product.id ? 'active' : ''}"
						onclick={() => selectProduct(product.id)}
					>
						<div class="flex items-center gap-3">
							{#if browser && Icon}
								<Icon icon={product.icon} class="h-5 w-5 text-white" />
							{/if}
							<div>
								<div class="font-semibold text-white">{product.name}</div>
								<div class="text-sm text-gray-300">{product.rate}</div>
							</div>
						</div>
					</button>
				{/each}
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div class="space-y-8">
					{#if selectedProduct === 'bsu'}
						<div class="slider-container">
							<div class="flex justify-between mb-2">
								<label for="monthlyAmount" class="text-sm text-gray-300">Månedlig sparing</label>
								<span class="text-sm text-white">{formatCurrency(monthlyAmount)}</span>
							</div>
							<input
								type="range"
								id="monthlyAmount"
								bind:value={monthlyAmount}
								min="500"
								max="5000"
								step="100"
							/>
							<div class="flex justify-between text-xs text-gray-500">
								<span>kr 500</span>
								<span>kr 5 000</span>
							</div>
						</div>
					{:else if selectedProduct === 'lan'}
						<div class="slider-container">
							<div class="flex justify-between mb-2">
								<label for="loanAmount" class="text-sm text-gray-300">Lånebeløp</label>
								<span class="text-sm text-white">{formatCurrency(loanAmount)}</span>
							</div>
							<input
								type="range"
								id="loanAmount"
								bind:value={loanAmount}
								min="500000"
								max="5000000"
								step="100000"
							/>
							<div class="flex justify-between text-xs text-gray-500">
								<span>kr 500 000</span>
								<span>kr 5 000 000</span>
							</div>
						</div>
					{/if}

					<div class="slider-container">
						<div class="flex justify-between mb-2">
							<label for="years" class="text-sm text-gray-300">Antall år</label>
							<span class="text-sm text-white">{years} år</span>
						</div>
						<input
							type="range"
							id="years"
							bind:value={years}
							min={selectedProduct === 'bsu' ? 1 : 5}
							max={selectedProduct === 'bsu' ? 16 : 30}
							step="1"
						/>
						<div class="flex justify-between text-xs text-gray-500">
							<span>{selectedProduct === 'bsu' ? '1' : '5'} år</span>
							<span>{selectedProduct === 'bsu' ? '16' : '30'} år</span>
						</div>
					</div>

					{#if selectedProduct === 'lan'}
						<div class="flex items-center gap-x-3">
							<input
								type="checkbox"
								id="hasIncome"
								bind:checked={hasIncome}
								class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
							/>
							<label for="hasIncome" class="text-sm text-gray-300">
								Jeg har fast inntekt (0.5% lavere rente)
							</label>
						</div>
					{/if}

					<div class="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
						<div class="flex items-start gap-3">
							{#if browser && Icon}
								<Icon icon="heroicons:information-circle" class="h-5 w-5 text-blue-400 flex-shrink-0" />
							{/if}
							<div class="text-sm text-gray-300">
								<span class="font-medium text-white block mb-1">Viktig informasjon</span>
								{#if selectedProduct === 'bsu'}
									BSU er for deg mellom 18 og 33 år. Maksimalt sparebeløp er kr 27 500 per år.
									Skattefradrag gjelder kun for norske skattebetalere.
								{:else if selectedProduct === 'lan'}
									Lånetilbudet avhenger av din inntekt, andre lån og kredittvurdering. Endelig rente
									vil bli fastsatt etter en individuell vurdering.
								{:else}
									Ungdomstilbudet gjelder for deg under 34 år. Alle priser og betingelser
									forutsetter at du er kunde i HavBank.
								{/if}
							</div>
						</div>
					</div>
				</div>

				<div>
					<div
						class="results-circle"
						style="--progress: {selectedProduct === 'bsu' ? Math.min((monthlyAmount / 5000) * 100, 100) : Math.min((loanAmount / 5000000) * 100, 100)}%"
					>
						<div class="results-content">
							{#if selectedProduct === 'bsu'}
								<div class="text-3xl font-bold text-white">{formatCurrency(totalSavings())}</div>
								<div class="text-sm text-gray-400">Total sparing</div>
							{:else if selectedProduct === 'lan'}
								<div class="text-3xl font-bold text-white">{formatCurrency(monthlyPayment())}</div>
								<div class="text-sm text-gray-400">per måned</div>
							{:else}
								<div class="text-3xl font-bold text-white">kr 0</div>
								<div class="text-sm text-gray-400">årlig kostnad</div>
							{/if}
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4 mt-8">
						<div class="result-card">
							<div class="text-sm text-gray-400">Effektiv rente</div>
							<div class="text-xl font-bold text-white mt-1">{formatPercent(effectiveRate())}</div>
						</div>

						{#if selectedProduct === 'bsu'}
							<div class="result-card">
								<div class="text-sm text-gray-400">Årlig skattefradrag</div>
								<div class="text-xl font-bold text-white mt-1">{formatCurrency(taxBenefit())}</div>
							</div>

							<div class="result-card col-span-2">
								<div class="text-sm text-gray-400">Månedlig sparing</div>
								<div class="text-xl font-bold text-white mt-1">{formatCurrency(monthlyAmount)}</div>
							</div>
						{:else if selectedProduct === 'lan'}
							<div class="result-card">
								<div class="text-sm text-gray-400">Lånebeløp</div>
								<div class="text-xl font-bold text-white mt-1">{formatCurrency(loanAmount)}</div>
							</div>

							<div class="result-card col-span-2">
								<div class="text-sm text-gray-400">Total kostnad</div>
								<div class="text-xl font-bold text-white mt-1">
									{formatCurrency(monthlyPayment() * years * 12)}
								</div>
							</div>
						{:else}
							<div class="result-card">
								<div class="text-sm text-gray-400">Årlig besparelse</div>
								<div class="text-xl font-bold text-white mt-1">kr 850</div>
							</div>
						{/if}
					</div>

					<button class="w-full mt-8 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors">
						{#if selectedProduct === 'bsu'}
							Start sparingen
						{:else if selectedProduct === 'lan'}
							Søk om lån
						{:else}
							Bestill kort
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Legal Info -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32 pb-24">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Alle priser og betingelser gjelder for kunder under 34 år. BSU-konto kan opprettes fra året du
				fyller 18 til året du fyller 33. Maksimalt sparebeløp er kr 27 500 per år og totalt kr 300 000.
				Førstehjemslån forutsetter at du ikke har eid bolig tidligere og at boligen skal brukes som
				primærbolig. Alle lån forutsetter kredittgodkjenning. Nominell rente kan avvike fra oppgitt
				effektiv rente.
			</p>
		</div>
	</div>
</div>

<style>
	.calculator-container {
		margin: 2rem auto;
		max-width: 1200px;
		padding: 2rem;
	}

	.calculator-card {
		background: linear-gradient(135deg, #1a1f2e 0%, #2a3142 100%);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	}

	.product-card {
		background: rgba(30, 41, 59, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		padding: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		width: 100%;
		text-align: left;
	}

	.product-card:hover {
		background: rgba(37, 49, 69, 0.8);
	}

	.product-card.active {
		background: rgb(37, 99, 235);
		border-color: rgb(59, 130, 246);
	}

	.slider-container {
		margin: 2rem 0;
	}

	input[type="range"] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 100%;
		height: 2px;
		background: #1e293b;
		border-radius: 8px;
		margin: 1rem 0;
	}

	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 20px;
		height: 20px;
		background: white;
		border-radius: 50%;
		cursor: pointer;
		border: 2px solid rgb(37, 99, 235);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		margin-top: -9px;
	}

	input[type="range"]::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: white;
		border-radius: 50%;
		cursor: pointer;
		border: 2px solid rgb(37, 99, 235);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.results-circle {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background: conic-gradient(
			from 0deg,
			rgb(37, 99, 235) 0%,
			rgb(37, 99, 235) var(--progress),
			#1e293b var(--progress),
			#1e293b 100%
		);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 2rem auto;
	}

	.results-circle::before {
		content: '';
		position: absolute;
		inset: 10px;
		border-radius: 50%;
		background: #1a1f2e;
	}

	.results-content {
		position: relative;
		z-index: 1;
		text-align: center;
	}

	.result-card {
		background: rgba(30, 41, 59, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		padding: 1rem;
		margin: 0.5rem;
	}
</style> 