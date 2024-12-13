<script>
	import { browser } from '$app/environment';
    import Icon from '@iconify/svelte';
	let IconifyIcon = Icon;


	const creditCards = [
		{
			name: 'HavBank Platinum',
			description: 'Eksklusivt kredittkort med omfattende reiseforsikring og høy kredittgrense',
			annualFee: 0,
			annualFeeAfterFirstYear: 995,
			creditLimit: 'Opptil kr 500 000',
			interestRate: 19.8,
			features: [
				'Reiseforsikring for hele familien',
				'Avbestillingsforsikring inntil kr 50 000',
				'Forsikring ved forsinkelse og bagasje',
				'45 dagers rentefri betalingsutsettelse'
			],
			benefits: [
				'1% cashback på alle kjøp',
				'Gratis inngang i flyplasslounger',
				'Concierge-tjeneste 24/7',
				'Ingen gebyr i utlandet'
			],
			icon: 'heroicons:credit-card'
		},
		{
			name: 'HavBank Gold',
			description: 'Fleksibelt kredittkort med gode reiseforsikringer og fordeler',
			annualFee: 0,
			annualFeeAfterFirstYear: 595,
			creditLimit: 'Opptil kr 250 000',
			interestRate: 20.8,
			features: [
				'Reiseforsikring for deg og familien',
				'Avbestillingsforsikring inntil kr 25 000',
				'Forsikring ved forsinkelse',
				'45 dagers rentefri betalingsutsettelse'
			],
			benefits: [
				'0.5% cashback på alle kjøp',
				'Rabatt på drivstoff',
				'Reisefordeler',
				'Ingen årsavgift første år'
			],
			icon: 'heroicons:credit-card'
		},
		{
			name: 'HavBank Classic',
			description: 'Enkelt og greit kredittkort for hverdagen',
			annualFee: 0,
			annualFeeAfterFirstYear: 295,
			creditLimit: 'Opptil kr 100 000',
			interestRate: 21.8,
			features: [
				'Reiseforsikring for kortinnehaver',
				'Avbestillingsforsikring inntil kr 15 000',
				'ID-tyveriforsikring',
				'45 dagers rentefri betalingsutsettelse'
			],
			benefits: [
				'Ingen årsavgift første år',
				'Rabatt på drivstoff',
				'Netthandelsforsikring',
				'Gebyrfrie uttak i Norge'
			],
			icon: 'heroicons:credit-card'
		}
	];

	const insuranceHighlights = [
		{
			title: 'Reiseforsikring',
			description: 'Omfattende reiseforsikring for deg og familien',
			coverage: 'Opptil kr 50 000 000',
			icon: 'heroicons:globe-europe-africa'
		},
		{
			title: 'Avbestilling',
			description: 'Dekning ved avbestilling av reise',
			coverage: 'Opptil kr 50 000',
			icon: 'heroicons:x-circle'
		},
		{
			title: 'Forsinkelse',
			description: 'Dekning av nødvendige utgifter ved forsinkelse',
			coverage: 'kr 3 000 per person',
			icon: 'heroicons:clock'
		},
		{
			title: 'Bagasje',
			description: 'Forsikring av bagasje på reise',
			coverage: 'Opptil kr 25 000',
			icon: 'heroicons:briefcase'
		}
	];
</script>

<svelte:head>
	<title>Kredittkort | HavBank - Fleksible betalingsløsninger</title>
	<meta
		name="description"
		content="HavBank tilbyr kredittkort med 45 dagers betalingsutsettelse, reiseforsikring og ingen årsavgift første år. Velg mellom våre tre korttyper."
	/>
	<meta name="keywords" content="kredittkort, reiseforsikring, betalingskort, cashback, bank, norge" />
	<meta property="og:title" content="Kredittkort | HavBank" />
	<meta
		property="og:description"
		content="Fleksible kredittkort med reiseforsikring og ingen årsavgift første år."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/privat/kort" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Kredittkort
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Våre kredittkort gir deg fleksibilitet og trygghet på reisen. Velg mellom tre ulike kort med
					omfattende forsikringer og gode fordeler.
				</p>
				<div class="mt-10 flex items-center gap-x-6">
					<a
						href="/bli-kunde"
						class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						Søk om kort
					</a>
					<a href="#forsikring" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
						Se forsikringer <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Credit Cards Grid -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{#each creditCards as card}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								{@const IconComponent = Icon}
								<IconComponent icon={card.icon} class="h-6 w-6 text-blue-600" />
							{/if}
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{card.name}</h2>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-4">{card.description}</p>
						<div class="space-y-4 mb-6">
							<div>
								<dt class="text-sm text-gray-500 dark:text-gray-400">Årsavgift første år</dt>
								<dd class="text-2xl font-semibold text-gray-900 dark:text-white">kr 0</dd>
							</div>
							<div>
								<dt class="text-sm text-gray-500 dark:text-gray-400">Årsavgift deretter</dt>
								<dd class="text-lg font-semibold text-gray-900 dark:text-white">
									kr {card.annualFeeAfterFirstYear}
								</dd>
							</div>
							<div>
								<dt class="text-sm text-gray-500 dark:text-gray-400">Kredittgrense</dt>
								<dd class="text-lg font-semibold text-gray-900 dark:text-white">{card.creditLimit}</dd>
							</div>
							<div>
								<dt class="text-sm text-gray-500 dark:text-gray-400">Nominell rente</dt>
								<dd class="text-lg font-semibold text-gray-900 dark:text-white">{card.interestRate}%</dd>
							</div>
						</div>
						<div class="space-y-6">
							<div>
								<h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Egenskaper</h3>
								<ul class="space-y-2">
									{#each card.features as feature}
										<li class="flex items-start gap-x-2 text-sm text-gray-600 dark:text-gray-300">
											{#if browser && Icon}
												{@const IconComponent = Icon}
												<IconComponent
													icon="heroicons:check"
													class="h-5 w-5 text-blue-600 flex-shrink-0"
												/>
											{/if}
											{feature}
										</li>
									{/each}
								</ul>
							</div>
							<div>
								<h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Fordeler</h3>
								<ul class="space-y-2">
									{#each card.benefits as benefit}
										<li class="flex items-start gap-x-2 text-sm text-gray-600 dark:text-gray-300">
											{#if browser && Icon}
												{@const IconComponent = Icon}
												<IconComponent
													icon="heroicons:star"
													class="h-5 w-5 text-blue-600 flex-shrink-0"
												/>
											{/if}
											{benefit}
										</li>
									{/each}
								</ul>
							</div>
						</div>
						<div class="mt-8">
							<a
								href="/bli-kunde"
								class="block w-full text-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
							>
								Søk nå
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Insurance Section -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32" id="forsikring">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
				Omfattende reiseforsikring
			</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300 mb-12">
				Alle våre kredittkort kommer med reiseforsikring. Platinum og Gold inkluderer også
				familiedekning.
			</p>
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
				{#each insuranceHighlights as insurance}
					<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
						<div class="flex items-center gap-x-3 mb-4">
							{#if browser && Icon}
								{@const IconComponent = Icon}
								<IconComponent icon={insurance.icon} class="h-6 w-6 text-blue-600" />
							{/if}
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{insurance.title}</h3>
						</div>
						<p class="text-gray-600 dark:text-gray-300 mb-4">{insurance.description}</p>
						<p class="text-sm font-medium text-gray-900 dark:text-white">Dekning: {insurance.coverage}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Legal Info -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-32 pb-24">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Effektiv rente 23,9 % (v/15.000,- o/12 mnd. Totalt 16.789,-). Alle priser og betingelser er per
				01.01.2024 og kan endres. Kredittgiver forbeholder seg retten til å avslå søknader.
				Reiseforsikringen gjelder når minimum 50% av reisens kostnader er betalt med kortet.
				Familiedekning gjelder for Platinum og Gold kort. For fullstendige vilkår, se vår prisliste og
				kortavtale.
			</p>
		</div>
	</div>
</div> 