<script>
	import { browser } from '$app/environment';
    import Icon from '@iconify/svelte';
	let IconifyIcon = Icon;
	

	const products = [
		{
			id: 'fond',
			name: 'Fond',
			rate: 'Fra 0,30% årlig',
			icon: 'heroicons:chart-bar'
		},
		{
			id: 'aksjer',
			name: 'Aksjer',
			rate: 'Fra kr 39 per handel',
			icon: 'heroicons:presentation-chart-line'
		},
		{
			id: 'aksjesparekonto',
			name: 'ASK',
			rate: 'Skattefordeler',
			icon: 'heroicons:building-library'
		}
	];

	const investmentProducts = [
		{
			name: 'Fond',
			description: 'Bredt utvalg av fond fra ledende forvaltere',
			rate: '0.30%',
			features: [
				'Over 500 fond å velge mellom',
				'Lave forvaltningskostnader',
				'Automatisk spareavtale',
				'Grundig fondsanalyse'
			],
			benefits: [
				'Profesjonell forvaltning',
				'God risikospredning',
				'Enkel start og stopp',
				'Månedlig rapportering'
			],
			icon: 'heroicons:chart-bar'
		},
		{
			name: 'Aksjer',
			description: 'Handle aksjer på Oslo Børs og internasjonale markeder',
			rate: '39',
			features: [
				'Sanntidskurser på Oslo Børs',
				'Handel i 30+ markeder',
				'Avanserte handelsordrer',
				'Grundige selskapsanalyser'
			],
			benefits: [
				'Konkurransedyktige priser',
				'Moderne handelsplattform',
				'Omfattende markedsdata',
				'Personlig rådgivning'
			],
			icon: 'heroicons:presentation-chart-line'
		},
		{
			name: 'Aksjesparekonto',
			description: 'Skatteeffektiv sparing i aksjer og aksjefond',
			rate: '0',
			features: [
				'Utsatt skatt på gevinst',
				'Fritt bytte mellom aksjer/fond',
				'Ingen bindingstid',
				'Gratis kontoopprettelse'
			],
			benefits: [
				'Skatteeffektiv sparing',
				'Fleksibel forvaltning',
				'Oversiktlig rapportering',
				'Enkel skatteberegning'
			],
			icon: 'heroicons:building-library'
		}
	];

	// Calculator state using runes
	let selectedProduct = $state('fond');
	let initialAmount = $state(100000);
	let monthlyAmount = $state(5000);
	let years = $state(10);
	let expectedReturn = $state(7);

	// Derived values using runes
	let effectiveCost = $derived(() => {
		switch (selectedProduct) {
			case 'fond':
				return 0.3; // 0.30% årlig forvaltningsgebyr
			case 'aksjer':
				// Estimert kostnad basert på månedlig handel
				const yearlyTradingCost = 39 * 12;
				const yearlyInvestment = initialAmount + monthlyAmount * 12;
				return (yearlyTradingCost / yearlyInvestment) * 100;
			case 'aksjesparekonto':
				return 0; // Ingen direkte kostnader
			default:
				return 0;
		}
	});

	let totalSavings = $derived(() => {
		const monthlyRate = (expectedReturn - effectiveCost()) / 1200; // Convert to monthly rate
		const months = years * 12;
		
		const initialFutureValue = initialAmount * Math.pow(1 + monthlyRate, months);
		const monthlyFutureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
		
		return Math.round(initialFutureValue + monthlyFutureValue);
	});

	let totalReturn = $derived(() => {
		const totalDeposits = initialAmount + (monthlyAmount * years * 12);
		return Math.round(Math.max(0, totalSavings() - totalDeposits));
	});

	let totalCosts = $derived(() => {
		if (selectedProduct === 'aksjer') {
			return Math.round(39 * 12 * years); // Fast kostnad per handel
		}
		// For fond og ASK: årlig prosent av gjennomsnittlig investert beløp
		const avgAmount = (initialAmount + totalSavings()) / 2;
		return Math.round((effectiveCost() / 100) * avgAmount * years);
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
		// Reset expected return based on product
		switch (product) {
			case 'fond':
				expectedReturn = 7;
				break;
			case 'aksjer':
				expectedReturn = 8;
				break;
			case 'aksjesparekonto':
				expectedReturn = 7;
				break;
		}
	}
</script>

<svelte:head>
	<title>Investering | HavBank - Fond, Aksjer og ASK</title>
	<meta
		name="description"
		content="Invester i fond, aksjer og aksjesparekonto hos HavBank. Konkurransedyktige priser og moderne handelsplattform."
	/>
	<meta name="keywords" content="fond, aksjer, aksjesparekonto, investering, børs, sparing, norge" />
	<meta property="og:title" content="Investering | HavBank" />
	<meta
		property="og:description"
		content="Invester smart med HavBank. Velg mellom fond, aksjer og aksjesparekonto."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/privat/investering" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Invester i fremtiden
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Velg mellom et bredt utvalg av fond og aksjer, eller start med en skatteeffektiv aksjesparekonto.
					Moderne handelsplattform og konkurransedyktige priser.
				</p>
				<div class="mt-10 flex items-center gap-x-6">
					<a
						href="/bli-kunde"
						class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						Bli kunde
					</a>
					<a href="#kalkulator" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
						Prøv vår avkastningskalkulator <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Products Grid -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each investmentProducts as product}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								<Icon icon={product.icon} class="h-6 w-6 text-blue-600" />
							{/if}
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h2>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
						<div class="mb-6">
							{#if product.name === 'Aksjer'}
								<span class="text-3xl font-bold text-gray-900 dark:text-white">Fra kr {product.rate}</span>
								<span class="text-gray-600 dark:text-gray-400">per handel</span>
							{:else if product.name === 'Aksjesparekonto'}
								<span class="text-3xl font-bold text-gray-900 dark:text-white">0 kr</span>
								<span class="text-gray-600 dark:text-gray-400">i opprettelse</span>
							{:else}
								<span class="text-3xl font-bold text-gray-900 dark:text-white">{product.rate}%</span>
								<span class="text-gray-600 dark:text-gray-400">årlig gebyr</span>
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
			<h2 class="text-2xl font-bold text-white mb-8">Avkastningskalkulator</h2>

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
					<div class="slider-container">
						<div class="flex justify-between mb-2">
							<label for="initialAmount" class="text-sm text-gray-300">Startbeløp</label>
							<span class="text-sm text-white">{formatCurrency(initialAmount)}</span>
						</div>
						<input
							type="range"
							id="initialAmount"
							bind:value={initialAmount}
							min="0"
							max="2000000"
							step="10000"
						/>
						<div class="flex justify-between text-xs text-gray-500">
							<span>kr 0</span>
							<span>kr 2 000 000</span>
						</div>
					</div>

					<div class="slider-container">
						<div class="flex justify-between mb-2">
							<label for="monthlyAmount" class="text-sm text-gray-300">Månedlig sparing</label>
							<span class="text-sm text-white">{formatCurrency(monthlyAmount)}</span>
						</div>
						<input
							type="range"
							id="monthlyAmount"
							bind:value={monthlyAmount}
							min="0"
							max="100000"
							step="1000"
						/>
						<div class="flex justify-between text-xs text-gray-500">
							<span>kr 0</span>
							<span>kr 100 000</span>
						</div>
					</div>

					<div class="slider-container">
						<div class="flex justify-between mb-2">
							<label for="yearsInput" class="text-sm text-gray-300">Antall år</label>
							<span class="text-sm text-white">{years} år</span>
						</div>
						<input
							type="range"
							id="yearsInput"
							bind:value={years}
							min="1"
							max="40"
							step="1"
						/>
						<div class="flex justify-between text-xs text-gray-500">
							<span>1 år</span>
							<span>40 år</span>
						</div>
					</div>

					<div class="slider-container">
						<div class="flex justify-between mb-2">
							<label for="expectedReturn" class="text-sm text-gray-300">Forventet årlig avkastning</label>
							<span class="text-sm text-white">{expectedReturn}%</span>
						</div>
						<input
							type="range"
							id="expectedReturn"
							bind:value={expectedReturn}
							min="0"
							max="15"
							step="0.5"
						/>
						<div class="flex justify-between text-xs text-gray-500">
							<span>0%</span>
							<span>15%</span>
						</div>
					</div>

					<div class="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
						<div class="flex items-start gap-3">
							{#if browser && Icon}
								<Icon icon="heroicons:information-circle" class="h-5 w-5 text-blue-400 flex-shrink-0" />
							{/if}
							<div class="text-sm text-gray-300">
								<span class="font-medium text-white block mb-1">Viktig informasjon</span>
								Historisk avkastning er ingen garanti for fremtidig avkastning. Investeringer i
								verdipapirer kan både øke og falle i verdi.
							</div>
						</div>
					</div>
				</div>

				<div>
					<div
						class="results-circle"
						style="--progress: {Math.min((totalReturn() / Math.max(totalSavings(), 1)) * 100, 100)}%"
					>
						<div class="results-content">
							<div class="text-3xl font-bold text-white">{formatCurrency(totalSavings())}</div>
							<div class="text-sm text-gray-400">Total</div>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4 mt-8">
						<div class="result-card">
							<div class="text-sm text-gray-400">Total avkastning</div>
							<div class="text-xl font-bold text-white mt-1">{formatCurrency(totalReturn())}</div>
						</div>

						<div class="result-card">
							<div class="text-sm text-gray-400">Effektiv kostnad</div>
							<div class="text-xl font-bold text-white mt-1">{formatPercent(effectiveCost())}</div>
						</div>

						<div class="result-card">
							<div class="text-sm text-gray-400">Totale kostnader</div>
							<div class="text-xl font-bold text-white mt-1">{formatCurrency(totalCosts())}</div>
						</div>

						<div class="result-card">
							<div class="text-sm text-gray-400">Årlig avkastning</div>
							<div class="text-xl font-bold text-white mt-1">{expectedReturn}%</div>
						</div>
					</div>

					<button class="w-full mt-8 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors">
						Start investeringen
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Legal Info -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32 pb-24">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Historisk avkastning er ingen garanti for fremtidig avkastning. Investeringer i verdipapirer kan
				både øke og falle i verdi, og det er ikke sikkert at du får tilbake hele det investerte beløpet.
				Før du tar investeringsbeslutninger bør du sette deg grundig inn i de finansielle instrumentene
				og risikoene knyttet til disse. ASK (Aksjesparekonto) er underlagt gjeldende skatteregler, og
				endringer i disse kan påvirke dine investeringer.
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
		outline: none;
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