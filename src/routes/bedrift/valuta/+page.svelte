<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let Icon = null;

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.default;
	});

	const services = [
		{
			name: 'Valutakontoer',
			description: 'Kontoer i ulike valutaer for effektiv håndtering av internasjonale betalinger',
			features: [
				'Kontoer i alle større valutaer',
				'Realtidskurser og markedsanalyser',
				'Ingen vekslingsgebyr mellom egne valutakontoer',
				'API-integrasjon mot regnskapssystemer'
			],
			icon: 'heroicons:currency-dollar'
		},
		{
			name: 'Valutasikring',
			description: 'Reduser valutarisiko med terminkontrakter og andre sikringsinstrumenter',
			features: [
				'Terminkontrakter og swaps',
				'Rådgivning om sikringsstrategier',
				'Konkurransedyktige kurser',
				'Fleksible løpetider'
			],
			icon: 'heroicons:shield-check'
		},
		{
			name: 'Internasjonal handel',
			description: 'Komplette løsninger for import- og eksportvirksomhet',
			features: [
				'Remburser og garantier',
				'Dokumentinkasso',
				'Trade finance',
				'Eksportfinansiering'
			],
			icon: 'heroicons:globe-europe'
		}
	];

	const tradingFeatures = [
		{
			name: 'Sanntidskurser',
			description: 'Konkurransedyktige valutakurser og kontinuerlig markedsoppdatering',
			icon: 'heroicons:chart-bar'
		},
		{
			name: 'Automatisk veksling',
			description: 'Sett opp automatiske vekslingsregler basert på kurs eller tidspunkt',
			icon: 'heroicons:arrow-path'
		},
		{
			name: 'Markedsanalyser',
			description: 'Tilgang til profesjonelle analyser og markedsrapporter',
			icon: 'heroicons:document-chart-bar'
		},
		{
			name: 'Sikker handel',
			description: 'Alle transaksjoner er sikret og overvåket i henhold til gjeldende regelverk',
			icon: 'heroicons:lock-closed'
		}
	];

	const complianceInfo = [
		{
			title: 'Regulatorisk rammeverk',
			description: 'Alle valutatjenester følger Finansforetaksloven og Valutaforskriften',
			icon: 'heroicons:document-check'
		},
		{
			title: 'Antihvitvasking',
			description: 'Omfattende kontroller i henhold til hvitvaskingsloven',
			icon: 'heroicons:shield-check'
		},
		{
			title: 'Rapportering',
			description: 'Automatisk rapportering til skattemyndigheter og Norges Bank',
			icon: 'heroicons:document-text'
		}
	];

	const riskDisclosure = {
		title: 'Risikoinformasjon',
		description: 'Ved handel med valuta er det viktig å være klar over:',
		points: [
			'Valutakurser kan svinge betydelig og medføre tap',
			'Terminkontrakter kan gi tap hvis markedet beveger seg mot din posisjon',
			'Politiske og økonomiske hendelser kan påvirke valutakurser',
			'Likviditetsrisiko kan oppstå i enkelte valutapar'
		]
	};
</script>

<svelte:head>
	<title>Valuta og handel | HavBank - Internasjonale betalingsløsninger</title>
	<meta
		name="description"
		content="HavBank tilbyr komplette valuta- og handelsløsninger for bedrifter. Konkurransedyktige kurser, sikring og rådgivning for internasjonal handel."
	/>
	<meta name="keywords" content="valutahandel, valutasikring, internasjonal handel, valutakonto, norge" />
	<meta property="og:title" content="Valuta og handel | HavBank" />
	<meta
		property="og:description"
		content="Komplette valuta- og handelsløsninger for norske bedrifter. Konkurransedyktige kurser og personlig oppfølging."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/bedrift/valuta" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Valuta og internasjonal handel
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi tilbyr komplette løsninger for bedrifter som handler internasjonalt. Fra valutakontoer og
					sikring til handelsfinansiering og rådgivning.
				</p>
			</div>
		</div>
	</div>

	<!-- Services -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each services as service}
					<div class="flex flex-col bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
						<div class="flex items-center gap-x-4 mb-6">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
									icon={service.icon}
									class="h-8 w-8 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{service.name}</h2>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
						<ul class="space-y-4 mb-8 flex-grow">
							{#each service.features as feature}
								<li class="flex items-start gap-x-3">
									{#if browser && Icon}
										<svelte:component
											this={Icon}
											icon="heroicons:check"
											class="h-5 w-5 text-blue-700 dark:text-blue-400 mt-0.5"
										/>
									{/if}
									<span class="text-gray-600 dark:text-gray-300">{feature}</span>
								</li>
							{/each}
						</ul>
						<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
							<a
								href="/kontakt"
								class="block w-full text-center rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700"
							>
								Kom i gang
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Trading Features -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Moderne handelsplattform
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vår digitale plattform gir deg alle verktøy du trenger for effektiv valutahandel.
			</p>
		</div>

		<div class="mx-auto mt-16 max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
				{#each tradingFeatures as feature}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
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

	<!-- Compliance Information -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Sikkerhet og etterlevelse
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vi følger strenge regulatoriske krav for å sikre trygge valutatjenester.
			</p>
		</div>

		<div class="mx-auto mt-16 max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each complianceInfo as info}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
									icon={info.icon}
									class="h-6 w-6 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{info.title}</h3>
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400">{info.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Risk Disclosure -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{riskDisclosure.title}</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{riskDisclosure.description}</p>
			<ul class="mt-8 space-y-4">
				{#each riskDisclosure.points as point}
					<li class="flex gap-x-3">
						{#if browser && Icon}
							<svelte:component
								this={Icon}
								icon="heroicons:exclamation-triangle"
								class="h-6 w-6 text-yellow-500"
							/>
						{/if}
						<span class="text-gray-600 dark:text-gray-300">{point}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Legal Disclaimer -->
	<div class="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Alle valutatjenester tilbys av HavBank AS (org.nr. +00 000 00 000), under tilsyn av Finanstilsynet.
				Valutahandel innebærer risiko for tap. Historisk avkastning er ingen garanti for fremtidig
				avkastning. Priser og betingelser er veiledende og kan endres i henhold til markedsforhold og
				bankens retningslinjer. For fullstendige vilkår, se vår prisliste og avtalevilkår.
			</p>
		</div>
	</div>
</div> 