<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let Icon = null;

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.default;
	});

	const financingProducts = [
		{
			name: 'Driftskreditt',
			description: 'Fleksibel kreditt for løpende driftskostnader og sesongvariasjoner',
			features: [
				'Fleksibel ramme opptil 5 MNOK',
				'Konkurransedyktige rentebetingelser',
				'Ingen etableringsgebyr første år',
				'Månedlig rentebelastning'
			],
			requirements: [
				'Minimum 2 års drift',
				'Positiv egenkapital',
				'Tilfredsstillende betjeningsevne'
			],
			icon: 'heroicons:currency-dollar'
		},
		{
			name: 'Investeringslån',
			description: 'Langsiktig finansiering for større investeringer og ekspansjon',
			features: [
				'Lånebeløp fra 1-50 MNOK',
				'Løpetid opptil 25 år',
				'Fast eller flytende rente',
				'Avdragsfrihet mulig'
			],
			requirements: [
				'Dokumentert lønnsomhet',
				'Minimum 30% egenkapital',
				'Tilfredsstillende sikkerhet'
			],
			icon: 'heroicons:building-office-2'
		},
		{
			name: 'Grønn Finansiering',
			description: 'Spesialtilpassede lån for miljøvennlige investeringer',
			features: [
				'Redusert rente',
				'Tilpasset avdragsprofil',
				'ESG-rådgivning inkludert',
				'EU-taksonomi kompatibel'
			],
			requirements: [
				'Dokumentert miljøeffekt',
				'ESG-rapportering',
				'Bærekraftig forretningsmodell'
			],
			icon: 'heroicons:sparkles'
		}
	];

	const processSteps = [
		{
			name: 'Innledende samtale',
			description: 'Gjennomgang av behov og muligheter med våre rådgivere',
			icon: 'heroicons:chat-bubble-left-right'
		},
		{
			name: 'Dokumentasjon',
			description: 'Innhenting av nødvendig finansiell informasjon og sikkerhetsdokumentasjon',
			icon: 'heroicons:document-duplicate'
		},
		{
			name: 'Kredittvurdering',
			description: 'Grundig analyse av bedriftens økonomi og fremtidsutsikter',
			icon: 'heroicons:calculator'
		},
		{
			name: 'Tilbud',
			description: 'Presentasjon av skreddersydd finansieringsløsning',
			icon: 'heroicons:document-check'
		}
	];

	const legalInfo = {
		title: 'Viktig informasjon',
		points: [
			'Alle lån forutsetter kredittgodkjenning',
			'Renter og vilkår fastsettes individuelt basert på risiko',
			'Sikkerhet kreves i form av pant eller garantier',
			'Etableringsgebyr og termingebyr kommer i tillegg'
		]
	};

	const riskDisclosure = {
		title: 'Risikoinformasjon',
		description: 'Ved opptak av lån eller kreditt er det viktig å være klar over:',
		points: [
			'Manglende betaling kan medføre tvangsinndrivelse',
			'Renterisiko ved flytende rente',
			'Valutarisiko ved lån i utenlandsk valuta',
			'Sikkerhetsstillelse kan medføre tap av eiendeler ved mislighold'
		]
	};
</script>

<svelte:head>
	<title>Bedriftsfinansiering | HavBank - Skreddersydde finansieringsløsninger</title>
	<meta
		name="description"
		content="HavBank tilbyr fleksible finansieringsløsninger for bedrifter. Fra driftskreditt til langsiktige investeringslån, tilpasset din bedrifts behov."
	/>
	<meta name="keywords" content="bedriftslån, finansiering, driftskreditt, investeringslån, norge" />
	<meta property="og:title" content="Bedriftsfinansiering | HavBank" />
	<meta
		property="og:description"
		content="Fleksible finansieringsløsninger for norske bedrifter. Konkurransedyktige betingelser og personlig oppfølging."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/bedrift/finansiering" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Bedriftsfinansiering
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi tilbyr skreddersydde finansieringsløsninger for norske bedrifter. Våre erfarne rådgivere
					hjelper deg å finne den beste løsningen for din bedrift.
				</p>
			</div>
		</div>
	</div>

	<!-- Financing Products -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each financingProducts as product}
					<div class="flex flex-col bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
						<div class="flex items-center gap-x-4 mb-6">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
									icon={product.icon}
									class="h-8 w-8 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h2>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>

						<div class="mb-6">
							<h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Egenskaper</h3>
							<ul class="space-y-4">
								{#each product.features as feature}
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
							<h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Krav</h3>
							<ul class="space-y-4 mb-8">
								{#each product.requirements as requirement}
									<li class="flex items-start gap-x-3">
										{#if browser && Icon}
											<svelte:component
												this={Icon}
												icon="heroicons:shield-check"
												class="h-5 w-5 text-blue-700 dark:text-blue-400 mt-0.5"
											/>
										{/if}
										<span class="text-gray-600 dark:text-gray-300">{requirement}</span>
									</li>
								{/each}
							</ul>
							<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
								<a
									href="/kontakt"
									class="block w-full text-center rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700"
								>
									Søk om finansiering
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Process Steps -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Søknadsprosessen</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vi gjør finansiering enkelt og oversiktlig. Slik foregår prosessen:
			</p>
		</div>

		<div class="mx-auto mt-16 max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
				{#each processSteps as step, index}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
									icon={step.icon}
									class="h-6 w-6 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<div class="flex items-center">
								<span
									class="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-semibold mr-2"
								>
									{index + 1}
								</span>
								<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{step.name}</h3>
							</div>
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
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

	<!-- Legal Information -->
	<div class="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{legalInfo.title}</h2>
			<ul class="mt-8 space-y-4">
				{#each legalInfo.points as point}
					<li class="flex gap-x-3">
						{#if browser && Icon}
							<svelte:component
								this={Icon}
								icon="heroicons:information-circle"
								class="h-6 w-6 text-blue-700 dark:text-blue-400"
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
				Alle finansieringsløsninger tilbys av HavBank AS (org.nr. +00 000 00 000), under tilsyn av
				Finanstilsynet. Lån og kreditter forutsetter kredittgodkjenning og tilfredsstillende sikkerhet.
				Priser og betingelser er veiledende og kan endres i henhold til markedsforhold og bankens
				retningslinjer. For fullstendige vilkår, se vår prisliste og låneavtale.
			</p>
		</div>
	</div>
</div> 