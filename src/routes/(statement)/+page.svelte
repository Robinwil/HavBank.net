<script lang="ts">
	const CANONICAL_URL = 'https://havbank.net/';
	const LOGO_URL = 'https://havbank.net/favicon.png';
	const FINANSTILSYNET_URL =
		'https://www.finanstilsynet.no/nyhetsarkiv/nyheter/2026/finanstilsynet-advarer-mot-havbank/';

	const HEADLINE = 'HavBank.net var et fiktivt hobbyprosjekt, ikke en reell bank.';
	// The same text as the description on /om-prosjektet.
	const DESCRIPTION =
		'HavBank.net er et fiktivt hobbyprosjekt — ikke en reell bank. Les prosjekteiers respons på Finanstilsynets advarsel fra 6. mars 2026, teknisk bakgrunn, mediedekning og hvordan du selv kan verifisere at HavBank ikke tilbyr reelle banktjenester.';
</script>

<svelte:head>
	<title>{HEADLINE}</title>
	<meta name="description" content={DESCRIPTION} />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={CANONICAL_URL} />
	<meta property="og:title" content={HEADLINE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={CANONICAL_URL} />
	<meta property="og:site_name" content="HavBank (hobbyprosjekt)" />
	<meta property="og:locale" content="nb_NO" />
	<meta property="og:image" content={LOGO_URL} />
</svelte:head>

<!-- Everything below the headline is Robin's own text from /om-prosjektet, word for word and in
     the same order. Don't edit it here without changing it there. -->
<main class="page-container py-16 sm:py-24">
	<div class="max-w-3xl">
		<h1 class="page-title">{HEADLINE}</h1>
		<div class="mt-8 space-y-5 text-lg leading-8 text-gray-700 dark:text-gray-300">
			<p>
				Nettsiden er laget som en design- og frontend-øvelse — et forsøk på å bygge en troverdig
				norsk bankopplevelse fra bunnen av i SvelteKit, med fokus på tilgjengelighet, dark mode,
				norske tekstkonvensjoner, og helhetlig informasjonsarkitektur.
			</p>
			<p>
				Den er ikke, og har aldri vært, en ekte bank. Det foregår ingen finansielle transaksjoner,
				ingen kundeforhold opprettes, og ingen av skjemaene sender data noe sted i nåværende
				versjon.
			</p>
			<p>
				<time datetime="2026-03-06">Fredag 6. mars 2026</time> publiserte Finanstilsynet en offentlig
				advarsel mot HavBank.
			</p>
			<p>
				Finanstilsynet har helt rett. Samtidig er vi oppriktig lei oss for at prosjektet har vært
				uklart nok til å utløse en offisiell sak.
			</p>
		</div>
		<div class="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
			<a href={FINANSTILSYNET_URL} target="_blank" rel="noopener noreferrer" class="btn-primary">
				Les Finanstilsynets advarsel
			</a>
			<a href="/om-prosjektet" class="btn-secondary">Les hele redegjørelsen på «Om prosjektet»</a>
		</div>
	</div>
</main>
