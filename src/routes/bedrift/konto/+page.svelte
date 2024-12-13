<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let Icon = null;

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.default;
	});

	const accountTypes = [
		{
			name: 'Bedriftskonto Basis',
			description: 'Grunnleggende bedriftskonto for små og mellomstore bedrifter',
			features: [
				'Ingen månedlig avgift første året',
				'Ubegrenset antall transaksjoner',
				'Nettbank og mobilbank inkludert',
				'API-tilgang for regnskapssystemer'
			],
			price: '95 kr/mnd',
			icon: 'heroicons:building-storefront'
		},
		{
			name: 'Bedriftskonto Pluss',
			description: 'Utvidet løsning for bedrifter med høyere transaksjonsvolum',
			features: [
				'Prioritert kundeservice',
				'Reduserte gebyrer på utenlandstransaksjoner',
				'Tilgang til valutakonto',
				'Utvidet API-funksjonalitet'
			],
			price: '195 kr/mnd',
			icon: 'heroicons:building-office'
		},
		{
			name: 'Bedriftskonto Premium',
			description: 'Komplett løsning for større bedrifter og konsern',
			features: [
				'Dedikert kundeansvarlig',
				'Gratis utenlandstransaksjoner',
				'Fleksibel tilgangsstyring',
				'Konsernkontostruktur'
			],
			price: 'Etter avtale',
			icon: 'heroicons:building-library'
		}
	];

	const securityFeatures = [
		{
			name: 'BankID-pålogging',
			description: 'Sikker innlogging med BankID, godkjent av Finanstilsynet',
			icon: 'heroicons:finger-print'
		},
		{
			name: 'Transaksjonskontroll',
			description: 'Avansert overvåking av transaksjoner i sanntid',
			icon: 'heroicons:shield-check'
		},
		{
			name: 'Tilgangsstyring',
			description: 'Detaljert kontroll over brukerrettigheter og fullmakter',
			icon: 'heroicons:key'
		},
		{
			name: 'Varsling',
			description: 'Øyeblikkelig varsling ved mistenkelige transaksjoner',
			icon: 'heroicons:bell-alert'
		}
	];

	const legalInfo = {
		title: 'Juridisk informasjon',
		points: [
			'Kontoavtalen reguleres av Finansavtaleloven og Finansforetaksloven',
			'Innskudd er sikret gjennom Bankenes Sikringsfond opptil 2 millioner kroner',
			'Renter og priser kan endres med 2 måneders varsel',
			'Kontoen kan sies opp med 14 dagers varsel'
		]
	};
</script>

<svelte:head>
	<title>Bedriftskonto | HavBank - Sikker og effektiv bedriftsbank</title>
	<meta
		name="description"
		content="HavBank tilbyr trygge og effektive bedriftskontoer med moderne betalingsløsninger. Velg mellom ulike kontotyper tilpasset din bedrifts behov."
	/>
	<meta name="keywords" content="bedriftskonto, næringslivskonto, bankkonto bedrift, nettbank, norge" />
	<meta property="og:title" content="Bedriftskonto | HavBank" />
	<meta property="og:description" content="Trygge og effektive bedriftskontoer med moderne betalingsløsninger." />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/bedrift/konto" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Bedriftskonto
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Velg en bedriftskonto som passer din virksomhet. Alle våre kontoer kommer med moderne
					nettbank, mobilbank og integrasjonsmuligheter mot regnskapssystemer.
				</p>
			</div>
		</div>
	</div>

	<!-- Account Types -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each accountTypes as account}
					<div class="flex flex-col bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
						<div class="flex items-center gap-x-4 mb-6">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
									icon={account.icon}
									class="h-8 w-8 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{account.name}</h2>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-6">{account.description}</p>
						<ul class="space-y-4 mb-8 flex-grow">
							{#each account.features as feature}
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
							<p class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{account.price}</p>
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

	<!-- Security Features -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Sikkerhet i verdensklasse
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vi tar sikkerheten på alvor og følger de strengeste standardene for bankvirksomhet i Norge.
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

	<!-- Legal Information -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{legalInfo.title}</h2>
			<ul class="mt-8 space-y-4">
				{#each legalInfo.points as point}
					<li class="flex gap-x-3">
						{#if browser && Icon}
							<svelte:component
								this={Icon}
								icon="heroicons:document-text"
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
				Alle kontoer og tjenester tilbys av HavBank AS (org.nr. +00 000 00 000), under tilsyn av
				Finanstilsynet. Priser og betingelser er veiledende og kan endres i henhold til markedsforhold og
				bankens retningslinjer. For fullstendige vilkår, se vår prisliste og kontoavtale.
			</p>
		</div>
	</div>
</div> 