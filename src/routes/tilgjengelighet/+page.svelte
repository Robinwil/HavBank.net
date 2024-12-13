<script>
	import { browser } from '$app/environment';
    import Icon from '@iconify/svelte';
	let IconifyIcon = Icon;


	function handleNavClick(e) {
		const href = e.currentTarget.getAttribute('href');
		if (href.startsWith('#')) {
			e.preventDefault();
			const element = document.querySelector(href);
			if (element) {
				window.scrollTo({
					top: element.offsetTop - 100, // Offset for header
					behavior: 'smooth'
				});
			}
		}
	}

	const sections = [
		{
			id: 'digital',
			title: 'Digital tilgjengelighet',
			icon: 'heroicons:computer-desktop',
			content: `Vår nettbank og mobilapp følger WCAG 2.1 retningslinjene:

• Støtte for skjermlesere (NVDA, VoiceOver, JAWS)
• Tastaturnavigasjon på alle sider
• God kontrast og lesbar tekst
• Mulighet for tekststørrelse-justering
• Alt-tekst på alle bilder
• Klart og tydelig språk
• Konsekvent navigasjon og struktur`
		},
		{
			id: 'fysisk',
			title: 'Fysisk tilgjengelighet',
			icon: 'heroicons:building-office',
			content: `Våre filialer er tilrettelagt for alle:

• Rullestolramper og automatiske dører
• Handikapparkering nær inngangen
• Tilgjengelige bankautomat-høyder
• Teleslynge i alle filialer
• God belysning og skilting
• Sitteområder med ulike høyder
• Assistansehunder er velkomne`
		},
		{
			id: 'kundeservice',
			title: 'Tilgjengelig kundeservice',
			icon: 'heroicons:chat-bubble-left-right',
			content: `Vi tilbyr flere måter å kontakte oss på:

• Teksttelefon for hørselshemmede
• Videomøter med tegnspråktolk
• Chat med stor tekst og høy kontrast
• Mulighet for personlig assistanse
• Fleksible møtetidspunkter
• Hjemmebesøk ved behov
• Dokumenter i alternative formater`
		},
		{
			id: 'nettbank',
			title: 'Tilpasset nettbank',
			icon: 'heroicons:device-phone-mobile',
			content: `Vår nettbank har flere tilgjengelighetsfunksjoner:

• Støtte for forstørrelse opp til 400%
• Tastatursnarveier for alle funksjoner
• Mulighet for høykontrast-modus
• Kompatibel med ulike hjelpemidler
• Tydelig feilmeldinger og instruksjoner
• Automatisk utfylling av skjemaer
• Lagring av personlige preferanser`
		},
		{
			id: 'opplaering',
			title: 'Opplæring og støtte',
			icon: 'heroicons:academic-cap',
			content: `Vi tilbyr opplæring i bruk av våre tjenester:

• Gratis kurs i nettbank-bruk
• En-til-en opplæring ved behov
• Veiledningsvideoer med undertekster
• Skriftlige guider i stort format
• Støtte for pårørende og hjelpere
• Regelmessige workshops
• Tilpasset opplæringsmateriell`
		},
		{
			id: 'personlig',
			title: 'Personlig tilpasning',
			icon: 'heroicons:user',
			content: `Vi tilbyr personlige løsninger:

• Tilpassede kommunikasjonsmetoder
• Fleksible identifikasjonsløsninger
• Alternative påloggingsmetoder
• Spesialtilpassede bankkort
• Tilrettelagt rådgivning
• Fullmaktsløsninger
• Personlig bankassistent`
		}
	];
</script>

<svelte:head>
	<title>Tilgjengelighet | HavBank - Banktjenester for alle</title>
	<meta
		name="description"
		content="HavBank jobber kontinuerlig for å gjøre våre tjenester tilgjengelige for alle kunder, uavhengig av funksjonsevne."
	/>
	<meta
		name="keywords"
		content="tilgjengelighet, universell utforming, WCAG, bankfilialer, kundeservice, nettbank, mobilbank"
	/>
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-16 sm:py-16 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Banktjenester for alle
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					HavBank jobber kontinuerlig for å gjøre våre tjenester tilgjengelige for alle. Vi følger
					prinsippene for universell utforming og tilbyr løsninger som er tilpasset ulike behov.
				</p>
			</div>
		</div>
	</div>

	<!-- Quick Navigation -->
	<div class="mx-auto max-w-7xl py-8 px-6 lg:px-8">
		<nav class="flex flex-wrap gap-4" aria-label="Tilgjengelighetsemner">
			{#each sections as section}
				<a
					href="#{section.id}"
					onclick={handleNavClick}
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

	<!-- Contact Section -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="rounded-2xl bg-blue-900 dark:bg-blue-800 px-6 py-16 sm:p-16">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-bold tracking-tight text-white">Trenger du hjelp?</h2>
				<p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
					Vi er her for å hjelpe deg med å finne de beste løsningene for dine behov. Kontakt oss for en
					uforpliktende samtale.
				</p>
				<div class="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/kontakt"
						class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						Kontakt oss
					</a>
					<a href="/bestill-time" class="text-sm font-semibold leading-6 text-white">
						Bestill time <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Standards and Compliance -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				HavBank følger WCAG 2.1 retningslinjene og Likestillings- og diskrimineringsloven. Vi jobber
				kontinuerlig med å forbedre tilgjengeligheten av våre tjenester og ønsker tilbakemeldinger
				fra våre kunder om hvordan vi kan bli bedre.
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Custom list styles */
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
</style> 