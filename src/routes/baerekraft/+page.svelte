<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let Icon = $state(null);
	let Chart;

	// Sustainability metrics (to be updated with real data)
	const metrics = {
		carbonFootprint: {
			current: 2500, // tons CO2
			target2025: 1250,
			reduction: 28, // percentage
			yearlyData: [3200, 2900, 2700, 2500] // Last 4 years
		},
		greenInvestments: {
			total: 8.5, // billion NOK
			percentage: 35, // of total investments
			sectors: [
				{ name: 'Fornybar energi', value: 45 },
				{ name: 'Grønn transport', value: 25 },
				{ name: 'Bærekraftig bygg', value: 20 },
				{ name: 'Sirkulær økonomi', value: 10 }
			]
		},
		socialImpact: {
			employeeDiversity: 48, // percentage
			genderBalance: 52, // percentage women in leadership
			communityInvestment: 25, // million NOK
			volunteerHours: 12000
		},
		sustainableFinancing: {
			greenLoans: 12.3, // billion NOK
			greenBonds: 5.8, // billion NOK
			sustainableProducts: 15 // number of products
		}
	};

	// ESG Scores (Environmental, Social, Governance)
	const esgScores = {
		environmental: 82,
		social: 78,
		governance: 85
	};

	// UN Sustainable Development Goals we focus on
	const sdgFocus = [
		{ number: 7, name: 'Ren energi', progress: 75 },
		{ number: 8, name: 'Anstendig arbeid og økonomisk vekst', progress: 82 },
		{ number: 11, name: 'Bærekraftige byer og lokalsamfunn', progress: 68 },
		{ number: 13, name: 'Stoppe klimaendringene', progress: 71 },
		{ number: 17, name: 'Samarbeid for å nå målene', progress: 79 }
	];

	onMount(async () => {
		const [iconModule, chartModule] = await Promise.all([
			import('@iconify/svelte'),
			import('chart.js/auto')
		]);
		Icon = iconModule.default;
		Chart = chartModule.default;

		// Carbon Footprint Chart
		const carbonCtx = document.getElementById('carbonChart');
		new Chart(carbonCtx, {
			type: 'line',
			data: {
				labels: ['2020', '2021', '2022', '2023'],
				datasets: [{
					label: 'CO₂-utslipp (tonn)',
					data: metrics.carbonFootprint.yearlyData,
					borderColor: '#22c55e',
					backgroundColor: 'rgba(34, 197, 94, 0.1)',
					tension: 0.4,
					fill: true
				}]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'top'
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							color: 'rgba(0, 0, 0, 0.1)'
						}
					}
				}
			}
		});

		// Green Investments Chart
		const investmentCtx = document.getElementById('investmentChart');
		new Chart(investmentCtx, {
			type: 'doughnut',
			data: {
				labels: metrics.greenInvestments.sectors.map(s => s.name),
				datasets: [{
					data: metrics.greenInvestments.sectors.map(s => s.value),
					backgroundColor: [
						'#22c55e',
						'#3b82f6',
						'#a855f7',
						'#f59e0b'
					]
				}]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom'
					}
				}
			}
		});
	});
</script>

<svelte:head>
	<title>Bærekraft | HavBank - Vår innsats for en bærekraftig fremtid</title>
	<meta
		name="description"
		content="HavBank jobber aktivt med bærekraft gjennom grønne investeringer, redusert klimaavtrykk og sosial ansvarlighet."
	/>
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Bærekraft i alt vi gjør
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi tar ansvar for miljøet, samfunnet og fremtidige generasjoner. Gjennom målrettede tiltak
					og grønne investeringer bidrar vi til en bærekraftig fremtid.
				</p>
			</div>
		</div>
	</div>

	<!-- Key Metrics Grid -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Carbon Footprint -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center gap-x-3">
					{#if browser && Icon}
						<Icon icon="heroicons:globe-europe-africa" class="h-6 w-6 text-green-500" />
					{/if}
					<h3 class="text-sm font-medium text-gray-900 dark:text-white">CO₂-reduksjon</h3>
				</div>
				<p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
					{metrics.carbonFootprint.reduction}%
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">Reduksjon siden 2020</p>
			</div>

			<!-- Green Investments -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center gap-x-3">
					{#if browser && Icon}
						<Icon icon="heroicons:banknotes" class="h-6 w-6 text-green-500" />
					{/if}
					<h3 class="text-sm font-medium text-gray-900 dark:text-white">Grønne investeringer</h3>
				</div>
				<p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
					{metrics.greenInvestments.total} mrd
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">NOK investert i grønne prosjekter</p>
			</div>

			<!-- Social Impact -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center gap-x-3">
					{#if browser && Icon}
						<Icon icon="heroicons:users" class="h-6 w-6 text-green-500" />
					{/if}
					<h3 class="text-sm font-medium text-gray-900 dark:text-white">Kjønnsbalanse ledelse</h3>
				</div>
				<p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
					{metrics.socialImpact.genderBalance}%
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">Kvinner i ledende stillinger</p>
			</div>

			<!-- Sustainable Products -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center gap-x-3">
					{#if browser && Icon}
						<Icon icon="heroicons:sparkles" class="h-6 w-6 text-green-500" />
					{/if}
					<h3 class="text-sm font-medium text-gray-900 dark:text-white">Grønne produkter</h3>
				</div>
				<p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
					{metrics.sustainableFinancing.sustainableProducts}
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">Bærekraftige finansprodukter</p>
			</div>
		</div>
	</div>

	<!-- Charts Section -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Carbon Footprint Chart -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Karbonfotavtrykk utvikling</h3>
				<canvas id="carbonChart"></canvas>
			</div>

			<!-- Green Investments Chart -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fordeling grønne investeringer</h3>
				<canvas id="investmentChart"></canvas>
			</div>
		</div>
	</div>

	<!-- UN SDG Section -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">FNs bærekraftsmål vi fokuserer på</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each sdgFocus as goal}
				<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
					<div class="flex items-center gap-x-3 mb-4">
						<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
							<span class="text-xl font-bold text-white">{goal.number}</span>
						</div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white">{goal.name}</h3>
					</div>
					<div class="relative pt-1">
						<div class="flex mb-2 items-center justify-between">
							<div>
								<span class="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
									Fremgang
								</span>
							</div>
							<div class="text-right">
								<span class="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
									{goal.progress}%
								</span>
							</div>
						</div>
						<div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
							<div
								style="width: {goal.progress}%"
								class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
							></div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ESG Scores -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">ESG-score</h2>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
			<!-- Environmental Score -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-medium text-gray-900 dark:text-white">Miljø</h3>
					<span class="text-2xl font-bold text-green-500">{esgScores.environmental}</span>
				</div>
				<div class="relative pt-1">
					<div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200 dark:bg-green-900">
						<div
							style="width: {esgScores.environmental}%"
							class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
						></div>
					</div>
				</div>
			</div>

			<!-- Social Score -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-medium text-gray-900 dark:text-white">Sosialt</h3>
					<span class="text-2xl font-bold text-blue-500">{esgScores.social}</span>
				</div>
				<div class="relative pt-1">
					<div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
						<div
							style="width: {esgScores.social}%"
							class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
						></div>
					</div>
				</div>
			</div>

			<!-- Governance Score -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-medium text-gray-900 dark:text-white">Styring</h3>
					<span class="text-2xl font-bold text-purple-500">{esgScores.governance}</span>
				</div>
				<div class="relative pt-1">
					<div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200 dark:bg-purple-900">
						<div
							style="width: {esgScores.governance}%"
							class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
						></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Download Report Section -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="rounded-2xl bg-blue-600 px-6 py-16 sm:p-16">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-bold tracking-tight text-white">Last ned vår bærekraftsrapport</h2>
				<p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
					Få detaljert innsikt i vårt bærekraftsarbeid, mål og resultater i vår årlige rapport.
				</p>
				<div class="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/reports/baerekraft-2023.pdf"
						class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						Last ned rapport (PDF)
					</a>
					<a href="/baerekraft/historikk" class="text-sm font-semibold leading-6 text-white">
						Se tidligere rapporter <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Dark mode adjustments for charts */
	:global(.dark) canvas {
		filter: brightness(0.8) contrast(1.2);
	}
</style> 