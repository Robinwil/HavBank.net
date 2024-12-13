<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
	let IconifyIcon = Icon;
	

	const products = [
		{
			id: 'innbo',
			name: 'Innboforsikring',
			rate: 'Fra kr 99/mnd',
			icon: 'heroicons:home'
		},
		{
			id: 'reise',
			name: 'Reiseforsikring',
			rate: 'Fra kr 49/mnd',
			icon: 'heroicons:globe-europe-africa'
		},
		{
			id: 'liv',
			name: 'Livsforsikring',
			rate: 'Fra kr 199/mnd',
			icon: 'heroicons:heart'
		}
	];

	const insuranceProducts = [
		{
			name: 'Innboforsikring',
			description: 'Trygg dekning av alt innbo og løsøre i hjemmet ditt',
			rate: '99',
			features: [
				'Dekning opptil 2 millioner kroner',
				'Inkludert tyveri og brann',
				'Vannskadedekning',
				'ID-tyveriforsikring inkludert'
			],
			benefits: [
				'Rask skadebehandling',
				'Ingen egenandel ved ID-tyveri',
				'Dekker også i bod og garasje',
				'Nødutgifter ved skade'
			],
			icon: 'heroicons:home'
		},
		{
			name: 'Reiseforsikring',
			description: 'Helårs reiseforsikring som dekker alle reiser, hele året',
			rate: '49',
			features: [
				'Gjelder hele verden',
				'Ubegrenset antall reiser',
				'Avbestillingsforsikring',
				'Bagasjeforsikring'
			],
			benefits: [
				'24/7 reisehjelp',
				'Dekker hele familien',
				'Ingen egenandel',
				'Gjelder også dagsreiser'
			],
			icon: 'heroicons:globe-europe-africa'
		},
		{
			name: 'Livsforsikring',
			description: 'Økonomisk trygghet for dine nærmeste',
			rate: '199',
			features: [
				'Valgfri forsikringssum',
				'Gjelder hele døgnet',
				'Kritisk sykdom inkludert',
				'Uføredekning tilgjengelig'
			],
			benefits: [
				'Rask utbetaling',
				'Ingen sparedel',
				'Skattefri utbetaling',
				'Gunstig helsevurdering'
			],
			icon: 'heroicons:heart'
		}
	];

	// Calculator state using runes
	let selectedProduct = $state('innbo');
	let coverage = $state(2000000); // Forsikringssum
	let age = $state(30);
	let familySize = $state(1);
	let hasAlarm = $state(false);

	// Derived values using runes
	let monthlyPremium = $derived(() => {
		let base = 0;
		switch (selectedProduct) {
			case 'innbo':
				base = (coverage / 1000000) * 99; // 99 kr per million i dekning
				if (hasAlarm) base *= 0.9; // 10% rabatt med alarm
				break;
			case 'reise':
				base = 49 + (familySize - 1) * 25; // 49 kr basis + 25 kr per ekstra person
				break;
			case 'liv':
				base = (coverage / 1000000) * (age < 35 ? 199 : 299); // Høyere premie over 35 år
				break;
		}
		return Math.round(base);
	});

	let yearlyPremium = $derived(() => monthlyPremium() * 12);

	let totalCoverage = $derived(() => {
		switch (selectedProduct) {
			case 'innbo':
				return coverage;
			case 'reise':
				return 100000 * familySize; // 100 000 kr per person
			case 'liv':
				return coverage;
			default:
				return 0;
		}
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
		// Reset values based on product
		switch (product) {
			case 'innbo':
				coverage = 2000000;
				break;
			case 'reise':
				coverage = 100000;
				break;
			case 'liv':
				coverage = 3000000;
				break;
		}
	}
</script>

<svelte:head>
	<title>Forsikring | HavBank - Innbo, Reise og Livsforsikring</title>
	<meta
		name="description"
		content="Omfattende forsikringsløsninger for deg og din familie. Innboforsikring, reiseforsikring og livsforsikring med konkurransedyktige priser."
	/>
	<meta name="keywords" content="innboforsikring, reiseforsikring, livsforsikring, forsikring, trygghet, norge" />
	<meta property="og:title" content="Forsikring | HavBank" />
	<meta
		property="og:description"
		content="Omfattende forsikringsløsninger for deg og din familie hos HavBank."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/privat/forsikring" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Forsikring for alle livets faser
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi tilbyr omfattende forsikringsløsninger for deg og din familie. Konkurransedyktige priser og
					rask skadebehandling.
				</p>
				<div class="mt-10 flex items-center gap-x-6">
					<a
						href="/bli-kunde"
						class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						Bli kunde
					</a>
					<a href="#kalkulator" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
						Beregn din pris <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Products Grid -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each insuranceProducts as product}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								<Icon icon={product.icon} class="h-6 w-6 text-blue-600" />
							{/if}
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h2>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
						<div class="mb-6">
							<span class="text-3xl font-bold text-gray-900 dark:text-white">Fra kr {product.rate}</span>
							<span class="text-gray-600 dark:text-gray-400">/mnd</span>
						</div>
						<div class="space-y-6">
							<div>
								<h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Dekning</h3>
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
			<h2 class="text-2xl font-bold text-white mb-8">Forsikringskalkulator</h2>

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
							<label for="coverage" class="text-sm text-gray-300">Forsikringssum</label>
							<span class="text-sm text-white">{formatCurrency(coverage)}</span>
						</div>
						<input
							type="range"
							id="coverage"
							bind:value={coverage}
							min={selectedProduct === 'reise' ? 100000 : 1000000}
							max={selectedProduct === 'reise' ? 500000 : 5000000}
							step={selectedProduct === 'reise' ? 100000 : 500000}
						/>
						<div class="flex justify-between text-xs text-gray-500">
							<span>{formatCurrency(selectedProduct === 'reise' ? 100000 : 1000000)}</span>
							<span>{formatCurrency(selectedProduct === 'reise' ? 500000 : 5000000)}</span>
						</div>
					</div>

					{#if selectedProduct === 'liv'}
						<div class="slider-container">
							<div class="flex justify-between mb-2">
								<label for="age" class="text-sm text-gray-300">Alder</label>
								<span class="text-sm text-white">{age} år</span>
							</div>
							<input
								type="range"
								id="age"
								bind:value={age}
								min="18"
								max="70"
								step="1"
							/>
							<div class="flex justify-between text-xs text-gray-500">
								<span>18 år</span>
								<span>70 år</span>
							</div>
						</div>
					{/if}

					{#if selectedProduct === 'reise'}
						<div class="slider-container">
							<div class="flex justify-between mb-2">
								<label for="familySize" class="text-sm text-gray-300">Antall personer</label>
								<span class="text-sm text-white">{familySize} {familySize === 1 ? 'person' : 'personer'}</span>
							</div>
							<input
								type="range"
								id="familySize"
								bind:value={familySize}
								min="1"
								max="6"
								step="1"
							/>
							<div class="flex justify-between text-xs text-gray-500">
								<span>1 person</span>
								<span>6 personer</span>
							</div>
						</div>
					{/if}

					{#if selectedProduct === 'innbo'}
						<div class="flex items-center gap-x-3">
							<input
								type="checkbox"
								id="hasAlarm"
								bind:checked={hasAlarm}
								class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
							/>
							<label for="hasAlarm" class="text-sm text-gray-300">
								Jeg har innbruddsalarm (10% rabatt)
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
								Endelig pris avhenger av flere faktorer og vil bli beregnet nøyaktig ved kjøp. Alle
								forsikringer har vilkår og dekningsoversikt som må gjennomgås før kjøp.
							</div>
						</div>
					</div>
				</div>

				<div>
					<div
						class="results-circle"
						style="--progress: {Math.min((monthlyPremium() / 500) * 100, 100)}%"
					>
						<div class="results-content">
							<div class="text-3xl font-bold text-white">{formatCurrency(monthlyPremium())}</div>
							<div class="text-sm text-gray-400">per måned</div>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4 mt-8">
						<div class="result-card">
							<div class="text-sm text-gray-400">Årlig premie</div>
							<div class="text-xl font-bold text-white mt-1">{formatCurrency(yearlyPremium())}</div>
						</div>

						<div class="result-card">
							<div class="text-sm text-gray-400">Total dekning</div>
							<div class="text-xl font-bold text-white mt-1">{formatCurrency(totalCoverage())}</div>
						</div>

						{#if selectedProduct === 'innbo' && hasAlarm}
							<div class="result-card col-span-2">
								<div class="text-sm text-gray-400">Din rabatt</div>
								<div class="text-xl font-bold text-white mt-1">10% med alarm</div>
							</div>
						{/if}
					</div>

					<button class="w-full mt-8 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors">
						Kjøp forsikring
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Legal Info -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32 pb-24">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Forsikringene leveres av HavBank Forsikring AS. Alle priser er veiledende. Endelig pris og
				vilkår vil bli beregnet basert på en fullstendig risikovurdering. For innboforsikring kan
				faktorer som boligtype, sikkerhetstiltak og tidligere skadehistorikk påvirke prisen. For
				livsforsikring vil helse og yrke være viktige faktorer. Les alltid forsikringsvilkårene nøye før
				kjøp.
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
		cursor: pointer;
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