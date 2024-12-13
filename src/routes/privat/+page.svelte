<script>
	import { browser } from '$app/environment';
    import Icon from '@iconify/svelte';
	let IconifyIcon = Icon;



	const products = [
		{
			name: 'Boliglån',
			description: 'Konkurransedyktige boliglån fra 4,15%. Grønt boliglån fra 3,95%.',
			features: ['Opptil 85% finansiering', 'Grønt boliglån', 'Førstehjemslån'],
			icon: 'heroicons:home',
			href: '/privat/boliglan'
		},
		{
			name: 'Sparekonto',
			description: 'BSU med 6,5% rente. Høyrentekonto med opptil 4,50% rente.',
			features: ['BSU-sparing', 'Høyrentekonto', 'Spareavtaler'],
			icon: 'heroicons:banknotes',
			href: '/privat/sparing'
		},
		{
			name: 'Kredittkort',
			description: 'Trygge og fleksible betalingsløsninger med gode fordeler.',
			features: ['Reiseforsikring', '45 dagers betalingsfri', 'Ingen årsavgift første år'],
			icon: 'heroicons:credit-card',
			href: '/privat/kort'
		},
		{
			name: 'Investeringer',
			description: 'Fond fra 0,20% i årlig kostnad. Aksjehandel fra kr 29.',
			features: ['Aksjer', 'Fond', 'Pensjonssparing'],
			icon: 'heroicons:chart-bar',
			href: '/privat/investering'
		},
		{
			name: 'Forsikring',
			description: 'Omfattende forsikringsløsninger for deg og din familie.',
			features: ['Innboforsikring', 'Reiseforsikring', 'Livsforsikring'],
			icon: 'heroicons:shield-check',
			href: '/privat/forsikring'
		},
		{
			name: 'Ungdomsbank',
			description: 'Spesialtilpassede banktjenester for unge under 34 år.',
			features: ['Gratis kort', 'BSU-sparing', 'Førstehjemslån'],
			icon: 'heroicons:user-group',
			href: '/privat/ung'
		}
	];

	const stats = [
		{ name: 'Kundetilfredshet', value: '4.8/5', icon: 'heroicons:star' },
		{ name: 'Boliglånsrente fra', value: '4.15%', icon: 'heroicons:home' },
		{ name: 'BSU-rente', value: '6.50%', icon: 'heroicons:banknotes' },
		{ name: 'Mobilbank rating', value: '4.7/5', icon: 'heroicons:device-phone-mobile' }
	];

	const certifications = [
		{ 
			name: 'Finanstilsynet', 
			icon: 'heroicons:shield-check',
			description: 'Under tilsyn av Finanstilsynet'
		},
		{ 
			name: 'Bankenes sikringsfond', 
			icon: 'heroicons:building-library',
			description: 'Innskudd sikret opptil 2 MNOK'
		},
		{ 
			name: 'ISO 27001', 
			icon: 'heroicons:lock-closed',
			description: 'Sertifisert informasjonssikkerhet'
		}
	];

	const quickLinks = [
		{
			name: 'Bli kunde',
			description: 'Opprett kundeforhold digitalt',
			icon: 'heroicons:user-plus',
			href: '/bli-kunde'
		},
		{
			name: 'Boligkalkulator',
			description: 'Beregn hvor mye du kan låne',
			icon: 'heroicons:calculator',
			href: '/privat/boliglan#kalkulator'
		},
		{
			name: 'Kundeservice',
			description: '24/7 digital kundeservice',
			icon: 'heroicons:chat-bubble-left-right',
			href: '/kontakt'
		},
		{
			name: 'Book rådgiver',
			description: 'Bestill time med rådgiver',
			icon: 'heroicons:calendar',
			href: '/bestill-time'
		}
	];

	const marketRates = {
		title: 'Våre beste renter',
		rates: [
			{
				name: 'Boliglån',
				nominal: '4,15%',
				effective: '4,27%',
				info: 'Inntil 85% av boligverdi'
			},
			{
				name: 'Grønt boliglån',
				nominal: '3,95%',
				effective: '4,07%',
				info: 'For energieffektive boliger'
			},
			{
				name: 'Førstehjemslån',
				nominal: '4,05%',
				effective: '4,17%',
				info: 'Inntil 95% av boligverdi'
			},
			{
				name: 'BSU',
				nominal: '6,50%',
				effective: '6,50%',
				info: 'For deg under 34 år'
			}
		]
	};
</script>

<svelte:head>
	<title>Privat | Personlige banktjenester - HavBank</title>
	<meta
		name="description"
		content="HavBank tilbyr trygge og personlige banktjenester for privatpersoner. Konkurransedyktige betingelser på boliglån, sparing, kort og forsikring. Norsk bank med fokus på personlig service."
	/>
	<meta name="keywords" content="privatbank, boliglån, BSU, sparing, forsikring, bank, norge" />
	<meta property="og:title" content="Privat | HavBank" />
	<meta
		property="og:description"
		content="Personlige banktjenester med konkurransedyktige betingelser. Norsk bank med fokus på trygghet og service."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/privat" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl text-center">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Din personlige bank
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Vi tilbyr skreddersydde løsninger for din personlige økonomi. Våre rådgivere hjelper deg med å
					ta smarte økonomiske valg.
				</p>
				<div class="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/bli-kunde"
						class="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700"
					>
						Bli kunde
					</a>
					<a
						href="/bestill-time"
						class="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
					>
						Snakk med rådgiver <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Quick Links -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each quickLinks as link}
					<a
						href={link.href}
						class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-800"
					>
						<div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700">
							{#if browser && Icon}
								<Icon
									icon={link.icon}
									class="h-6 w-6 text-blue-700 dark:text-blue-400 group-hover:text-blue-600"
								/>
							{/if}
						</div>
						<div class="flex-auto">
							<span class="block font-semibold text-gray-900 dark:text-white">
								{link.name}
								<span class="absolute inset-0"> </span>
							</span>
							<p class="mt-1 text-gray-600 dark:text-gray-400">{link.description}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- Products Grid -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
				{#each products as product}
					<div class="flex flex-col bg-gray-50 dark:bg-gray-800 p-6 rounded-lg transition-transform hover:scale-105">
						<dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
							{#if browser && Icon}
								<Icon
									icon={product.icon}
									width="24"
									height="24"
									class="flex-none text-blue-700 dark:text-blue-400"
								/>
							{:else}
								<span class="w-6 h-6"> </span>
							{/if}
							{product.name}
						</dt>
						<dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
							<p class="flex-auto">{product.description}</p>
							<ul class="mt-4 space-y-2">
								{#each product.features as feature}
									<li class="flex items-center gap-x-2 text-sm">
										{#if browser && Icon}
											<Icon
												icon="heroicons:check"
												class="h-5 w-5 text-blue-700 dark:text-blue-400"
											/>
										{/if}
										{feature}
									</li>
								{/each}
							</ul>
							<p class="mt-6">
								<a
									href={product.href}
									class="inline-flex items-center text-sm font-semibold leading-6 text-blue-700 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
									aria-label="Les mer om {product.name}"
								>
									Les mer
									{#if browser && Icon}
										<Icon icon="heroicons:arrow-right" class="ml-1 w-4 h-4" />
									{:else}
										<span aria-hidden="true">→</span>
									{/if}
								</a>
							</p>
						</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>

	<!-- Market Rates -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="text-center">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					{marketRates.title}
				</h2>
				<p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Våre beste betingelser for nye kunder. Eksisterende kunder kan få enda bedre vilkår.
				</p>
			</div>
			<dl class="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each marketRates.rates as rate}
					<div class="flex flex-col bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
						<dt class="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">
							{rate.name}
						</dt>
						<dd class="mt-2">
							<div class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
								{rate.nominal}
							</div>
							<div class="text-sm text-gray-600 dark:text-gray-400">
								Effektiv rente: {rate.effective}
							</div>
							<div class="mt-2 text-sm text-gray-500 dark:text-gray-400">{rate.info}</div>
						</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>

	<!-- Stats Section -->
	<div class="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32 mt-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:max-w-none">
				<div class="text-center">
					<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						Trygt og enkelt å være kunde
					</h2>
					<p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
						Som kunde i HavBank får du tilgang til moderne banktjenester og personlig rådgivning.
					</p>
				</div>
				<dl class="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{#each stats as stat}
						<div class="flex flex-col bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
							<dt class="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400 flex items-center gap-2">
								{#if browser && Icon}
									<Icon
										icon={stat.icon}
										class="w-5 h-5 text-blue-700 dark:text-blue-400"
									/>
								{/if}
								{stat.name}
							</dt>
							<dd class="order-first text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
								{stat.value}
							</dd>
						</div>
					{/each}
				</dl>

				<!-- Trust Indicators -->
				<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
					{#each certifications as cert}
						<div class="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
							{#if browser && Icon}
								<Icon
									icon={cert.icon}
									class="w-12 h-12 text-blue-700 dark:text-blue-400 mb-4"
								/>
							{/if}
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{cert.name}</h3>
							<p class="text-sm text-center text-gray-600 dark:text-gray-400">
								{cert.description}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Personal Advisory Section -->
	<div class="relative isolate overflow-hidden bg-white dark:bg-gray-900 py-24 sm:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					Personlig rådgivning
				</h2>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Våre erfarne rådgivere hjelper deg med å ta smarte økonomiske valg. Vi tilbyr både fysiske
					møter og digital rådgivning.
				</p>
			</div>
			<div
				class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12"
			>
				<div class="relative lg:order-last lg:col-span-5">
					<figure
						class="border-l-4 border-blue-700 dark:border-blue-400 pl-8 transition-all hover:border-blue-600"
					>
						<blockquote
							class="text-xl font-semibold leading-8 tracking-tight text-gray-900 dark:text-white"
						>
							<p>
								"HavBank har hjulpet meg med både boliglån og investeringer. Deres rådgivere er
								kunnskapsrike og tar seg god tid til å forstå mine behov."
							</p>
						</blockquote>
						<figcaption class="mt-8 flex gap-x-4">
							<div class="text-sm leading-6">
								<div class="font-semibold text-gray-900 dark:text-white">Marie Hansen</div>
								<div class="text-gray-600 dark:text-gray-400">Kunde siden 2018</div>
							</div>
						</figcaption>
					</figure>
				</div>
				<div
					class="max-w-xl text-base leading-7 text-gray-700 dark:text-gray-300 lg:col-span-7"
				>
					<p>Som kunde i HavBank får du tilgang til personlig rådgivning innen:</p>
					<ul role="list" class="mt-8 max-w-xl space-y-8">
						<li class="flex gap-x-3">
							<span
								class="mt-1 h-5 w-5 flex-none text-blue-700 dark:text-blue-400"
								aria-hidden="true">•</span
							>
							<span>
								<strong class="font-semibold text-gray-900 dark:text-white">Boligfinansiering.</strong>
								Vi hjelper deg med å finne den beste låneløsningen for ditt boligkjøp.
							</span>
						</li>
						<li class="flex gap-x-3">
							<span
								class="mt-1 h-5 w-5 flex-none text-blue-700 dark:text-blue-400"
								aria-hidden="true">•</span
							>
							<span>
								<strong class="font-semibold text-gray-900 dark:text-white"
									>Sparing og investering.</strong
								>
								Få råd om hvordan du kan bygge formue over tid.
							</span>
						</li>
						<li class="flex gap-x-3">
							<span
								class="mt-1 h-5 w-5 flex-none text-blue-700 dark:text-blue-400"
								aria-hidden="true">•</span
							>
							<span>
								<strong class="font-semibold text-gray-900 dark:text-white"
									>Pensjon og forsikring.</strong
								>
								Vi hjelper deg med å planlegge for fremtiden.
							</span>
						</li>
					</ul>
					<p class="mt-8">
						Book en uforpliktende samtale med en av våre rådgivere i dag. Vi tilbyr både fysiske møter
						og digital rådgivning via video.
					</p>
					<h3 class="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Trygghet og sikkerhet
					</h3>
					<p class="mt-6">
						Som kunde i HavBank er du sikret gjennom Bankenes sikringsfond. Vi følger strenge
						sikkerhetskrav og er underlagt tilsyn av Finanstilsynet.
					</p>
					<div class="mt-10">
						<a
							href="/bli-kunde"
							class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-blue-700 dark:bg-blue-600 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
							aria-label="Bli kunde hos oss"
						>
							Bli kunde hos oss
							{#if browser && Icon}
								<Icon icon="heroicons:arrow-right" class="ml-2 w-5 h-5" />
							{:else}
								<span aria-hidden="true">→</span>
							{/if}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Legal Disclaimer -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Alle banktjenester tilbys av HavBank AS (org.nr. +00 000 00 000), under tilsyn av Finanstilsynet.
				Innskudd er sikret gjennom Bankenes Sikringsfond opptil 2 millioner kroner. Nominelle og
				effektive renter er oppgitt per 01.01.2024 og kan endres i henhold til markedsforhold og bankens
				retningslinjer. For fullstendige vilkår, se vår prisliste og produktinformasjon.
			</p>
		</div>
	</div>
</div> 
