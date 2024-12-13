<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
	let IconifyIcon = Icon;
	

	const products = [
		{
			id: 'bsu',
			name: 'BSU',
			rate: '6.5% rente',
			icon: 'heroicons:home'
		},
		{
			id: 'high-interest',
			name: 'Høyrentekonto',
			rate: '4.5% rente',
			icon: 'heroicons:banknotes'
		},
		{
			id: 'savings-agreement',
			name: 'Spareavtale',
			rate: 'Fast sparing',
			icon: 'heroicons:calendar'
		}
	];

	const savingsProducts = [
		{
			name: 'BSU',
			description: 'Boligsparing for Ungdom - den beste sparerenten for deg under 34 år',
			rate: 6.5,
			features: [
				'Markedets beste sparerente på 6,5%',
				'Skattefradrag på 20% av sparebeløpet',
				'Maks sparebeløp kr 27 500 per år',
				'For deg mellom 18 og 33 år'
			],
			benefits: [
				'Høyere egenkapital ved boligkjøp',
				'Gunstige lånevilkår',
				'Fleksibel sparing',
				'Automatisk spareavtale'
			],
			icon: 'heroicons:home'
		},
		{
			name: 'Høyrentekonto',
			description: 'Konkurransedyktig rente og full fleksibilitet',
			rate: 4.5,
			features: [
				'Konkurransedyktig rente opptil 4,50%',
				'Ingen begrensninger på uttak',
				'Ingen bindingstid',
				'Gebyrfri bruk'
			],
			benefits: [
				'Full fleksibilitet',
				'Ingen minimumsinnskudd',
				'Nettbank og mobilbank',
				'Automatisk spareavtale'
			],
			icon: 'heroicons:banknotes'
		},
		{
			name: 'Spareavtale',
			description: 'Fast sparing hver måned - bygg opp formue over tid',
			rate: 4.5,
			features: [
				'Automatisk trekk hver måned',
				'Start fra kr 100 per måned',
				'Velg egen trekkdato',
				'Endre eller stopp når som helst'
			],
			benefits: [
				'Disiplinert sparing',
				'Jevn formuesoppbygging',
				'Renters rente effekt',
				'Tilpass til ditt behov'
			],
			icon: 'heroicons:calendar'
		}
	];

	// Calculator state using runes
	let selectedProduct = $state('bsu');
	let initialAmount = $state(214000);
	let monthlyAmount = $state(26600);
	let years = $state(19);

	// Derived values using runes
	let effectiveRate = $derived(selectedProduct === 'bsu' ? 6.5 : 4.5);
	
	let totalSavings = $derived(() => {
		const monthlyRate = effectiveRate / 1200; // Convert annual rate to monthly (divide by 100 * 12)
		const months = years * 12;
		
		const initialFutureValue = initialAmount * Math.pow(1 + monthlyRate, months);
		const monthlyFutureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
		
		return Math.round(initialFutureValue + monthlyFutureValue);
	});

	let totalInterest = $derived(() => {
		const totalDeposits = initialAmount + (monthlyAmount * years * 12);
		return Math.round(Math.max(0, totalSavings() - totalDeposits));
	});

	let taxBenefit = $derived(() => {
		if (selectedProduct !== 'bsu') return 0;
		const yearlyAmount = monthlyAmount * 12;
		return Math.round(Math.min(yearlyAmount, 27500) * 0.2);
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

	function selectProduct(product) {
		selectedProduct = product;
	}

	$effect(() => {
		console.log('Current values:', {
			selectedProduct,
			initialAmount,
			monthlyAmount,
			years,
			effectiveRate,
			totalSavings,
			totalInterest,
			taxBenefit
		});
	});
</script>

<svelte:head>
	<title>Sparing | HavBank - BSU og Høyrentekonto</title>
	<meta
		name="description"
		content="HavBank tilbyr markedets beste BSU-rente på 6,5% og høyrentekonto med opptil 4,50% rente. Start sparingen i dag!"
	/>
	<meta name="keywords" content="BSU, høyrentekonto, sparekonto, ungdomssparing, bank, sparing, norge" />
	<meta property="og:title" content="Sparing | HavBank" />
	<meta
		property="og:description"
		content="Markedets beste BSU-rente på 6,5% og høyrentekonto med opptil 4,50% rente."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/privat/sparing" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Spar smart med oss
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi tilbyr markedets beste BSU-rente på 6,5% og høyrentekonto med opptil 4,50% rente. Start
					sparingen i dag og bygg en trygg økonomisk fremtid.
				</p>
				<div class="mt-10 flex items-center gap-x-6">
					<a
						href="/bli-kunde"
						class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						Bli kunde
					</a>
					<a href="#kalkulator" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
						Prøv vår sparekalkulator <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Products Grid -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each savingsProducts as product}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								{@const IconComponent = Icon}
								<IconComponent icon={product.icon} class="h-6 w-6 text-blue-600" />
							{/if}
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h2>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
						<div class="mb-6">
							<span class="text-3xl font-bold text-gray-900 dark:text-white">{product.rate}%</span>
							<span class="text-gray-600 dark:text-gray-400">rente</span>
						</div>
						<div class="space-y-6">
							<div>
								<h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Egenskaper</h3>
								<ul class="space-y-2">
									{#each product.features as feature}
										<li class="flex items-start gap-x-2 text-sm text-gray-600 dark:text-gray-300">
											{#if browser && Icon}
												{@const IconComponent = Icon}
												<IconComponent
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
												{@const IconComponent = Icon}
												<IconComponent
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
			<h2 class="text-2xl font-bold text-white mb-8">Sparekalkulator</h2>

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
							max="1000000"
							step="1000"
						/>
						<div class="flex justify-between text-xs text-gray-500">
							<span>kr 0</span>
							<span>kr 1 000 000</span>
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
							max="50000"
							step="100"
						/>
						<div class="flex justify-between text-xs text-gray-500">
							<span>kr 0</span>
							<span>kr 50 000</span>
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

					{#if selectedProduct === 'bsu'}
						<div class="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
							<div class="flex items-start gap-3">
								{#if browser && Icon}
									<Icon icon="heroicons:information-circle" class="h-5 w-5 text-blue-400 flex-shrink-0" />
								{/if}
								<div class="text-sm text-gray-300">
									<span class="font-medium text-white block mb-1">BSU-fordeler</span>
									Du får 20% skattefradrag på sparebeløpet, maksimalt kr 27 500 per år.
								</div>
							</div>
						</div>
					{/if}
				</div>

				<div>
					<div
						class="results-circle"
						style="--progress: {Math.min((totalSavings() / Math.max(initialAmount + monthlyAmount * years * 12, 1)) * 100, 100)}%"
					>
						<div class="results-content">
							<div class="text-3xl font-bold text-white">{formatCurrency(totalSavings())}</div>
							<div class="text-sm text-gray-400">Total</div>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4 mt-8">
						<div class="result-card">
							<div class="text-sm text-gray-400">Renteinntekter</div>
							<div class="text-xl font-bold text-white mt-1">{formatCurrency(totalInterest())}</div>
						</div>

						<div class="result-card">
							<div class="text-sm text-gray-400">Effektiv rente</div>
							<div class="text-xl font-bold text-white mt-1">{effectiveRate}%</div>
						</div>

						<div class="result-card">
							<div class="text-sm text-gray-400">Månedlig sparing</div>
							<div class="text-xl font-bold text-white mt-1">{formatCurrency(monthlyAmount)}</div>
						</div>

						{#if selectedProduct === 'bsu'}
							<div class="result-card">
								<div class="text-sm text-gray-400">Årlig skattefradrag</div>
								<div class="text-xl font-bold text-white mt-1">{formatCurrency(taxBenefit())}</div>
							</div>
						{/if}
					</div>

					<button class="w-full mt-8 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors">
						Start sparingen
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Legal Info -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32 pb-24">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Alle renter er nominelle renter per 01.01.2024 og kan endres i henhold til markedsforhold og
				bankens retningslinjer. BSU er forbeholdt personer mellom 18 og 33 år, med maksimalt årlig
				sparebeløp på kr 27 500. Skattefradrag på 20% av sparebeløpet gjelder kun for norske
				skattebetalere. For fullstendige vilkår, se vår prisliste og produktinformasjon.
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