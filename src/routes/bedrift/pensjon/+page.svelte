<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let Icon = null;

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.default;
	});

	const pensionProducts = [
		{
			name: 'Innskuddspensjon',
			description: 'Lovpålagt tjenestepensjon (OTP) med fleksible sparesatser',
			features: [
				'Minimumssats 2% (lovpålagt)',
				'Valgfri sats opptil 7% opp til 7,1G',
				'Tilleggssparing 18,1% mellom 7,1G og 12G',
				'Ansattportal for pensjonsoversikt'
			],
			requirements: [
				'Minimum én ansatt',
				'Årlig innbetaling',
				'Rapportering til Skatteetaten'
			],
			icon: 'heroicons:banknotes'
		},
		{
			name: 'Hybridpensjon',
			description: 'Garantert pensjon med mulighet for høyere avkastning',
			features: [
				'Garantert årlig regulering',
				'Dødelighetsarv',
				'Livsvarig utbetaling',
				'Fleksibel innbetaling'
			],
			requirements: [
				'Minimum fem ansatte',
				'Langsiktig forpliktelse',
				'Årlig G-regulering'
			],
			icon: 'heroicons:chart-bar'
		},
		{
			name: 'Ytelsespensjon',
			description: 'Tradisjonell pensjonsordning med garantert ytelse',
			features: [
				'Garantert pensjonsnivå',
				'Typisk 66% av sluttlønn',
				'Inkluderer AFP og folketrygd',
				'Livsvarig utbetaling'
			],
			requirements: [
				'Solid økonomi',
				'Langsiktig perspektiv',
				'Minimum ti ansatte'
			],
			icon: 'heroicons:shield-check'
		}
	];

	const insuranceProducts = [
		{
			name: 'Gruppeliv',
			description: 'Grunnleggende livsforsikring for ansatte',
			coverage: 'Typisk 10-30G (ca. 1-3 MNOK)',
			price: 'Fra 1200 kr per ansatt/år',
			icon: 'heroicons:heart'
		},
		{
			name: 'Uførepensjon',
			description: 'Sikring ved langvarig sykdom eller uførhet',
			coverage: '20-70% av lønn',
			price: 'Individuell prising',
			icon: 'heroicons:hand-raised'
		},
		{
			name: 'Helseforsikring',
			description: 'Rask tilgang til spesialisthelsetjenester',
			coverage: 'Ubegrenset dekning innen avtalen',
			price: 'Fra 3600 kr per ansatt/år',
			icon: 'heroicons:building-office-2'
		},
		{
			name: 'Nøkkelpersonforsikring',
			description: 'Økonomisk sikring ved tap av viktige ansatte',
			coverage: 'Tilpasset bedriftens behov',
			price: 'Individuell prising',
			icon: 'heroicons:user-circle'
		}
	];

	const complianceInfo = [
		{
			title: 'Lovpålagt tjenestepensjon (OTP)',
			description: 'Minimum 2% innskuddspensjon for alle ansatte over 20 år med minst 20% stilling.',
			icon: 'heroicons:scale'
		},
		{
			title: 'Yrkesskadeforsikring',
			description: 'Obligatorisk forsikring som dekker skader og sykdom som følge av arbeidet.',
			icon: 'heroicons:briefcase'
		},
		{
			title: 'AFP-ordning',
			description: 'Valgfri tilslutning til avtalefestet pensjon i privat sektor.',
			icon: 'heroicons:document-check'
		}
	];

	const marketInfo = {
		title: 'Markedsinformasjon',
		points: [
			'Gjennomsnittlig sparesats i innskuddspensjon: 4,1%',
			'85% av norske bedrifter velger innskuddspensjon',
			'Årlig forvaltningskostnad: 0,3-0,8%',
			'Typisk avkastning siste 5 år: 6-8% årlig'
		]
	};

	const riskDisclosure = {
		title: 'Risikoinformasjon',
		description: 'Viktig informasjon om pensjons- og forsikringsordninger:',
		points: [
			'Historisk avkastning er ingen garanti for fremtidig avkastning',
			'Forsikringspremier kan endres basert på skadehistorikk',
			'Pensjonsytelser påvirkes av lønnsvekst og G-regulering',
			'Manglende innbetaling kan føre til tap av rettigheter'
		]
	};
</script>

<svelte:head>
	<title>Pensjon og forsikring | HavBank - Trygge løsninger for bedrifter</title>
	<meta
		name="description"
		content="HavBank tilbyr komplette pensjons- og forsikringsløsninger for bedrifter. Godkjent av Finanstilsynet og i samarbeid med ledende forsikringsselskaper."
	/>
	<meta name="keywords" content="pensjon, forsikring, tjenestepensjon, gruppeliv, uførepensjon, norge" />
	<meta property="og:title" content="Pensjon og forsikring | HavBank" />
	<meta
		property="og:description"
		content="Komplette pensjons- og forsikringsløsninger for norske bedrifter. Godkjent av Finanstilsynet."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/bedrift/pensjon" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Pensjon og forsikring
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi tilbyr komplette pensjons- og forsikringsløsninger for din bedrift, i samarbeid med Norges
					ledende forsikringsselskaper. Alle våre løsninger er godkjent av Finanstilsynet.
				</p>
			</div>
		</div>
	</div>

	<!-- Pension Products -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Pensjonsløsninger</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Velg en pensjonsordning som passer din bedrifts behov og økonomi.
			</p>
		</div>

		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each pensionProducts as product}
					<div class="flex flex-col bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
						<div class="flex items-center gap-x-4 mb-6">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
									icon={product.icon}
									class="h-8 w-8 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h3>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>

						<div class="mb-6">
							<h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Egenskaper</h4>
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
							<h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Krav</h4>
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
									Få tilbud
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Insurance Products -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Forsikringsløsninger
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Sikre dine ansatte og bedriften med våre omfattende forsikringsløsninger.
			</p>
		</div>

		<div class="mx-auto mt-16 max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
				{#each insuranceProducts as product}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
									icon={product.icon}
									class="h-6 w-6 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
						<div class="space-y-2">
							<p class="text-sm">
								<span class="font-semibold text-gray-900 dark:text-white">Dekning:</span>
								<span class="text-gray-600 dark:text-gray-400">{product.coverage}</span>
							</p>
							<p class="text-sm">
								<span class="font-semibold text-gray-900 dark:text-white">Pris:</span>
								<span class="text-gray-600 dark:text-gray-400">{product.price}</span>
							</p>
						</div>
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
				Lovkrav og etterlevelse
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vi sikrer at din bedrift oppfyller alle lovpålagte krav til pensjon og forsikring.
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
				Alle pensjons- og forsikringsløsninger tilbys av HavBank AS (org.nr. +00 000 00 000) i samarbeid med
				ledende norske forsikringsselskaper, under tilsyn av Finanstilsynet. Priser og betingelser er
				veiledende og kan endres i henhold til markedsforhold og selskapenes retningslinjer. For
				fullstendige vilkår, se våre forsikringsvilkår og pensjonsavtaler.
			</p>
		</div>
	</div>
</div> 