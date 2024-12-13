<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let Icon = $state(null);

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.default;
	});

	const sections = [
		{
			id: 'innsamling',
			title: 'Innsamling av personopplysninger',
			icon: 'heroicons:document-text',
			content: `HavBank samler inn og behandler personopplysninger som er nødvendige for å kunne tilby våre banktjenester, oppfylle lovpålagte krav og ivareta våre kunders interesser. Dette inkluderer:

• Grunnleggende personalia (navn, fødselsnummer, adresse)
• Kontaktinformasjon (telefon, e-post)
• Legitimasjonsdokumenter
• Finansiell informasjon (inntekt, formue, gjeld)
• Transaksjonshistorikk
• Kreditthistorikk
• Informasjon om produkter og tjenester du bruker
• Kommunikasjon med oss`
		},
		{
			id: 'formal',
			title: 'Formål med behandlingen',
			icon: 'heroicons:light-bulb',
			content: `Vi behandler personopplysninger for følgende formål:

• Kundeadministrasjon og tjenesteyting
• Kreditt- og risikohåndtering
• Forebygging og avdekking av svindel og kriminalitet
• Etterlevelse av lovkrav (hvitvaskingsloven, finansforetaksloven, mv.)
• Produktutvikling og forbedring av tjenester
• Markedsføring (med samtykke)
• Statistikk og analyse`
		},
		{
			id: 'rettslig',
			title: 'Rettslig grunnlag',
			icon: 'heroicons:scale',
			content: `Vår behandling av personopplysninger er basert på følgende rettslige grunnlag:

• Oppfyllelse av avtale med deg som kunde
• Rettslige forpliktelser (lovkrav)
• Berettiget interesse
• Samtykke (der dette er påkrevd)

Vi behandler sensitive personopplysninger kun når dette er nødvendig og har særskilt rettslig grunnlag.`
		},
		{
			id: 'deling',
			title: 'Deling av opplysninger',
			icon: 'heroicons:share',
			content: `Vi deler personopplysninger med:

• Offentlige myndigheter (når pålagt ved lov)
• Finanstilsynet og andre tilsynsmyndigheter
• Samarbeidspartnere (forsikringsselskaper, verdipapirforetak)
• Databehandlere (IT-leverandører, analyseverktøy)

All deling skjer i henhold til databehandleravtaler og gjeldende personvernlovgivning.`
		},
		{
			id: 'sikkerhet',
			title: 'Informasjonssikkerhet',
			icon: 'heroicons:shield-check',
			content: `Vi har implementert omfattende sikkerhetstiltak for å beskytte dine personopplysninger:

• Kryptering av sensitive data
• Tilgangskontroll og autorisasjonssystemer
• Regelmessig sikkerhetsoppdateringer
• Kontinuerlig overvåking av systemer
• Opplæring av ansatte i informasjonssikkerhet
• Fysisk sikring av lokaler og servere`
		},
		{
			id: 'rettigheter',
			title: 'Dine rettigheter',
			icon: 'heroicons:user-circle',
			content: `Som kunde har du følgende rettigheter:

• Innsyn i egne personopplysninger
• Retting av feilaktige opplysninger
• Sletting (med visse begrensninger)
• Dataportabilitet
• Begrensning av behandling
• Innsigelse mot behandling
• Trekke tilbake samtykke

Kontakt vårt personvernombud for å utøve dine rettigheter.`
		},
		{
			id: 'oppbevaring',
			title: 'Oppbevaring og sletting',
			icon: 'heroicons:clock',
			content: `Vi oppbevarer personopplysninger så lenge det er nødvendig for formålet og i henhold til lovkrav:

• Kundeopplysninger: Så lenge kundeforholdet består og deretter i henhold til bokføringsloven
• Transaksjonsdata: Minimum 5 år (hvitvaskingsloven)
• Kredittvurderinger: I henhold til finansavtaleloven
• Markedsføringssamtykker: Til samtykket trekkes tilbake

Når oppbevaringsperioden utløper, slettes eller anonymiseres opplysningene.`
		},
		{
			id: 'cookies',
			title: 'Informasjonskapsler (cookies)',
			icon: 'heroicons:computer-desktop',
			content: `Vi bruker informasjonskapsler for å:

• Sikre funksjonalitet i nettbanken
• Analysere bruksmønstre
• Forbedre brukeropplevelsen
• Tilpasse innhold

Du kan administrere informasjonskapsler i nettleserinnstillingene. Noen er nødvendige for bankens tjenester.`
		},
		{
			id: 'endringer',
			title: 'Endringer i personvernerklæringen',
			icon: 'heroicons:document-duplicate',
			content: `Vi oppdaterer denne personvernerklæringen ved behov for å reflektere:

• Endringer i lovverk
• Nye tjenester og produkter
• Organisatoriske endringer
• Teknologiske oppdateringer

Vesentlige endringer vil bli kommunisert direkte til kundene.`
		},
		{
			id: 'kontakt',
			title: 'Kontaktinformasjon',
			icon: 'heroicons:envelope',
			content: `Personvernombud:
E-post: personvern@havbank.no
Telefon: +00 000 00 000

Datatilsynet:
Hvis du mener vi behandler personopplysninger i strid med personvernlovgivningen, kan du klage til Datatilsynet.`
		}
	];
</script>

<svelte:head>
	<title>Personvernerklæring | HavBank - Din sikkerhet er vår prioritet</title>
	<meta
		name="description"
		content="Les HavBanks personvernerklæring. Vi tar personvern på alvor og beskytter dine personopplysninger i henhold til GDPR og norsk lov."
	/>
	<meta
		name="keywords"
		content="personvern, GDPR, bank, sikkerhet, personopplysninger, rettigheter, Norge"
	/>
	<meta property="og:title" content="Personvernerklæring | HavBank" />
	<meta
		property="og:description"
		content="Les hvordan HavBank beskytter og behandler dine personopplysninger i henhold til GDPR og norsk lov."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/personvern" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-8 sm:py-16 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Personvernerklæring
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					HavBank er forpliktet til å beskytte dine personopplysninger. Denne erklæringen beskriver
					hvordan vi samler inn, bruker og beskytter dine data i samsvar med personvernforordningen
					(GDPR) og norsk lov.
				</p>
			</div>
		</div>
	</div>

	<!-- Quick Navigation -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<nav class="flex flex-wrap gap-4 py-8" aria-label="Hurtignavigasjon">
			{#each sections as section}
				<a
					href="#{section.id}"
					class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
				>
					{#if browser && Icon}
						<Icon icon={section.icon} class="mr-2 h-5 w-5 text-blue-600" />
					{/if}
					{section.title}
				</a>
			{/each}
		</nav>
	</div>

	<!-- Main Content -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="space-y-16">
			{#each sections as section}
				<section id={section.id} class="scroll-mt-16">
					<div class="flex items-center gap-x-3 mb-6">
						{#if browser && Icon}
							<Icon icon={section.icon} class="h-8 w-8 text-blue-600" />
						{/if}
						<h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{section.title}
						</h2>
					</div>
					<div class="prose prose-lg dark:prose-invert max-w-none">
						{@html section.content.replace(/\n/g, '<br>')}
					</div>
				</section>
			{/each}
		</div>
	</div>

	<!-- Last Updated -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Denne personvernerklæringen ble sist oppdatert 15. januar 2024. HavBank AS (org.nr. 476 83
				804) er behandlingsansvarlig for personopplysninger som samles inn og behandles i forbindelse med
				våre tjenester.
			</p>
		</div>
	</div>
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
</style> 