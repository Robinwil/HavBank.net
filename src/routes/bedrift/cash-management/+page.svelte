<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let Icon = null;

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.default;
	});

	const solutions = [
		{
			name: 'Konsernkonto',
			description: 'Effektiv likviditetsstyring for konsern og større bedrifter',
			features: [
				'Automatisk likviditetsutjevning',
				'Flervautafunksjonalitet',
				'Rentekompensasjon mellom kontoer',
				'Sanntids konsolidering'
			],
			pricing: {
				setup: '5000 kr',
				monthly: 'Fra 750 kr/mnd',
				transaction: 'Volumbasert prising'
			},
			icon: 'heroicons:building-library'
		},
		{
			name: 'Betalingsløsninger',
			description: 'Komplette løsninger for inn- og utbetalinger',
			features: [
				'SWIFT/SEPA-overføringer',
				'Realtidsbetalinger',
				'AvtaleGiro og eFaktura',
				'API-integrasjon'
			],
			pricing: {
				setup: '2500 kr',
				monthly: 'Fra 450 kr/mnd',
				transaction: '1-3 kr per transaksjon'
			},
			icon: 'heroicons:credit-card'
		},
		{
			name: 'Likviditetsstyring',
			description: 'Verktøy for optimal kontantstrømstyring',
			features: [
				'Likviditetsprognoser',
				'Automatiske varsler',
				'Investeringsanbefalinger',
				'Rapporteringsverktøy'
			],
			pricing: {
				setup: '3500 kr',
				monthly: 'Fra 550 kr/mnd',
				transaction: 'Inkludert i månedspris'
			},
			icon: 'heroicons:chart-bar'
		}
	];

	const integrations = [
		{
			name: 'ERP-systemer',
			description: 'Direkte integrasjon mot ledende økonomisystemer',
			systems: ['Visma', 'SAP', 'Microsoft Dynamics', 'Unit4'],
			icon: 'heroicons:computer-desktop'
		},
		{
			name: 'API-tilgang',
			description: 'Moderne REST API med sanntidstilgang',
			systems: ['PSD2-kompatibel', 'OAuth 2.0', 'Swagger/OpenAPI', 'Sandbox-miljø'],
			icon: 'heroicons:code-bracket'
		},
		{
			name: 'Filoverføring',
			description: 'Støtte for standard filformater',
			systems: ['ISO20022', 'SWIFT MT', 'Telepay', 'OCR'],
			icon: 'heroicons:document-arrow-up'
		}
	];

	const marketInfo = {
		title: 'Markedsinformasjon',
		points: [
			'Gjennomsnittlig behandlingstid: 0,3 sekunder per transaksjon',
			'99,99% oppetid på våre systemer',
			'Støtte for over 135 valutaer',
			'ISO27001-sertifisert sikkerhet'
		]
	};

	const complianceInfo = [
		{
			title: 'PSD2-etterlevelse',
			description: 'Alle tjenester følger EUs betalingstjenestedirektiv (PSD2)',
			icon: 'heroicons:shield-check'
		},
		{
			title: 'Antihvitvasking',
			description: 'Automatisk transaksjonsovervåking og KYC-prosesser',
			icon: 'heroicons:eye'
		},
		{
			title: 'Personvern',
			description: 'GDPR-kompatibel databehandling og lagring',
			icon: 'heroicons:lock-closed'
		}
	];

	const securityFeatures = [
		{
			name: 'Multifaktor-autentisering',
			description: 'BankID og tofaktor pålogging for alle brukere',
			icon: 'heroicons:finger-print'
		},
		{
			name: 'Tilgangsstyring',
			description: 'Granulær kontroll over brukerrettigheter',
			icon: 'heroicons:key'
		},
		{
			name: 'Transaksjonsovervåking',
			description: 'AI-drevet overvåking av alle transaksjoner',
			icon: 'heroicons:chart-bar'
		},
		{
			name: 'Kryptering',
			description: 'Ende-til-ende kryptering av all kommunikasjon',
			icon: 'heroicons:lock-closed'
		}
	];
</script>

<svelte:head>
	<title>Cash Management | HavBank - Effektiv likviditetsstyring</title>
	<meta
		name="description"
		content="HavBank tilbyr avanserte cash management-løsninger for bedrifter. Effektiv likviditetsstyring, betalingsløsninger og integrasjoner mot økonomisystemer."
	/>
	<meta name="keywords" content="cash management, likviditetsstyring, konsernkonto, betalingsløsninger, norge" />
	<meta property="og:title" content="Cash Management | HavBank" />
	<meta
		property="og:description"
		content="Avanserte cash management-løsninger for effektiv likviditetsstyring og betalingshåndtering."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/bedrift/cash-management" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Cash Management
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Optimalisér din bedrifts likviditetsstyring med våre moderne cash management-løsninger.
					Effektive verktøy for betalinger, likviditetsstyring og økonomisk kontroll.
				</p>
			</div>
		</div>
	</div>

	<!-- Solutions -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Våre løsninger</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Skreddersydde løsninger for effektiv likviditets- og betalingshåndtering.
			</p>
		</div>

		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each solutions as solution}
					<div class="flex flex-col bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
						<div class="flex items-center gap-x-4 mb-6">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
									icon={solution.icon}
									class="h-8 w-8 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">{solution.name}</h3>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-6">{solution.description}</p>

						<div class="mb-6">
							<h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Funksjoner</h4>
							<ul class="space-y-4">
								{#each solution.features as feature}
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
						</div>

						<div class="mt-auto">
							<h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Priser</h4>
							<ul class="space-y-2 mb-8">
								<li class="text-sm text-gray-600 dark:text-gray-300">
									<span class="font-medium">Etablering:</span> {solution.pricing.setup}
								</li>
								<li class="text-sm text-gray-600 dark:text-gray-300">
									<span class="font-medium">Månedlig:</span> {solution.pricing.monthly}
								</li>
								<li class="text-sm text-gray-600 dark:text-gray-300">
									<span class="font-medium">Transaksjoner:</span> {solution.pricing.transaction}
								</li>
							</ul>
							<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
								<a
									href="/kontakt"
									class="block w-full text-center rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700"
								>
									Få tilbud
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Integrations -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Integrasjoner og API
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Sømløs integrasjon med dine eksisterende systemer og arbeidsflyt.
			</p>
		</div>

		<div class="mx-auto mt-16 max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each integrations as integration}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
									icon={integration.icon}
									class="h-6 w-6 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{integration.description}</p>
						<ul class="space-y-2">
							{#each integration.systems as system}
								<li class="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-400">
									{#if browser && Icon}
										<svelte:component
											this={Icon}
											icon="heroicons:check-circle"
											class="h-5 w-5 text-blue-700 dark:text-blue-400"
										/>
									{/if}
									{system}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Security Features -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Sikkerhet i verdensklasse
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vi tar sikkerheten på alvor med markedsledende løsninger og kontinuerlig overvåking.
			</p>
		</div>

		<div class="mx-auto mt-16 max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
				{#each securityFeatures as feature}
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

	<!-- Market Information -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{marketInfo.title}</h2>
			<ul class="mt-8 space-y-4">
				{#each marketInfo.points as point}
					<li class="flex gap-x-3">
						{#if browser && Icon}
							<svelte:component
								this={Icon}
								icon="heroicons:chart-bar"
								class="h-6 w-6 text-blue-700 dark:text-blue-400"
							/>
						{/if}
						<span class="text-gray-600 dark:text-gray-300">{point}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Compliance Information -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Sikkerhet og etterlevelse
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vi følger strenge regulatoriske krav for å sikre trygge og pålitelige tjenester.
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

	<!-- Legal Disclaimer -->
	<div class="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Alle cash management-tjenester tilbys av HavBank AS (org.nr. +00 000 00 000), under tilsyn av
				Finanstilsynet. Priser og betingelser er veiledende og kan endres i henhold til markedsforhold og
				bankens retningslinjer. For fullstendige vilkår, se vår prisliste og tjenesteavtaler.
				Transaksjonstider er veiledende og kan variere basert på type transaksjon og mottakerbank.
			</p>
		</div>
	</div>
</div> 