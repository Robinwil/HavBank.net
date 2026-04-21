<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { openSecurityContact } from '$lib/stores/securityContact.svelte.js';

	const SITE_ORIGIN = 'https://havbank.no';
	const CANONICAL_URL = `${SITE_ORIGIN}/om-prosjektet`;
	const LOGO_URL = `${SITE_ORIGIN}/favicon.png`;

	const FINANSTILSYNET_URL =
		'https://www.finanstilsynet.no/nyhetsarkiv/nyheter/2026/finanstilsynet-advarer-mot-havbank/';

	// Finanstilsynet published its warning on Friday 6 March 2026 (referenced by FinansWatch).
	const advarselIso = '2026-03-06';
	const advarselLabel = '6. mars 2026';

	// This article (our response). Bump `modifiedIso` whenever the content changes.
	const publishedIso = '2026-04-21';
	const publishedLabel = '21. april 2026';
	const modifiedIso = '2026-04-21';

	const HEADLINE = 'HavBank er et hobbyprosjekt — ikke en ekte bank';
	const DESCRIPTION =
		'HavBank.net er et fiktivt hobbyprosjekt — ikke en reell bank. Les prosjekteiers respons på Finanstilsynets advarsel fra 6. mars 2026, teknisk bakgrunn, mediedekning og hvordan du selv kan verifisere at HavBank ikke tilbyr reelle banktjenester.';

	const tableOfContents = [
		{ id: 'kort-fortalt', label: 'Kort fortalt' },
		{ id: 'advarselen', label: 'Advarselen fra Finanstilsynet' },
		{ id: 'mediedekning', label: 'Mediedekning' },
		{ id: 'var-respons', label: 'Vår respons' },
		{ id: 'teknisk', label: 'Teknisk bakgrunn' },
		{ id: 'hvordan-verifisere', label: 'Hvordan du kan verifisere dette selv' },
		{ id: 'veien-videre', label: 'Veien videre' }
	];

	const pressCoverage = [
		{
			outlet: 'FinansWatch',
			dateIso: '2026-03-06',
			dateLabel: '6. mars 2026',
			byline: 'Lena Jarstad',
			title: 'Finanstilsynet advarer mot «bank»',
			url: 'https://finanswatch.no/nyheter/bank/article19085327.ece',
			kind: 'Nyhetsartikkel'
		},
		{
			outlet: 'BankID Norge',
			dateIso: '2026-03-12',
			dateLabel: '12. mars 2026',
			byline: null,
			title: 'Har du hørt om HavBank? Det håper vi egentlig ikke…',
			url: 'https://www.facebook.com/BankIDNorge/posts/har-du-h%C3%B8rt-om-havbankdet-h%C3%A5per-vi-egentlig-ikke-finanstilsynet-advarer-n%C3%A5-mot-e/1523339723131958/',
			kind: 'Facebook-innlegg'
		},
		{
			outlet: 'SkimSafe',
			dateIso: '2026-03-20',
			dateLabel: '20. mars 2026',
			byline: 'Marthe Kvernvik',
			title: 'Finanstilsynet advarer om HavBank',
			url: 'https://www.skimsafe.no/nyheter/finanstilsynet-advarer-om-havbank/',
			kind: 'Blogginnlegg'
		}
	];

	const facts = [
		{
			icon: 'heroicons:beaker',
			title: 'Hobbyprosjekt',
			body: 'HavBank er et privat design- og kodeprosjekt — ingen reell bank.'
		},
		{
			icon: 'heroicons:shield-exclamation',
			title: 'Ingen konsesjon',
			body: 'HavBank har ikke, og skal ikke ha, konsesjon fra Finanstilsynet.'
		},
		{
			icon: 'heroicons:circle-stack',
			title: 'Ingen data lagres',
			body: 'Nåværende versjon er statisk — skjema sender ingen informasjon noe sted.'
		}
	];

	// --- Structured data (JSON-LD) ----------------------------------------
	//
	// Two graphs are emitted:
	//   1. NewsArticle — the primary entity of the page, with author, publisher,
	//      datePublished, dateModified, canonical URL, language, and explicit
	//      `about`/`mentions`/`citation` links to Finanstilsynet's warning and
	//      the press coverage. This is what we want search engines to use when
	//      surfacing "HavBank" queries next to Finanstilsynet's own result.
	//   2. BreadcrumbList — trivial trail so Google can render breadcrumbs in
	//      the SERP.
	//
	// Serialised via JSON.stringify + a conservative escape for `<`/`>` to
	// prevent premature closing-script-tag termination if the data ever
	// contains those characters.

	const publisher = {
		'@type': 'Organization',
		name: 'HavBank (hobbyprosjekt)',
		url: SITE_ORIGIN,
		logo: {
			'@type': 'ImageObject',
			url: LOGO_URL
		},
		description:
			'HavBank.net er et åpent, ikke-kommersielt hobbyprosjekt. Det er ikke en bank og tilbyr ingen finansielle tjenester.'
	};

	const author = {
		'@type': 'Person',
		name: 'HavBank-prosjekteier',
		email: 'security@r01.no',
		url: CANONICAL_URL
	};

	const newsArticleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'NewsArticle',
		'@id': `${CANONICAL_URL}#article`,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': CANONICAL_URL
		},
		url: CANONICAL_URL,
		headline: HEADLINE,
		alternativeHeadline: 'Prosjekteiers respons på Finanstilsynets advarsel mot HavBank',
		description: DESCRIPTION,
		inLanguage: 'nb-NO',
		isAccessibleForFree: true,
		datePublished: publishedIso,
		dateModified: modifiedIso,
		articleSection: 'Om prosjektet',
		keywords: [
			'HavBank',
			'Finanstilsynet',
			'advarsel',
			'fiktiv nettside',
			'hobbyprosjekt',
			'ikke en ekte bank',
			'SvelteKit',
			'responsible disclosure'
		].join(', '),
		author,
		publisher,
		about: {
			'@type': 'Thing',
			name: 'Finanstilsynets advarsel mot HavBank',
			url: FINANSTILSYNET_URL,
			sameAs: FINANSTILSYNET_URL
		},
		mentions: [
			{ '@type': 'GovernmentOrganization', name: 'Finanstilsynet', url: 'https://www.finanstilsynet.no/' },
			{ '@type': 'GovernmentOrganization', name: 'Brønnøysundregistrene', url: 'https://www.brreg.no/' },
			{ '@type': 'Organization', name: 'BankID Norge', url: 'https://www.bankid.no/' }
		],
		citation: [
			{
				'@type': 'NewsArticle',
				headline: 'Finanstilsynet advarer mot HavBank',
				url: FINANSTILSYNET_URL,
				datePublished: advarselIso,
				publisher: {
					'@type': 'GovernmentOrganization',
					name: 'Finanstilsynet',
					url: 'https://www.finanstilsynet.no/'
				}
			},
			...pressCoverage.map((item) => ({
				'@type': 'NewsArticle',
				headline: item.title,
				url: item.url,
				datePublished: item.dateIso,
				publisher: { '@type': 'Organization', name: item.outlet },
				...(item.byline ? { author: { '@type': 'Person', name: item.byline } } : {})
			}))
		],
		potentialAction: {
			'@type': 'ReadAction',
			target: [CANONICAL_URL]
		}
	};

	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Hjem', item: `${SITE_ORIGIN}/` },
			{ '@type': 'ListItem', position: 2, name: 'Om prosjektet', item: CANONICAL_URL }
		]
	};

	/** Escape `<`/`>` and `&` so the serialised JSON can't break out of the script tag. */
	function toJsonLd(data) {
		return JSON.stringify(data)
			.replace(/</g, '\\u003c')
			.replace(/>/g, '\\u003e')
			.replace(/&/g, '\\u0026');
	}

	// Full <script type="application/ld+json"> tags, ready to be injected via
	// {@html ...} inside <svelte:head>. We build them here (instead of inline
	// in the template) so the literal "</" never appears next to "script" in
	// the same source expression — that keeps every parser in the toolchain
	// happy.
	const LD_OPEN = '<' + 'script type="application/ld+json">';
	const LD_CLOSE = '<' + '/script>';

	const newsArticleLdTag = LD_OPEN + toJsonLd(newsArticleJsonLd) + LD_CLOSE;
	const breadcrumbLdTag = LD_OPEN + toJsonLd(breadcrumbJsonLd) + LD_CLOSE;
</script>

<svelte:head>
	<title>HavBank er et hobbyprosjekt — ikke en ekte bank | Om prosjektet</title>
	<meta name="description" content={DESCRIPTION} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<meta
		name="keywords"
		content="HavBank, Finanstilsynet, advarsel, fiktiv nettside, hobbyprosjekt, ikke en ekte bank"
	/>
	<meta name="author" content="HavBank-prosjekteier" />
	<link rel="canonical" href={CANONICAL_URL} />

	<!-- Open Graph -->
	<meta property="og:title" content={HEADLINE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={CANONICAL_URL} />
	<meta property="og:site_name" content="HavBank (hobbyprosjekt)" />
	<meta property="og:locale" content="nb_NO" />
	<meta property="og:image" content={LOGO_URL} />
	<meta property="article:published_time" content={publishedIso} />
	<meta property="article:modified_time" content={modifiedIso} />
	<meta property="article:author" content="HavBank-prosjekteier" />
	<meta property="article:section" content="Om prosjektet" />
	<meta property="article:tag" content="Finanstilsynet" />
	<meta property="article:tag" content="HavBank" />
	<meta property="article:tag" content="fiktiv nettside" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={HEADLINE} />
	<meta name="twitter:description" content={DESCRIPTION} />
	<meta name="twitter:image" content={LOGO_URL} />

	<!-- JSON-LD: NewsArticle + BreadcrumbList. Injected as raw HTML so Svelte
	     doesn't treat the inner <script> as a raw-text component block. The
	     payload is built entirely from static data via JSON.stringify with
	     explicit escaping of <, > and & (see toJsonLd above), so there is no
	     untrusted input and the eslint XSS rule is a false positive here. -->
	<!-- eslint-disable svelte/no-at-html-tags -->
	{@html newsArticleLdTag}
	{@html breadcrumbLdTag}
	<!-- eslint-enable svelte/no-at-html-tags -->
</svelte:head>

<article class="page-container py-16 sm:py-20 lg:py-24">
	<!-- Article header -->
	<header class="max-w-3xl">
		<div class="flex items-center gap-3 text-sm">
			<span
				class="inline-flex items-center gap-1.5 rounded-full bg-red-100 dark:bg-red-950/60 px-3 py-1 font-semibold text-red-800 dark:text-red-200 ring-1 ring-red-200 dark:ring-red-900/70"
			>
				{#if browser && Icon}
					<Icon icon="heroicons:exclamation-triangle" class="h-4 w-4" aria-hidden="true" />
				{/if}
				Viktig melding
			</span>
			<time datetime={publishedIso} class="text-gray-500 dark:text-gray-400">
				Publisert {publishedLabel}
			</time>
		</div>

		<h1 class="page-title mt-6">HavBank er et hobbyprosjekt — ikke en ekte bank</h1>
		<p class="page-lead">
			Finanstilsynet publiserte en offentlig advarsel mot HavBank 6. mars 2026. Advarselen er
			berettiget, og saken er senere omtalt av blant andre FinansWatch, BankID Norge og SkimSafe.
			Her forklarer vi hva prosjektet faktisk er, hvorfor nettsiden eksisterer, og hvordan du
			selv kan verifisere at det ikke foregår noen reell bankvirksomhet her.
		</p>

		<div class="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
			<a
				href={FINANSTILSYNET_URL}
				target="_blank"
				rel="noopener noreferrer"
				class="btn-primary"
			>
				{#if browser && Icon}
					<Icon
						icon="heroicons:arrow-top-right-on-square"
						class="h-5 w-5 mr-2"
						aria-hidden="true"
					/>
				{/if}
				Les Finanstilsynets advarsel
			</a>
			<button type="button" onclick={openSecurityContact} class="btn-secondary">
				Kontakt prosjekteier <span aria-hidden="true">→</span>
			</button>
		</div>
	</header>

	<!-- Quick facts row -->
	<section
		class="mt-12 sm:mt-16 grid gap-4 sm:grid-cols-3"
		aria-label="Kjappe fakta om HavBank"
	>
		{#each facts as fact}
			<div class="card-elevated">
				<div class="flex items-start gap-3">
					<span
						class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-white dark:bg-blue-800"
					>
						{#if browser && Icon}
							<Icon icon={fact.icon} class="h-5 w-5" aria-hidden="true" />
						{/if}
					</span>
					<div>
						<h2 class="text-sm font-semibold text-gray-900 dark:text-white">{fact.title}</h2>
						<p class="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
							{fact.body}
						</p>
					</div>
				</div>
			</div>
		{/each}
	</section>

	<div class="mt-12 sm:mt-16 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
		<!-- Table of contents -->
		<aside class="lg:sticky lg:top-24 lg:self-start" aria-label="Innholdsfortegnelse">
			<nav
				class="rounded-lg bg-gray-50 dark:bg-gray-800/60 p-5 ring-1 ring-gray-200 dark:ring-gray-700"
			>
				<p class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
					I denne artikkelen
				</p>
				<ul class="mt-3 space-y-2 text-sm">
					{#each tableOfContents as item}
						<li>
							<a
								href={`#${item.id}`}
								class="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-300 hover:underline underline-offset-4"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>

		<!-- Article body -->
		<div
			class="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-900 dark:prose-a:text-blue-300 prose-a:font-medium prose-strong:text-gray-900 dark:prose-strong:text-white"
		>
			<section id="kort-fortalt">
				<h2>Kort fortalt</h2>
				<p>
					HavBank.net er et <strong>fiktivt hobbyprosjekt</strong>. Nettsiden er laget som en
					design- og frontend-øvelse — et forsøk på å bygge en troverdig norsk bankopplevelse fra
					bunnen av i SvelteKit, med fokus på tilgjengelighet, dark mode, norske tekstkonvensjoner,
					og helhetlig informasjonsarkitektur.
				</p>
				<p>
					Den er ikke, og har aldri vært, en ekte bank. Det foregår ingen finansielle transaksjoner,
					ingen kundeforhold opprettes, og ingen av skjemaene sender data noe sted i nåværende
					versjon.
				</p>
			</section>

			<section id="advarselen">
				<h2>Advarselen fra Finanstilsynet</h2>
				<p>
					<time datetime={advarselIso}>Fredag {advarselLabel}</time> publiserte Finanstilsynet en
					offentlig advarsel mot HavBank. Der peker tilsynet på at nettsiden tilbyr
					<em>«lån, investeringstjenester og eiendomsmeglings­tjenester og formidler
					forsikringstjenester ulovlig»</em>, at foretaket ikke oppgir organisasjons­nummer,
					og at det ikke er registrert i Brønnøysundregisteret.
				</p>
				<blockquote>
					<p>
						«Foretaket er ikke reelt og er med all sannsynlighet kun satt opp for å svindle
						forbrukere. […] HavBank har ikke slik tillatelse og virksomheten drives dermed
						ulovlig. Finanstilsynet advarer derfor mot å benytte seg av tjenester fra, eller
						inngå avtaler med HavBank.»
					</p>
					<footer>
						—
						<a href={FINANSTILSYNET_URL} target="_blank" rel="noopener noreferrer">
							Finanstilsynet, <time datetime={advarselIso}>{advarselLabel}</time>
						</a>
					</footer>
				</blockquote>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					Merk: første del av sitatet («Foretaket er ikke reelt … svindle forbrukere») er faktuelt
					uriktig. HavBank er ikke satt opp for å svindle noen — det er et åpent hobbyprosjekt. At
					det likevel fremstår slik for tilsynet er et tegn på at vi ikke var tydelige nok, ikke
					at vurderingen er urimelig.
				</p>
			</section>

			<section id="mediedekning">
				<h2>Mediedekning</h2>
				<p>
					Advarselen er senere omtalt i norske medier og av aktører i finans- og sikkerhetsbransjen.
					Vi tar ikke til motmæle mot noen av disse — de gjør akkurat det de skal, og beskriver
					situasjonen slik den framstår fra utsiden. Her er oversikten vi kjenner til, for full
					åpenhet:
				</p>

				<ul class="not-prose mt-6 space-y-4 list-none pl-0">
					{#each pressCoverage as item}
						<li
							class="rounded-lg ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800/60 p-4 sm:p-5"
						>
							<div
								class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-widest text-blue-900 dark:text-blue-300"
							>
								<span>{item.outlet}</span>
								<span class="text-gray-400 dark:text-gray-500" aria-hidden="true">·</span>
								<span class="text-gray-500 dark:text-gray-400 normal-case tracking-normal">
									{item.kind}
								</span>
								<span class="text-gray-400 dark:text-gray-500" aria-hidden="true">·</span>
								<time
									datetime={item.dateIso}
									class="text-gray-500 dark:text-gray-400 normal-case tracking-normal font-normal"
								>
									{item.dateLabel}
								</time>
							</div>
							<p class="mt-2 text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-snug">
								<a
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
									class="underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 hover:decoration-blue-900 dark:hover:decoration-blue-300"
								>
									{item.title}
								</a>
							</p>
							{#if item.byline}
								<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
									Av {item.byline}
								</p>
							{/if}
						</li>
					{/each}
				</ul>

				<p class="mt-6 text-sm text-gray-500 dark:text-gray-400">
					Denne listen oppdateres ved behov hvis vi blir gjort oppmerksomme på flere publiseringer.
					Har du sett en omtale som ikke står her, kan du <button
						type="button"
						onclick={openSecurityContact}
						class="underline underline-offset-4 text-blue-900 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200"
					>tipse oss</button>.
				</p>
			</section>

			<section id="var-respons">
				<h2>Vår respons</h2>
				<p>
					<strong>Finanstilsynet har helt rett.</strong> Det er fantastisk at de fant nettsiden,
					og det er akkurat slik et fungerende tilsyn skal opptre. En nettside som ser ut som en
					norsk bank uten tydelig avsender <em>skal</em> utløse en advarsel — det er hele poenget
					med føre-var-prinsippet i finansregulering.
				</p>
				<p>
					Samtidig er vi oppriktig lei oss for at prosjektet har vært uklart nok til å utløse en
					offisiell sak. Vi skulle vært tydeligere på at dette er et hobbyprosjekt — i selve
					grensesnittet, i footeren, og i metadata. Det er nå rettet opp med en obligatorisk
					advarsel som vises på første besøk, lenke til Finanstilsynets advarsel i bunnen av
					siden, og denne artikkelen.
				</p>
				<p>
					Takk, Finanstilsynet, for at dere passer på. Og beklager hvis saken har brukt unødvendig
					mye av tilsynets tid og ressurser.
				</p>
			</section>

			<section id="teknisk">
				<h2>Teknisk bakgrunn</h2>
				<p>
					I skrivende stund er HavBank.net en ren frontend — bygget med
					<a href="https://svelte.dev/docs/kit/introduction" target="_blank" rel="noopener noreferrer">SvelteKit</a>
					og Tailwind CSS, uten noen form for kundedata-behandling. Det betyr at:
				</p>
				<ul>
					<li>Innloggingsskjemaet sender ingen forespørsler og autentiserer ingen.</li>
					<li>«Bli kunde»-skjemaene lagrer ingen data og sender ikke e-post.</li>
					<li>Det finnes ingen database, ingen API, og ingen tredjepartsintegrasjoner mot banktjenester.</li>
					<li>Alle tall (renter, produkter, statistikk) er påfunnet for illustrasjonens skyld.</li>
				</ul>
				<p>
					<strong>Vi kommer ikke til å legge til backend</strong> som håndterer personopplysninger,
					reelle transaksjoner eller ekte innlogging. Det er ikke planen, og det er ikke målet med
					prosjektet. Samtidig er det i teorien alltid mulig at kode endres — og nettopp derfor er
					Finanstilsynets advarsel en helt rimelig føre-var-handling, uansett hvilken tilstand
					koden befinner seg i til enhver tid.
				</p>
			</section>

			<section id="hvordan-verifisere">
				<h2>Hvordan du kan verifisere dette selv</h2>
				<p>
					Du trenger ikke ta vårt ord for at dette er et hobbyprosjekt. Det er flere offentlige
					signaler:
				</p>
				<ol>
					<li>
						<strong>Brønnøysundregistrene:</strong> Søk etter «HavBank» i
						<a href="https://www.brreg.no/" target="_blank" rel="noopener noreferrer">Brønnøysundregistrene</a>
						— det finnes ingen oppføring.
					</li>
					<li>
						<strong>Finanstilsynets konsesjonsregister:</strong> HavBank finnes ikke i
						<a href="https://www.finanstilsynet.no/konsesjon/" target="_blank" rel="noopener noreferrer">konsesjonsregisteret</a>
						for banker.
					</li>
					<li>
						<strong>Finanstilsynets advarselsregister:</strong> HavBank står tvert imot på
						<a href={FINANSTILSYNET_URL} target="_blank" rel="noopener noreferrer">
							listen over advarsler
						</a>.
					</li>
					<li>
						<strong>Tekniske spor:</strong> Ta en titt i nettleserens utviklerverktøy (F12). Du vil
						se at ingen fetch-forespørsler går ut når du prøver å logge inn eller sende et skjema.
					</li>
					<li>
						<strong>Kildekoden:</strong> Prosjektet er åpent — du kan lese all kode og bekrefte at
						det ikke finnes noen serverside-logikk for banktjenester.
					</li>
				</ol>
				<p>
					Hvis noen av disse signalene skulle peke mot at HavBank plutselig <em>er</em> en ekte
					bank, er det sannsynligvis fordi siden har blitt kapret eller kopiert. I så fall:
					<strong>ikke bruk den</strong>, og meld fra til Finanstilsynet.
				</p>
			</section>

			<section id="veien-videre">
				<h2>Veien videre</h2>
				<p>
					Konkrete grep som er gjort eller planlegges:
				</p>
				<ul>
					<li>Obligatorisk advarsel som må bekreftes ved første besøk i en ny nettlesersesjon.</li>
					<li>Denne artikkelen, lenket fra advarselen og fra footeren på alle sider.</li>
					<li>Tydeligere merking i footeren om at dette er et hobbyprosjekt, ikke et foretak.</li>
					<li>Fjerning eller omformulering av tekster som kan oppfattes som reelle tilbud.</li>
				</ul>
				<p>
					Har du spørsmål, eller mener du at noe på nettsiden fortsatt er misvisende?
					<button
						type="button"
						onclick={openSecurityContact}
						class="inline font-medium text-blue-900 dark:text-blue-300 underline underline-offset-4 hover:text-blue-800 dark:hover:text-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 rounded-sm"
					>
						Ta gjerne kontakt.
					</button>
					Sikkerhetsforskere og automatiserte skannere finner samme kontaktinformasjon —
					inkludert PGP-nøkkel og fingeravtrykk — i vår maskinlesbare
					<a
						href="/.well-known/security.txt"
						class="font-mono text-blue-900 dark:text-blue-300 underline underline-offset-4 hover:text-blue-800 dark:hover:text-blue-200"
					>/.well-known/security.txt</a>
					etter RFC 9116.
				</p>
			</section>

			<hr />

			<p class="text-sm text-gray-500 dark:text-gray-400">
				Denne artikkelen er skrevet av prosjekteier og oppdateres etter behov. Siste oppdatering:
				<time datetime={publishedIso}>{publishedLabel}</time>.
			</p>
		</div>
	</div>

	<!-- CTA back to Finanstilsynet -->
	<section
		class="mt-16 sm:mt-20 rounded-2xl bg-blue-900 dark:bg-blue-950 px-6 py-10 sm:px-10 sm:py-14 text-white"
	>
		<div class="max-w-3xl">
			<h2 class="text-2xl sm:text-3xl font-bold">
				Les advarselen fra Finanstilsynet direkte
			</h2>
			<p class="mt-3 text-blue-100 text-base sm:text-lg leading-relaxed">
				Vi anbefaler at du leser Finanstilsynets originale advarsel. Den er den offisielle kilden,
				og den forklarer hvorfor tilsynet reagerer på nettsider som denne.
			</p>
			<div class="mt-6">
				<a
					href={FINANSTILSYNET_URL}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-white"
				>
					{#if browser && Icon}
						<Icon
							icon="heroicons:arrow-top-right-on-square"
							class="h-5 w-5 mr-2 text-blue-900"
							aria-hidden="true"
						/>
					{/if}
					<span class="text-blue-900">Åpne finanstilsynet.no</span>
				</a>
			</div>
		</div>
	</section>
</article>
