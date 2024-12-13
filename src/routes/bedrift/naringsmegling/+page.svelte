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
			name: 'Kjøp og salg',
			description: 'Profesjonell bistand ved kjøp og salg av næringseiendom',
			features: [
				'Markedsanalyse og verdivurdering',
				'Strukturering av transaksjoner',
				'Due diligence-prosesser',
				'Forhandlingsbistand'
			],
			pricing: 'Provisjonsbasert, typisk 1-3% av salgssum',
			icon: 'heroicons:building-office-2'
		},
		{
			name: 'Utleie',
			description: 'Komplett utleietjeneste for næringslokaler',
			features: [
				'Markedsføring av lokaler',
				'Leietakersøk og screening',
				'Kontraktsforhandlinger',
				'Oppfølging av leieforhold'
			],
			pricing: '8-12% av første års leie',
			icon: 'heroicons:key'
		},
		{
			name: 'Verdivurdering',
			description: 'Grundig verdivurdering av næringseiendom',
			features: [
				'Teknisk tilstandsanalyse',
				'Markedsanalyse',
				'Kontantstrømanalyse',
				'Dokumentert verdivurdering'
			],
			pricing: 'Fra 25.000 kr',
			icon: 'heroicons:calculator'
		}
	];

	const marketInfo = {
		title: 'Markedsinformasjon',
		points: [
			'Gjennomsnittlig yield i Oslo: 3,5-4,5%',
			'Leiepris kontor Oslo CBD: 4000-6000 kr/m²',
			'Transaksjonsvolum 2023: ca. 70 mrd NOK',
			'Gjennomsnittlig kvadratmeterpris: 45-75.000 kr/m²'
		]
	};

	const expertise = [
		{
			title: 'Kontor',
			description: 'Kontorbygg og forretningslokaler i alle størrelser',
			icon: 'heroicons:building-office'
		},
		{
			title: 'Handel',
			description: 'Butikklokaler og kjøpesentre',
			icon: 'heroicons:shopping-bag'
		},
		{
			title: 'Logistikk',
			description: 'Lager- og logistikkeiendommer',
			icon: 'heroicons:truck'
		},
		{
			title: 'Industri',
			description: 'Produksjons- og industrianlegg',
			icon: 'heroicons:wrench-screwdriver'
		}
	];

	const processSteps = [
		{
			name: 'Innledende møte',
			description: 'Gjennomgang av behov og muligheter',
			icon: 'heroicons:chat-bubble-left-right'
		},
		{
			name: 'Verdivurdering',
			description: 'Grundig analyse og verdifastsettelse',
			icon: 'heroicons:calculator'
		},
		{
			name: 'Markedsføring',
			description: 'Profesjonell presentasjon i markedet',
			icon: 'heroicons:megaphone'
		},
		{
			name: 'Forhandling',
			description: 'Sikring av beste mulige betingelser',
			icon: 'heroicons:document-check'
		}
	];

	const complianceInfo = [
		{
			title: 'Eiendomsmeglingsloven',
			description: 'Vi følger alle krav i eiendomsmeglingsloven og tilhørende forskrifter',
			icon: 'heroicons:scale'
		},
		{
			title: 'Antihvitvasking',
			description: 'Grundig kundekontroll og transaksjonsovervåking',
			icon: 'heroicons:shield-check'
		},
		{
			title: 'Finanstilsynet',
			description: 'Under tilsyn av Finanstilsynet med konsesjon for næringsmegling',
			icon: 'heroicons:building-library'
		}
	];

	const riskDisclosure = {
		title: 'Risikoinformasjon',
		description: 'Viktig informasjon om næringseiendom:',
		points: [
			'Eiendomsverdier kan svinge betydelig over tid',
			'Leieinntekter kan påvirkes av markedsforhold',
			'Teknisk tilstand kan medføre uforutsette kostnader',
			'Regulatoriske endringer kan påvirke verdi og bruk'
		]
	};
</script>

<svelte:head>
	<title>Næringsmegling | HavBank - Profesjonell eiendomsmegling</title>
	<meta
		name="description"
		content="HavBank tilbyr profesjonell næringsmegling med fokus på verdiskaping. Lisensiert eiendomsmegling under Finanstilsynets tilsyn."
	/>
	<meta name="keywords" content="næringsmegling, næringseiendom, eiendomsmegling, kontorlokaler, norge" />
	<meta property="og:title" content="Næringsmegling | HavBank" />
	<meta
		property="og:description"
		content="Profesjonell næringsmegling for kjøp, salg og utleie av næringseiendom."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/bedrift/naringsmegling" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Næringsmegling
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi tilbyr profesjonell megling av næringseiendom med fokus på verdiskaping og sikre
					transaksjoner. Våre meglere har lang erfaring og solid lokalkunnskap.
				</p>
			</div>
		</div>
	</div>

	<!-- Services -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Våre tjenester</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Komplette meglertjenester for næringseiendom.
			</p>
		</div>

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
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">{service.name}</h3>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>

						<div class="mb-6">
							<h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Tjenester</h4>
							<ul class="space-y-4">
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
						</div>

						<div class="mt-auto">
							<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
								<p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
									<span class="font-medium">Honorar:</span> {service.pricing}
								</p>
								<a
									href="/kontakt"
									class="block w-full text-center rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700"
								>
									Kontakt oss
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Expertise Areas -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Spesialkompetanse
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vi har bred erfaring innen alle typer næringseiendom.
			</p>
		</div>

		<div class="mx-auto mt-16 max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
				{#each expertise as area}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								<svelte:component
									this={Icon}
									icon={area.icon}
									class="h-6 w-6 text-blue-700 dark:text-blue-400"
								/>
							{/if}
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{area.title}</h3>
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400">{area.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Process Steps -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Salgsprosessen</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				En strukturert og effektiv prosess for best mulig resultat.
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
				Vi følger alle lover og forskrifter for eiendomsmegling.
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
				Alle meglertjenester tilbys av HavBank Næringsmegling AS (org.nr. +00 000 00 000), under tilsyn av
				Finanstilsynet. Honorarer og betingelser er veiledende og kan endres i henhold til oppdragets art
				og omfang. For fullstendige vilkår, se vår oppdragsavtale. Alle verdivurderinger er indikative og
				ikke bindende. Historisk avkastning er ingen garanti for fremtidig avkastning.
			</p>
		</div>
	</div>
</div> 