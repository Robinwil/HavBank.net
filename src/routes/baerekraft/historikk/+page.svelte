<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { showDemoNotice } from '$lib/stores/demoNotice.svelte.js';

	function handleDemoDownload(event) {
		event.preventDefault();
		showDemoNotice({ detail: 'Bærekraftsrapporten er ikke tilgjengelig for nedlasting.' });
	}

	const reports = [
		{
			year: 2024,
			title: 'Bærekraftsrapport 2024',
			published: 'Publisert 12. mars 2025',
			pages: 112,
			size: '5,8 MB',
			summary:
				'Fullstendig klimaregnskap etter GHG-protokollen, oppdatert TCFD-analyse og EU-taksonomi-rapportering (KPI-er for omsetning, CapEx og OpEx).'
		},
		{
			year: 2023,
			title: 'Bærekraftsrapport 2023',
			published: 'Publisert 7. mars 2024',
			pages: 96,
			size: '4,9 MB',
			summary:
				'Utvidet rapportering på grønn utlånsandel og første versjon av biologisk mangfold-vurdering i tråd med TNFD-rammeverket.'
		},
		{
			year: 2022,
			title: 'Bærekraftsrapport 2022',
			published: 'Publisert 14. mars 2023',
			pages: 84,
			size: '4,2 MB',
			summary:
				'Første rapport med ekstern verifisering (KPMG) og innføring av interne karbonkostnader på næringskreditt.'
		},
		{
			year: 2021,
			title: 'Bærekraftsrapport 2021',
			published: 'Publisert 9. mars 2022',
			pages: 72,
			size: '3,6 MB',
			summary:
				'Første rapport etter GRI Standards. Baseline-år for scope 1- og 2-utslipp mot målet om 55 % reduksjon innen 2030.'
		}
	];

	const metrics = [
		{
			label: 'Scope 1- og 2-utslipp (tonn CO₂e)',
			values: {
				2024: '612',
				2023: '748',
				2022: '912',
				2021: '1 284'
			},
			note: 'Markedsbasert metode. 52 % reduksjon siden 2021-baseline.'
		},
		{
			label: 'Grønn andel av utlånsporteføljen',
			values: {
				2024: '28,4 %',
				2023: '24,1 %',
				2022: '19,7 %',
				2021: '15,3 %'
			},
			note: 'Basert på EU-taksonomiens kriterier for klimabegrensning.'
		},
		{
			label: 'Kvinneandel i ledelsen',
			values: {
				2024: '46 %',
				2023: '44 %',
				2022: '41 %',
				2021: '39 %'
			},
			note: 'Ledelsesroller definert som nivå 1–3 i HavBank-konsernet.'
		},
		{
			label: 'Energiintensitet (kWh / m² kontorlokaler)',
			values: {
				2024: '118',
				2023: '131',
				2022: '147',
				2021: '162'
			},
			note: 'Reduksjon primært drevet av overgang til varmepumper og LED-belysning.'
		}
	];

	const methodologyNotes = [
		{
			year: '2024',
			change:
				'Utvidet scope 3-rapportering (kategori 15 – finansierte utslipp) etter PCAF-metodikk.'
		},
		{
			year: '2023',
			change:
				'Introdusert biologisk mangfold-vurdering etter TNFD og oppgradert KPI-er for grønn finansiering.'
		},
		{
			year: '2022',
			change:
				'Ekstern verifisering (begrenset sikkerhet) av klimadata ved KPMG AS. Endret baseline fra 2019 til 2021.'
		},
		{
			year: '2021',
			change:
				'Første rapport etter GRI Standards. Etablert interne KPI-er for likestilling, opplæring og personvern.'
		}
	];
</script>

<svelte:head>
	<title>Bærekraftsrapporter – historikk | HavBank</title>
	<meta
		name="description"
		content="Arkiv over HavBanks bærekraftsrapporter fra 2021 til 2024. Rapporteringen følger GRI, TCFD og EU-taksonomien og er verifisert av KPMG."
	/>
	<link rel="canonical" href="https://havbank.net/baerekraft/historikk" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero -->
	<div class="relative isolate overflow-hidden">
		<div class="page-container py-16 sm:py-24">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<p class="section-eyebrow">Rapportarkiv</p>
				<h1 class="page-title mt-2">Bærekraftsrapporter — historikk</h1>
				<p class="page-lead">
					HavBank rapporterer i henhold til GRI Standards, TCFD og EU-taksonomien.
					Klimaregnskapet er utarbeidet etter GHG-protokollen og verifisert med begrenset
					sikkerhet av KPMG AS siden 2022.
				</p>
				<div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
					<a href="/baerekraft" class="btn-secondary">
						<span aria-hidden="true">←</span> Tilbake til bærekraft
					</a>
					<a href="/kontakt" class="btn-secondary">
						Abonner på rapportene <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Reports archive -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Last ned rapportene</h2>
			<p class="section-lead">
				Alle rapporter publiseres både på norsk bokmål og engelsk. PDF-versjonene er
				tilgjengelig i et format som er tilrettelagt for skjermlesere (WCAG 2.1 AA).
			</p>
		</div>
		<div class="mx-auto mt-12 max-w-4xl space-y-4">
			{#each reports as report}
				<article class="card-elevated">
					<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div class="flex gap-x-4">
							<div class="icon-box">
								{#if browser && Icon}
									<Icon
										icon="heroicons:document-chart-bar"
										class="h-6 w-6 text-white"
									/>
								{/if}
							</div>
							<div>
								<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
									{report.title}
								</h3>
								<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
									{report.published} · {report.pages} sider · PDF {report.size}
								</p>
								<p class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
									{report.summary}
								</p>
							</div>
						</div>
						<button
							type="button"
							onclick={handleDemoDownload}
							class="btn-primary shrink-0 whitespace-nowrap"
							aria-label={`Last ned ${report.title} (PDF)`}
						>
							{#if browser && Icon}
								<Icon icon="heroicons:arrow-down-tray" class="mr-2 h-5 w-5" />
							{/if}
							Last ned PDF
						</button>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<!-- Key metrics table -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Nøkkeltall over tid</h2>
			<p class="section-lead">
				Utvikling på de viktigste klima- og samfunnsindikatorene fra 2021 til 2024.
			</p>
		</div>
		<div class="mx-auto mt-12 max-w-5xl overflow-hidden card-elevated !p-0">
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead class="bg-gray-50 dark:bg-gray-800/70">
						<tr>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
							>
								Indikator
							</th>
							<th
								scope="col"
								class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
							>
								2024
							</th>
							<th
								scope="col"
								class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
							>
								2023
							</th>
							<th
								scope="col"
								class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
							>
								2022
							</th>
							<th
								scope="col"
								class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
							>
								2021
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
						{#each metrics as metric}
							<tr>
								<td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
									<div class="font-medium">{metric.label}</div>
									<div class="mt-1 text-xs text-gray-500 dark:text-gray-400">{metric.note}</div>
								</td>
								<td class="px-4 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
									{metric.values[2024]}
								</td>
								<td class="px-4 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
									{metric.values[2023]}
								</td>
								<td class="px-4 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
									{metric.values[2022]}
								</td>
								<td class="px-4 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
									{metric.values[2021]}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Methodology notes -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-3xl">
			<h2 class="section-title">Metodikk og revisjon</h2>
			<p class="section-lead">
				Rapporteringsgrunnlaget utvides over tid. Her er de viktigste endringene mellom årene.
			</p>
			<ul class="mt-10 space-y-6">
				{#each methodologyNotes as note}
					<li class="flex gap-x-4">
						<div class="icon-box shrink-0">
							{#if browser && Icon}
								<Icon
									icon="heroicons:adjustments-horizontal"
									class="h-6 w-6 text-white"
								/>
							{/if}
						</div>
						<div>
							<h3 class="text-base font-semibold text-gray-900 dark:text-white">{note.year}</h3>
							<p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{note.change}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- CTA -->
	<div class="page-container mb-24">
		<div class="rounded-2xl bg-blue-900 dark:bg-blue-800 px-6 py-16 sm:p-16">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-bold tracking-tight text-white">
					Hold deg oppdatert
				</h2>
				<p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
					Få en e-post når neste bærekraftsrapport publiseres, eller snakk med vår avdeling for
					bærekraftig finansiering.
				</p>
				<div class="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
					<a href="/kontakt" class="btn-white text-blue-900">Meld deg på</a>
					<a href="/baerekraft" class="text-sm font-semibold leading-6 text-white">
						Les om bærekraftsarbeidet <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Legal footer -->
	<div class="page-container">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Bærekraftsrapportene er utarbeidet av HavBank AS (org.nr. 924 850 771). Klimadata er
				verifisert med begrenset sikkerhet av KPMG AS siden 2022. Tallene oppgis i henhold til
				GRI Standards, TCFD-anbefalingene og EU-taksonomien. Historiske tall kan være justert
				som følge av metodeendringer — se noteapparatet i den enkelte rapport.
			</p>
		</div>
	</div>
</div>
