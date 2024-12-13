<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let Icon = $state(null);
	let Chart;

	// Financial metrics (to be updated with real data)
	const financials = {
		keyMetrics: {
			revenue: 12.4, // billion NOK
			operatingProfit: 4.2, // billion NOK
			netIncome: 3.1, // billion NOK
			eps: 15.2, // NOK
			roe: 12.5, // percentage
			cet1: 17.8 // percentage
		},
		quarterlyResults: [
			{ quarter: 'Q4 2023', revenue: 3.2, profit: 1.1, eps: 4.1 },
			{ quarter: 'Q3 2023', revenue: 3.1, profit: 1.0, eps: 3.8 },
			{ quarter: 'Q2 2023', revenue: 3.0, profit: 1.0, eps: 3.7 },
			{ quarter: 'Q1 2023', revenue: 3.1, profit: 1.1, eps: 3.6 }
		],
		stockInfo: {
			currentPrice: 187.50, // NOK
			dayChange: 2.3, // percentage
			yearHigh: 195.20,
			yearLow: 142.30,
			volume: 245000,
			marketCap: 45.2 // billion NOK
		}
	};

	// Corporate calendar
	const calendar = [
		{
			date: '2024-02-15',
			title: 'Q4 2023 Resultatpresentasjon',
			type: 'results',
			time: '09:00'
		},
		{
			date: '2024-04-25',
			title: 'Ordinær generalforsamling 2024',
			type: 'meeting',
			time: '10:00'
		},
		{
			date: '2024-05-05',
			title: 'Q1 2024 Resultatpresentasjon',
			type: 'results',
			time: '09:00'
		},
		{
			date: '2024-07-15',
			title: 'Q2 2024 Resultatpresentasjon',
			type: 'results',
			time: '09:00'
		}
	];

	// Board members
	const board = [
		{
			name: 'Anna Berg',
			title: 'Styreleder',
			appointed: '2020',
			shares: 45000,
			background: 'Tidligere CEO i StorBank AS, 20 års erfaring fra finanssektoren'
		},
		{
			name: 'Erik Hansen',
			title: 'Nestleder',
			appointed: '2021',
			shares: 25000,
			background: 'Professor i økonomi, tidligere partner i ConsultCo'
		},
		{
			name: 'Maria Olsen',
			title: 'Styremedlem',
			appointed: '2022',
			shares: 15000,
			background: 'CTO i TechFin AS, ekspert på digital transformasjon'
		}
	];

	onMount(async () => {
		const [iconModule, chartModule] = await Promise.all([
			import('@iconify/svelte'),
			import('chart.js/auto')
		]);
		Icon = iconModule.default;
		Chart = chartModule.default;

		// Common chart theme options
		const chartTheme = {
			light: {
				gridColor: 'rgba(0, 0, 0, 0.05)',
				textColor: '#374151',
				tickColor: '#9CA3AF',
				successGradient: {
					start: 'rgba(16, 185, 129, 0.2)',
					mid: 'rgba(16, 185, 129, 0.1)',
					end: 'rgba(16, 185, 129, 0.05)'
				}
			},
			dark: {
				gridColor: 'rgba(255, 255, 255, 0.05)',
				textColor: '#E5E7EB',
				tickColor: '#6B7280',
				successGradient: {
					start: 'rgba(16, 185, 129, 0.3)',
					mid: 'rgba(16, 185, 129, 0.15)',
					end: 'rgba(16, 185, 129, 0.05)'
				}
			}
		};

		const isDark = document.documentElement.classList.contains('dark');
		const theme = isDark ? chartTheme.dark : chartTheme.light;

		// Stock price chart - Enhanced to show growth
		const stockCtx = document.getElementById('stockChart');
		new Chart(stockCtx, {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
				datasets: [{
					label: 'Aksjekurs (NOK)',
					data: [165, 170, 168, 172, 175, 180, 178, 182, 185, 183, 186, 187.5],
					borderColor: '#10B981', // Consistent green for growth
					borderWidth: 3,
					backgroundColor: (context) => {
						const chart = context.chart;
						const { ctx, chartArea } = chart;
						if (!chartArea) return null;
						
						const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
						gradient.addColorStop(0, theme.successGradient.end);
						gradient.addColorStop(0.5, theme.successGradient.mid);
						gradient.addColorStop(1, theme.successGradient.start);
						return gradient;
					},
					tension: 0.4,
					fill: true,
					pointBackgroundColor: '#10B981',
					pointBorderColor: '#fff',
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverRadius: 6
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						backgroundColor: isDark ? '#374151' : '#FFFFFF',
						titleColor: isDark ? '#E5E7EB' : '#111827',
						bodyColor: isDark ? '#E5E7EB' : '#111827',
						borderColor: isDark ? '#4B5563' : '#E5E7EB',
						borderWidth: 1,
						padding: 12,
						displayColors: false,
						callbacks: {
							label: (context) => `NOK ${context.parsed.y.toFixed(2)}`
						}
					}
				},
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							color: theme.textColor,
							font: {
								size: 12
							}
						}
					},
					y: {
						position: 'right',
						beginAtZero: false,
						suggestedMin: Math.min(...[165, 170, 168, 172, 175, 180, 178, 182, 185, 183, 186, 187.5]) * 0.95,
						grid: {
							color: theme.gridColor,
							drawBorder: false
						},
						ticks: {
							color: theme.textColor,
							font: {
								size: 12
							},
							callback: (value) => `${value} NOK`
						}
					}
				},
				interaction: {
					intersect: false,
					mode: 'index'
				}
			}
		});

		// Revenue chart - Enhanced to emphasize growth
		const revenueCtx = document.getElementById('revenueChart');
		new Chart(revenueCtx, {
			type: 'bar',
			data: {
				labels: financials.quarterlyResults.map(q => q.quarter),
				datasets: [{
					label: 'Inntekter (mrd NOK)',
					data: financials.quarterlyResults.map(q => q.revenue),
					backgroundColor: (context) => {
						const chart = context.chart;
						const { ctx, chartArea } = chart;
						if (!chartArea) return null;
						
						const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
						gradient.addColorStop(0, theme.successGradient.end);
						gradient.addColorStop(0.5, theme.successGradient.mid);
						gradient.addColorStop(1, theme.successGradient.start);
						return gradient;
					},
					borderRadius: 6,
					borderSkipped: false
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						backgroundColor: isDark ? '#374151' : '#FFFFFF',
						titleColor: isDark ? '#E5E7EB' : '#111827',
						bodyColor: isDark ? '#E5E7EB' : '#111827',
						borderColor: isDark ? '#4B5563' : '#E5E7EB',
						borderWidth: 1,
						padding: 12,
						displayColors: false,
						callbacks: {
							label: (context) => `${context.parsed.y.toFixed(1)} mrd NOK`
						}
					}
				},
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							color: theme.textColor,
							font: {
								size: 12
							}
						}
					},
					y: {
						position: 'right',
						beginAtZero: true,
						grid: {
							color: theme.gridColor,
							drawBorder: false
						},
						ticks: {
							color: theme.textColor,
							font: {
								size: 12
							},
							callback: (value) => `${value} mrd`
						}
					}
				}
			}
		});
	});

	// Format numbers with Norwegian locale
	function formatNumber(number, decimals = 2) {
		return number.toLocaleString('nb-NO', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		});
	}

	// Format dates
	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('nb-NO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Investor Relations | HavBank - Informasjon for investorer</title>
	<meta
		name="description"
		content="Finansiell informasjon, aksjekurs, rapporter og selskapsstyring for investorer i HavBank."
	/>
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Investor Relations
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Velkommen til HavBanks investorsider. Her finner du oppdatert finansiell informasjon,
					rapporter og presentasjoner.
				</p>
			</div>
		</div>
	</div>

	<!-- Stock Information -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- Current Stock Info -->
				<div class="space-y-4">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white">HAVB</h2>
					<div class="flex items-baseline gap-2">
						<span class="text-3xl font-bold text-gray-900 dark:text-white">
							NOK {formatNumber(financials.stockInfo.currentPrice)}
						</span>
						<span class="text-sm font-medium text-green-500">
							+{financials.stockInfo.dayChange}%
						</span>
					</div>
					<div class="grid grid-cols-2 gap-4 text-sm">
						<div>
							<span class="text-gray-500 dark:text-gray-400">Høyeste 52u</span>
							<p class="font-medium text-gray-900 dark:text-white">
								NOK {formatNumber(financials.stockInfo.yearHigh)}
							</p>
						</div>
						<div>
							<span class="text-gray-500 dark:text-gray-400">Laveste 52u</span>
							<p class="font-medium text-gray-900 dark:text-white">
								NOK {formatNumber(financials.stockInfo.yearLow)}
							</p>
						</div>
						<div>
							<span class="text-gray-500 dark:text-gray-400">Volum</span>
							<p class="font-medium text-gray-900 dark:text-white">
								{formatNumber(financials.stockInfo.volume, 0)}
							</p>
						</div>
						<div>
							<span class="text-gray-500 dark:text-gray-400">Markedsverdi</span>
							<p class="font-medium text-gray-900 dark:text-white">
								{formatNumber(financials.stockInfo.marketCap)} mrd
							</p>
						</div>
					</div>
				</div>

				<!-- Stock Chart -->
				<div class="lg:col-span-2">
					<div class="chart-container">
						<canvas id="stockChart"></canvas>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Key Financial Metrics -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Nøkkeltall</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<!-- Revenue -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center gap-x-3">
					{#if browser && Icon}
						<Icon icon="heroicons:banknotes" class="h-6 w-6 text-blue-500" />
					{/if}
					<h3 class="text-sm font-medium text-gray-900 dark:text-white">Inntekter</h3>
				</div>
				<p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
					{formatNumber(financials.keyMetrics.revenue)} mrd
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">NOK (2023)</p>
			</div>

			<!-- Operating Profit -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center gap-x-3">
					{#if browser && Icon}
						<Icon icon="heroicons:chart-bar" class="h-6 w-6 text-blue-500" />
					{/if}
					<h3 class="text-sm font-medium text-gray-900 dark:text-white">Driftsresultat</h3>
				</div>
				<p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
					{formatNumber(financials.keyMetrics.operatingProfit)} mrd
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">NOK (2023)</p>
			</div>

			<!-- EPS -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center gap-x-3">
					{#if browser && Icon}
						<Icon icon="heroicons:currency-dollar" class="h-6 w-6 text-blue-500" />
					{/if}
					<h3 class="text-sm font-medium text-gray-900 dark:text-white">Resultat per aksje</h3>
				</div>
				<p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
					{formatNumber(financials.keyMetrics.eps)}
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">NOK (2023)</p>
			</div>

			<!-- ROE -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center gap-x-3">
					{#if browser && Icon}
						<Icon icon="heroicons:arrow-trending-up" class="h-6 w-6 text-blue-500" />
					{/if}
					<h3 class="text-sm font-medium text-gray-900 dark:text-white">Egenkapitalavkastning</h3>
				</div>
				<p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
					{formatNumber(financials.keyMetrics.roe)}%
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">(2023)</p>
			</div>

			<!-- CET1 -->
			<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
				<div class="flex items-center gap-x-3">
					{#if browser && Icon}
						<Icon icon="heroicons:shield-check" class="h-6 w-6 text-blue-500" />
					{/if}
					<h3 class="text-sm font-medium text-gray-900 dark:text-white">Ren kjernekapitaldekning</h3>
				</div>
				<p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
					{formatNumber(financials.keyMetrics.cet1)}%
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">(2023)</p>
			</div>
		</div>
	</div>

	<!-- Quarterly Results -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Kvartalsresultater</h2>
		<div class="rounded-xl bg-white dark:bg-gray-800 overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
			<div class="p-6">
				<div class="chart-container">
					<canvas id="revenueChart"></canvas>
				</div>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead>
						<tr class="bg-gray-50 dark:bg-gray-800">
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Kvartal
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Inntekter (mrd)
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Resultat (mrd)
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								EPS (NOK)
							</th>
						</tr>
					</thead>
					<tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
						{#each financials.quarterlyResults as result}
							<tr>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
									{result.quarter}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{formatNumber(result.revenue)}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{formatNumber(result.profit)}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{formatNumber(result.eps)}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Financial Calendar -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Finanskalender</h2>
		<div class="rounded-xl bg-white dark:bg-gray-800 overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
			<ul class="divide-y divide-gray-200 dark:divide-gray-700">
				{#each calendar as event}
					<li class="p-6">
						<div class="flex items-start lg:items-center flex-col lg:flex-row gap-4">
							<div class="flex-none">
								<div class="rounded-lg bg-blue-50 dark:bg-blue-900 p-3">
									{#if browser && Icon}
										<Icon
											icon={event.type === 'results'
												? 'heroicons:presentation-chart-line'
												: 'heroicons:users'}
											class="h-6 w-6 text-blue-600 dark:text-blue-400"
										/>
									{/if}
								</div>
							</div>
							<div class="flex-1 min-w-0">
								<p class="text-lg font-semibold text-gray-900 dark:text-white">
									{event.title}
								</p>
								<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
									{formatDate(event.date)} kl. {event.time}
								</p>
							</div>
							<div class="flex-none">
								<a
									href="/investor/kalender/{event.date}"
									class="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900 px-3 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800"
								>
									Les mer
									{#if browser && Icon}
										<Icon icon="heroicons:arrow-right" class="ml-2 h-4 w-4" />
									{/if}
								</a>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Board of Directors -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Styret</h2>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each board as member}
				<div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
					<div class="flex items-start gap-x-3">
						<div class="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center">
							{#if browser && Icon}
								<Icon icon="heroicons:user" class="h-6 w-6 text-blue-600 dark:text-blue-400" />
							{/if}
						</div>
						<div>
							<h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
								{member.name}
							</h3>
							<p class="text-sm font-semibold text-blue-600 dark:text-blue-400">
								{member.title}
							</p>
						</div>
					</div>
					<div class="mt-4 space-y-3 text-sm">
						<p class="text-gray-500 dark:text-gray-400">
							<span class="font-medium text-gray-900 dark:text-white">Tiltrådt:</span>
							{member.appointed}
						</p>
						<p class="text-gray-500 dark:text-gray-400">
							<span class="font-medium text-gray-900 dark:text-white">Aksjer:</span>
							{formatNumber(member.shares, 0)}
						</p>
						<p class="text-gray-500 dark:text-gray-400">{member.background}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Reports and Documents -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="rounded-2xl bg-blue-600 px-6 py-16 sm:p-16">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-bold tracking-tight text-white">Rapporter og dokumenter</h2>
				<p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
					Last ned våre siste finansielle rapporter, presentasjoner og andre investordokumenter.
				</p>
				<div class="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/investor/rapporter"
						class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						Se alle rapporter
					</a>
					<a href="/investor/presentasjoner" class="text-sm font-semibold leading-6 text-white">
						Presentasjoner <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Chart container styles */
	:global(.chart-container) {
		position: relative;
		height: 300px;
		width: 100%;
	}

	/* Dark mode adjustments for charts */
	:global(.dark) canvas {
		filter: contrast(1.1);
	}
</style> 