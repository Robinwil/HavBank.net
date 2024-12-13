<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let Icon = null;

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.default;
	});

	const features = [
		{
			name: 'Dedikert kundeansvarlig',
			description: 'Få tilgang til en fast kundeansvarlig som kjenner din bedrift og bransje.',
			icon: 'heroicons:user-circle'
		},
		{
			name: 'Digital bedriftsbank',
			description: 'Moderne nettbank og mobilbank med avanserte funksjoner for bedrifter.',
			icon: 'heroicons:device-phone-mobile'
		},
		{
			name: 'Internasjonal handel',
			description: 'Støtte for handel i flere valutaer og internasjonale transaksjoner.',
			icon: 'heroicons:globe-europe'
		},
		{
			name: 'Sikkerhet i fokus',
			description: 'Avanserte sikkerhetsløsninger og overvåkning av transaksjoner.',
			icon: 'heroicons:shield-check'
		}
	];

	const products = [
		{
			name: 'Bedriftskonto',
			description: 'Fleksible kontoløsninger med konkurransedyktige vilkår. Innskuddssikring opptil 2 millioner NOK gjennom Bankenes Sikringsfond.',
			icon: 'heroicons:banknotes',
			href: '/bedrift/konto',
			features: ['Realtidsbetalinger', 'API-integrasjon', 'Fleksibel tilgangsstyring']
		},
		{
			name: 'Bedriftsfinansiering',
			description: 'Skreddersydde finansieringsløsninger i henhold til Finansavtaleloven. Transparent prising og fleksible nedbetalingsplaner.',
			icon: 'heroicons:building-office',
			href: '/bedrift/finansiering',
			features: ['Driftskreditt', 'Investeringslån', 'Grønn finansiering']
		},
		{
			name: 'Valuta og handel',
			description: 'Sikre og effektive løsninger for internasjonal handel. Følger EUs betalingstjenestedirektiv (PSD2) og norske valutaforskrifter.',
			icon: 'heroicons:currency-euro',
			href: '/bedrift/valuta',
			features: ['Valutasikring', 'SWIFT-overføringer', 'Trade finance']
		},
		{
			name: 'Pensjon og forsikring',
			description: 'Omfattende pensjons- og forsikringsløsninger i samarbeid med ledende forsikringsselskaper. Godkjent av Finanstilsynet.',
			icon: 'heroicons:shield-check',
			href: '/bedrift/pensjon',
			features: ['Tjenestepensjon', 'Gruppeliv', 'Nøkkelpersonforsikring']
		},
		{
			name: 'Cash Management',
			description: 'Avanserte likviditetsstyringsverktøy som følger norske og internasjonale standarder for betalingsformidling.',
			icon: 'heroicons:chart-bar',
			href: '/bedrift/cash-management',
			features: ['Konsernkonto', 'Likviditetsprognoser', 'Betalingsoptimalisering']
		},
		{
			name: 'Næringsmegling',
			description: 'Profesjonell bistand ved kjøp og salg av næringseiendom. Lisensiert eiendomsmegling under Finanstilsynets tilsyn.',
			icon: 'heroicons:building-library',
			href: '/bedrift/naringsmegling',
			features: ['Verdivurdering', 'Due diligence', 'Transaksjonsrådgivning']
		}
	];

	const certifications = [
		{ 
			name: 'Finanstilsynet',
			icon: 'heroicons:shield-check',
			description: 'Under tilsyn av Finanstilsynet'
		},
		{ 
			name: 'Bankenes Sikringsfond',
			icon: 'heroicons:building-library',
			description: 'Medlem av Bankenes Sikringsfond'
		},
		{ 
			name: 'ISO 27001',
			icon: 'heroicons:lock-closed',
			description: 'Sertifisert informasjonssikkerhet'
		},
		{ 
			name: 'PSD2-kompatibel',
			icon: 'heroicons:currency-euro',
			description: 'Følger EUs betalingstjenestedirektiv'
		}
	];

	const complianceInfo = [
		{
			title: 'Regulatorisk etterlevelse',
			description: 'HavBank opererer under konsesjon fra Finanstilsynet (org.nr. +00 000 00 000) og følger alle gjeldende lover og forskrifter for norske banker.',
			icon: 'heroicons:document-check'
		},
		{
			title: 'Antihvitvasking',
			description: 'Vi følger strenge rutiner for kundekontroll og transaksjonsovervåking i henhold til hvitvaskingsloven.',
			icon: 'heroicons:shield-check'
		},
		{
			title: 'Personvern og GDPR',
			description: 'Behandling av personopplysninger skjer i samsvar med personopplysningsloven og EUs personvernforordning (GDPR).',
			icon: 'heroicons:lock-closed'
		}
	];
</script>

<svelte:head>
	<title>Bedriftstjenester | HavBank - Din partner for vekst</title>
	<meta
		name="description"
		content="HavBank tilbyr komplette banktjenester for bedrifter under tilsyn av Finanstilsynet. Skreddersydde løsninger for norske virksomheter med fokus på sikkerhet og bærekraft."
	/>
	<meta name="keywords" content="bedriftsbank, næringsliv, finansiering, bedriftskonto, norge, bank" />
	<meta property="og:title" content="Bedriftstjenester | HavBank" />
	<meta property="og:description" content="Komplette banktjenester for bedrifter under tilsyn av Finanstilsynet." />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/bedrift" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Banktjenester for bedrifter
				</h1>
				<div class="mt-10 max-w-xl text-base leading-7 text-gray-700 dark:text-gray-300 lg:max-w-none">
					<p>
						HavBank er en solid partner for norske bedrifter. Vi tilbyr skreddersydde løsninger for alt
						fra enkeltpersonforetak til store konsern.
					</p>
					<ul role="list" class="mt-8 max-w-xl space-y-8 text-gray-600 dark:text-gray-400">
						<li class="flex gap-x-3">
							<span class="mt-1 h-5 w-5 flex-none text-blue-700 dark:text-blue-400" aria-hidden="true">•</span>
							<span>
								<strong class="font-semibold text-gray-900 dark:text-white">Lokal tilstedeværelse.</strong> Med kontorer
								over hele Norge er vi alltid nær deg.
							</span>
						</li>
						<li class="flex gap-x-3">
							<span class="mt-1 h-5 w-5 flex-none text-blue-700 dark:text-blue-400" aria-hidden="true">•</span>
							<span>
								<strong class="font-semibold text-gray-900 dark:text-white">Bransjeekspertise.</strong> Våre rådgivere har
								dyp innsikt i ulike bransjer.
							</span>
						</li>
						<li class="flex gap-x-3">
							<span class="mt-1 h-5 w-5 flex-none text-blue-700 dark:text-blue-400" aria-hidden="true">•</span>
							<span>
								<strong class="font-semibold text-gray-900 dark:text-white">Digitale løsninger.</strong> Moderne verktøy
								for effektiv økonomistyring.
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
				{#each products as product}
					<div class="flex flex-col bg-gray-50 dark:bg-gray-800 p-6 rounded-lg transition-transform hover:scale-105">
						<dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
							{#if browser && Icon}
								<svelte:component this={Icon} icon={product.icon} width="24" height="24" class="flex-none text-blue-700 dark:text-blue-400" />
							{:else}
								<span class="w-6 h-6"> </span>
							{/if}
							{product.name}
						</dt>
						<dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
							<p class="flex-auto">{product.description}</p>
							<p class="mt-6">
								<a
									href={product.href}
									class="inline-flex items-center text-sm font-semibold leading-6 text-blue-700 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
									aria-label="Les mer om {product.name}"
								>
									Les mer
									{#if browser && Icon}
										<svelte:component this={Icon} icon="heroicons:arrow-right" class="ml-1 w-4 h-4" />
									{:else}
										<span aria-hidden="true">→</span>
									{/if}
								</a>
							</p>
						</dd>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				Fordeler for bedriftskunder
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Som bedriftskunde i HavBank får du tilgang til en rekke tjenester og fordeler som gjør
				hverdagen enklere.
			</p>
		</div>
		<dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
			{#each features as feature}
				<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
					<dt class="flex items-center gap-x-3 font-semibold text-gray-900 dark:text-white">
						{#if browser && Icon}
							<svelte:component this={Icon} icon={feature.icon} class="h-6 w-6 text-blue-700 dark:text-blue-400" />
						{/if}
						{feature.name}
					</dt>
					<dd class="mt-4 text-gray-600 dark:text-gray-300">{feature.description}</dd>
				</div>
			{/each}
		</dl>

		<!-- Trust Indicators -->
		<div class="mt-16 flex flex-wrap justify-center gap-8">
			{#each certifications as cert}
				<div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
					{#if browser && Icon}
						<svelte:component this={Icon} icon={cert.icon} class="w-6 h-6" />
					{/if}
					<span class="text-sm font-medium">{cert.name}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				Trygg partner for din bedrift
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				HavBank er underlagt tilsyn av Finanstilsynet og følger alle norske og internasjonale
				reguleringer for banktjenester.
			</p>
		</div>
		<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
			<div class="grid max-w-xl grid-cols-1 gap-4 lg:max-w-none lg:grid-cols-2">
				<div class="flex flex-col gap-4">
					<div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
						<h3 class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
							{#if browser && Icon}
								<svelte:component this={Icon} icon="heroicons:shield-check" class="h-6 w-6 text-blue-700 dark:text-blue-400" />
							{/if}
							Compliance og sikkerhet
						</h3>
						<p class="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
							Vi følger strenge sikkerhetsrutiner og har omfattende systemer for å forebygge økonomisk
							kriminalitet og hvitvasking. Alle transaksjoner overvåkes kontinuerlig.
						</p>
					</div>
					<div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
						<h3 class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
							{#if browser && Icon}
								<svelte:component this={Icon} icon="heroicons:sparkles" class="h-6 w-6 text-blue-700 dark:text-blue-400" />
							{/if}
							Bærekraftig finans
						</h3>
						<p class="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
							Vi tilbyr grønne finansieringsløsninger og rådgivning om bærekraftig forretningsdrift i
							tråd med EUs taksonomi og norske retningslinjer.
						</p>
					</div>
				</div>
				<div class="flex flex-col gap-4">
					<div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
						<h3 class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
							{#if browser && Icon}
								<svelte:component this={Icon} icon="heroicons:globe-europe" class="h-6 w-6 text-blue-700 dark:text-blue-400" />
							{/if}
							Internasjonal handel
						</h3>
						<p class="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
							Vi følger alle internasjonale standarder for handel og har omfattende erfaring med
							eksport- og importfinansiering.
						</p>
					</div>
					<div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
						<h3 class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
							{#if browser && Icon}
								<svelte:component this={Icon} icon="heroicons:lock-closed" class="h-6 w-6 text-blue-700 dark:text-blue-400" />
							{/if}
							Digital sikkerhet
						</h3>
						<p class="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
							Våre digitale løsninger er utviklet etter høyeste sikkerhetsstandarder og følger alle
							krav fra Finanstilsynet om IKT-sikkerhet.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8 pb-24 sm:pb-32">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				Kom i gang med HavBank
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Ta kontakt med oss for en uforpliktende samtale om hvordan vi kan hjelpe din bedrift.
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a
					href="/bedrift/bli-kunde"
					class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-blue-700 dark:bg-blue-600 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
					aria-label="Bli bedriftskunde hos oss"
				>
					Bli bedriftskunde
					{#if browser && Icon}
						<svelte:component this={Icon} icon="heroicons:arrow-right" class="ml-2 w-5 h-5" />
					{:else}
						<span aria-hidden="true">→</span>
					{/if}
				</a>
				<a
					href='/kontakt?id="bedrift"'
					class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400"
				>
					Kontakt oss
					{#if browser && Icon}
						<svelte:component this={Icon} icon="heroicons:arrow-right" class="inline-block ml-1 w-4 h-4" />
					{:else}
						<span aria-hidden="true">→</span>
					{/if}
				</a>
			</div>
		</div>
	</div>

	<!-- Trust and Compliance Section -->
	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				Sikkerhet og etterlevelse
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				HavBank er underlagt strenge regulatoriske krav og følger alle relevante lover og forskrifter for norske banker.
			</p>
		</div>

		<!-- Certifications Grid -->
		<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each certifications as cert}
				<div class="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
					{#if browser && Icon}
						<svelte:component this={Icon} icon={cert.icon} class="w-12 h-12 text-blue-700 dark:text-blue-400 mb-4" />
					{/if}
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{cert.name}</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">{cert.description}</p>
				</div>
			{/each}
		</div>

		<!-- Compliance Information -->
		<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
			{#each complianceInfo as info}
				<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
					<div class="flex items-center gap-x-3 mb-4">
						{#if browser && Icon}
							<svelte:component this={Icon} icon={info.icon} class="w-6 h-6 text-blue-700 dark:text-blue-400" />
						{/if}
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{info.title}</h3>
					</div>
					<p class="text-sm text-gray-600 dark:text-gray-400">{info.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Legal Disclaimer -->
	<div class="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Alle banktjenester tilbys av HavBank AS (org.nr. +00 000 00 000), under tilsyn av Finanstilsynet. 
				Innskudd er sikret gjennom Bankenes Sikringsfond opptil 2 millioner kroner. 
				Lån og kreditter forutsetter kredittgodkjenning og tilfredsstillende sikkerhet. 
				Priser og vilkår er veiledende og kan endres i henhold til markedsforhold og bankens retningslinjer.
			</p>
		</div>
	</div>
</div> 