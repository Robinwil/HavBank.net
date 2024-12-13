<script>
	import { browser } from '$app/environment';
    import Icon from '@iconify/svelte';
	let IconifyIcon = Icon;

	const sections = [
		{
			id: 'digital',
			title: 'Digital sikkerhet',
			icon: 'heroicons:shield-check',
			content: `HavBank benytter markedsledende sikkerhetsteknologi for å beskytte dine data og transaksjoner:

• Kryptering på banknivå (minimum 256-bit SSL/TLS)
• Flerfaktorautentisering med BankID
• Kontinuerlig overvåking av transaksjoner
• Automatisk utlogging ved inaktivitet
• Regelmessige sikkerhetskopier
• Avanserte brannmurer og inntrengningsdeteksjon
• Sanntids svindelovervåking`
		},
		{
			id: 'nettbank',
			title: 'Sikker nettbank',
			icon: 'heroicons:computer-desktop',
			content: `Vår nettbank er utviklet med fokus på sikkerhet:

• Sikker innlogging med BankID
• Personlig sikkerhetsbilde ved innlogging
• Transaksjonslimiter og varsling
• Kryptert kommunikasjon
• Automatisk timeout ved inaktivitet
• To-trinns verifisering for sensitive operasjoner
• Regelmessige sikkerhetsoppdateringer`
		},
		{
			id: 'mobilbank',
			title: 'Sikker mobilbank',
			icon: 'heroicons:device-phone-mobile',
			content: `Vår mobilbank har ekstra sikkerhetstiltak:

• Biometrisk autentisering (fingeravtrykk/ansiktsgjenkjenning)
• Kryptert lokal datalagring
• Sikker kommunikasjon med bankens servere
• Automatisk låsing ved inaktivitet
• Fjernsletting ved tap av enhet
• Personlige sikkerhetspreferanser
• Sanntids varsling av transaksjoner`
		},
		{
			id: 'kort',
			title: 'Kortsikkerhet',
			icon: 'heroicons:credit-card',
			content: `Alle våre kort er utstyrt med moderne sikkerhetsfunksjoner:

• EMV-chip teknologi
• Kontaktløs betaling med sikkerhetslimit
• 3D Secure for netthandel
• Geografisk sperring
• Sanntids svindelovervåking
• Øyeblikkelig sperring ved tap
• PIN-kode beskyttelse
• Automatisk varsling ved mistenkelige transaksjoner`
		},
		{
			id: 'fysisk',
			title: 'Fysisk sikkerhet',
			icon: 'heroicons:building-office',
			content: `Våre lokaler og systemer er beskyttet med omfattende sikkerhetstiltak:

• Døgnkontinuerlig vakthold
• Adgangskontroll med biometri
• Overvåkningssystemer
• Brannsikring
• Redundante strømforsyninger
• Sikre datasentre
• Katastrofeberedskap`
		},
		{
			id: 'ansatte',
			title: 'Ansattes sikkerhet',
			icon: 'heroicons:users',
			content: `Våre ansatte gjennomgår strenge sikkerhetsrutiner:

• Grundig bakgrunnssjekk
• Regelmessig sikkerhetsopplæring
• Taushetsplikt
• Tilgangskontroll basert på rolle
• Kontinuerlig oppfølging
• Etiske retningslinjer
• Varslingssystemer`
		},
		{
			id: 'svindel',
			title: 'Svindelbeskyttelse',
			icon: 'heroicons:exclamation-triangle',
			content: `Vi arbeider aktivt med å forebygge svindel:

• Automatisk svindeldeteksjon
• Sanntids transaksjonsovervåking
• Maskinlæring for å oppdage mønstre
• Kundevarsling ved mistenkelig aktivitet
• Dedikert svindelteam
• Samarbeid med politiet
• Informasjonskampanjer mot svindel`
		},
		{
			id: 'beredskap',
			title: 'Beredskapstiltak',
			icon: 'heroicons:arrow-path',
			content: `Vi har omfattende beredskapsplaner for ulike scenarioer:

• Redundante systemer og datasentre
• Regelmessige beredskapsøvelser
• Krisehåndteringsteam
• Backup-løsninger for kritiske systemer
• Kommunikasjonsplaner
• Samarbeid med myndigheter
• Kontinuitetsplaner for alle kritiske tjenester`
		},
		{
			id: 'standarder',
			title: 'Sikkerhetsstandarder',
			icon: 'heroicons:document-check',
			content: `Vi følger strenge sikkerhetsstandarder:

• ISO 27001 for informasjonssikkerhet
• PCI DSS for kortbehandling
• NIST Cybersecurity Framework
• Finanstilsynets IKT-forskrift
• GDPR/Personvernforordningen
• Norsk Standard for IT-sikkerhet
• Internasjonale banksikkerhetsstandarder`
		},
		{
			id: 'rad',
			title: 'Sikkerhetsråd',
			icon: 'heroicons:light-bulb',
			content: `Vi anbefaler følgende sikkerhetstiltak for våre kunder:

• Bruk sterke, unike passord
• Aktiver to-faktor autentisering
• Hold programvare oppdatert
• Vær varsom med lenker i e-post
• Del aldri BankID eller koder
• Sjekk kontoaktivitet regelmessig
• Rapporter mistenkelig aktivitet umiddelbart

Kontakt oss umiddelbart ved mistanke om svindel eller uautorisert tilgang.`
		}
	];
</script>

<svelte:head>
	<title>Sikkerhet | HavBank - Din trygghet er vår prioritet</title>
	<meta
		name="description"
		content="Les om HavBanks omfattende sikkerhetstiltak. Vi beskytter dine verdier med markedsledende sikkerhetsteknologi og strenge rutiner."
	/>
	<meta
		name="keywords"
		content="banksikkerhet, digital sikkerhet, nettbank, svindelbeskyttelse, BankID, finansiell sikkerhet, Norge"
	/>
	<meta property="og:title" content="Sikkerhet | HavBank" />
	<meta
		property="og:description"
		content="HavBank beskytter dine verdier med markedsledende sikkerhetsteknologi og strenge rutiner."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/sikkerhet" />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<header class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-16 sm:py-16 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Din sikkerhet er vår høyeste prioritet
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					HavBank investerer kontinuerlig i markedsledende sikkerhetsteknologi og rutiner for å
					beskytte våre kunders verdier og data. Vi følger de strengeste sikkerhetsstandardene i
					bransjen og samarbeider tett med myndighetene for å bekjempe økonomisk kriminalitet.
				</p>
			</div>
		</div>
	</header>

	<!-- Quick Navigation -->
	<div class="mx-auto max-w-7xl py-16 px-6 lg:px-8 mb-16">
		<nav class="flex flex-wrap gap-4" aria-label="Sikkerhetsemner">
			{#each sections as section}
				<a
					href="#{section.id}"
					class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
					aria-label="Gå til {section.title}"
				>
					{#if browser && Icon}
						<Icon icon={section.icon} class="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
					{/if}
					{section.title}
				</a>
			{/each}
		</nav>
	</div>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="space-y-16">
			{#each sections as section}
				<section 
					id={section.id} 
					class="scroll-mt-16"
					aria-labelledby={`heading-${section.id}`}
				>
					<div class="flex items-center gap-x-3 mb-6">
						{#if browser && Icon}
							<Icon 
								icon={section.icon} 
								class="h-8 w-8 text-blue-600 dark:text-blue-400" 
								aria-hidden="true"
							/>
						{/if}
						<h2 
							id={`heading-${section.id}`}
							class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
						>
							{section.title}
						</h2>
					</div>
					<div class="prose prose-lg dark:prose-invert max-w-none">
						{@html section.content.replace(/\n/g, '<br>')}
					</div>
				</section>
			{/each}
		</div>
	</main>

	<!-- Emergency Contact -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="relative overflow-hidden rounded-3xl shadow-2xl">
			<!-- Background Pattern -->
			<div class="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-blue-700 dark:from-red-800 dark:via-red-900 dark:to-blue-900"></div>
			<div class="absolute inset-0 opacity-10"></div>
			<div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
			
			<!-- Content -->
			<div class="relative px-6 py-20 sm:p-20">
				<div class="mx-auto max-w-xl lg:max-w-none">
					<div class="flex items-center justify-center mb-8">
						{#if browser && Icon}
							<div class="p-4 rounded-full bg-red-500/20 backdrop-blur-sm ring-2 ring-red-400/30">
								<Icon icon="heroicons:exclamation-triangle" class="h-14 w-14 text-white animate-pulse" />
							</div>
						{/if}
					</div>
					
					<div class="text-center mb-16">
						<h2 class="text-4xl font-bold tracking-tight text-white mb-4">Mistenker du svindel?</h2>
						<p class="mt-4 text-xl leading-8 text-gray-100 max-w-2xl mx-auto">
							Kontakt oss umiddelbart hvis du oppdager uautoriserte transaksjoner eller mistenkelig
							aktivitet på din konto.
						</p>
					</div>

					<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<!-- Phone -->
						<div class="relative group">
							<div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/30 to-white/10 dark:from-white/20 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
							<div class="relative p-8 rounded-xl bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
								<div class="flex items-center gap-4 mb-4">
									{#if browser && Icon}
										<div class="p-3 rounded-full bg-red-500/20 ring-2 ring-red-400/30">
											<Icon icon="heroicons:phone" class="h-6 w-6 text-white" />
										</div>
									{/if}
									<h3 class="text-xl font-semibold text-white">Ring oss</h3>
								</div>
								<p class="text-lg text-gray-100 font-medium">
									+00 000 00 000
									<br />
									<span class="text-sm text-gray-300/80 font-normal">24/7 for sperring av kort</span>
								</p>
							</div>
						</div>

						<!-- Email -->
						<div class="relative group">
							<div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/30 to-white/10 dark:from-white/20 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
							<div class="relative p-8 rounded-xl bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
								<div class="flex items-center gap-4 mb-4">
									{#if browser && Icon}
										<div class="p-3 rounded-full bg-red-500/20 ring-2 ring-red-400/30">
											<Icon icon="heroicons:envelope" class="h-6 w-6 text-white" />
										</div>
									{/if}
									<h3 class="text-xl font-semibold text-white">Send e-post</h3>
								</div>
								<p class="text-lg text-gray-100 font-medium">
									sikkerhet@havbank.no
									<br />
									<span class="text-sm text-gray-300/80 font-normal">Svartid innen 1 time</span>
								</p>
							</div>
						</div>

						<!-- Chat -->
						<div class="relative group sm:col-span-2 lg:col-span-1">
							<div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/30 to-white/10 dark:from-white/20 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
							<div class="relative p-8 rounded-xl bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
								<div class="flex items-center gap-4 mb-4">
									{#if browser && Icon}
										<div class="p-3 rounded-full bg-red-500/20 ring-2 ring-red-400/30">
											<Icon icon="heroicons:chat-bubble-left-right" class="h-6 w-6 text-white" />
										</div>
									{/if}
									<h3 class="text-xl font-semibold text-white">Chat med oss</h3>
								</div>
								<p class="text-lg text-gray-100 font-medium">
									I nettbanken
									<br />
									<span class="text-sm text-gray-300/80 font-normal">Tilgjengelig 24/7</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Legal Info -->
	<footer class="mx-auto max-w-7xl px-6 lg:px-8 pb-8">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				HavBank følger Finanstilsynets IKT-forskrift og er underlagt strenge sikkerhetskrav. Vi er
				sertifisert etter ISO 27001 og følger PCI DSS for kortbehandling. Våre sikkerhetstiltak
				oppdateres kontinuerlig i tråd med nye trusler og teknologisk utvikling.
			</p>
		</div>
	</footer>
</div>

<style lang="postcss">
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Custom list styles in content */
	:global(.prose ul) {
		list-style-type: none;
		padding-left: 0;
	}

	:global(.prose ul li) {
		position: relative;
		padding-left: 1.5em;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
	}

	:global(.prose ul li::before) {
		content: '•';
		position: absolute;
		left: 0;
		color: theme(colors.blue.600);
	}

	/* Dark mode adjustments */
	:global(.dark .prose) {
		color: theme(colors.gray.300);
	}

	:global(.dark .prose strong) {
		color: theme(colors.white);
	}

	:global(.dark .prose a) {
		color: theme(colors.blue.400);
	}

	:global(.dark .prose h1, .dark .prose h2, .dark .prose h3, .dark .prose h4) {
		color: theme(colors.white);
	}

	:global(.dark .prose ul li::before) {
		color: theme(colors.blue.400);
	}

	/* Focus styles */
	:global(.focus-visible) {
		outline: 2px solid theme(colors.blue.500);
		outline-offset: 2px;
	}

	/* Improved contrast for dark mode links */
	:global(.dark a:hover) {
		color: theme(colors.blue.300);
	}
</style> 