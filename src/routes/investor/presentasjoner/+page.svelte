<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { showDemoNotice } from '$lib/stores/demoNotice.svelte.js';

	function handleDemoDownload(event) {
		event.preventDefault();
		showDemoNotice({ detail: 'Presentasjonen er ikke tilgjengelig for nedlasting.' });
	}

	function handleRegister(event) {
		event.preventDefault();
		showDemoNotice({ detail: 'Påmelding er ikke mulig — ingen data lagres.' });
	}

	const upcoming = [
		{
			date: '24. april 2026',
			time: '09:00 CET',
			title: 'Q1 2026 Resultatpresentasjon',
			location: 'Webcast og Thon Conference, Oslo',
			type: 'Kvartalspresentasjon'
		},
		{
			date: '8. mai 2026',
			time: '10:00 CET',
			title: 'Ordinær generalforsamling 2026',
			location: 'HavBank, Dronning Eufemias gate 30, Oslo',
			type: 'Generalforsamling'
		},
		{
			date: '11. juni 2026',
			time: '12:00 CET',
			title: 'Capital Markets Day 2026',
			location: 'Sentralen, Oslo · Webcast',
			type: 'Kapitalmarkedsdag'
		}
	];

	const archive = [
		{
			date: '13. februar 2025',
			title: 'Q4 2024 Resultatpresentasjon',
			pdfSize: '6,2 MB',
			webcast: true
		},
		{
			date: '24. oktober 2024',
			title: 'Q3 2024 Resultatpresentasjon',
			pdfSize: '5,8 MB',
			webcast: true
		},
		{
			date: '18. juli 2024',
			title: 'Q2 2024 Resultatpresentasjon',
			pdfSize: '5,6 MB',
			webcast: true
		},
		{
			date: '25. april 2024',
			title: 'Q1 2024 Resultatpresentasjon',
			pdfSize: '5,3 MB',
			webcast: true
		},
		{
			date: '14. juni 2024',
			title: 'Capital Markets Day 2024',
			pdfSize: '18,4 MB',
			webcast: true
		},
		{
			date: '15. februar 2024',
			title: 'Q4 2023 Resultatpresentasjon',
			pdfSize: '5,9 MB',
			webcast: false
		}
	];

	const analysts = [
		{ firm: 'Arctic Securities', analyst: 'Maria Lien', recommendation: 'Kjøp' },
		{ firm: 'DNB Markets', analyst: 'Jon-Olav Svartdal', recommendation: 'Hold' },
		{ firm: 'Nordea Markets', analyst: 'Ingrid Tho', recommendation: 'Kjøp' },
		{ firm: 'SEB Equities', analyst: 'Anders Berg', recommendation: 'Hold' },
		{ firm: 'Pareto Securities', analyst: 'Kari Rønning', recommendation: 'Kjøp' },
		{ firm: 'Sparebank 1 Markets', analyst: 'Eirik Hauge', recommendation: 'Hold' }
	];
</script>

<svelte:head>
	<title>Presentasjoner og webcast – HavBank Investor Relations</title>
	<meta
		name="description"
		content="Kommende presentasjoner, webcast og arkiv fra HavBanks Investor Relations. Se kvartalspresentasjoner, Capital Markets Day og generalforsamling."
	/>
	<link rel="canonical" href="https://havbank.net/investor/presentasjoner" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero -->
	<div class="relative isolate overflow-hidden">
		<div class="page-container py-16 sm:py-24">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<p class="section-eyebrow">Investor Relations</p>
				<h1 class="page-title mt-2">Presentasjoner og webcast</h1>
				<p class="page-lead">
					Kvartalspresentasjoner, Capital Markets Day og generalforsamling — alle tilgjengelig
					som live webcast og i ettertid som opptak og PDF.
				</p>
				<div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
					<a href="/investor" class="btn-secondary">
						<span aria-hidden="true">←</span> Tilbake til Investor Relations
					</a>
					<a href="/investor/rapporter" class="btn-secondary">
						Se rapporter <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Upcoming events -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Kommende hendelser</h2>
			<p class="section-lead">
				Alle tider er oppgitt i sentraleuropeisk tid (CET). Webcast strømmes fra
				havbank.net/investor.
			</p>
		</div>
		<div class="mx-auto mt-12 max-w-4xl space-y-4">
			{#each upcoming as ev}
				<article class="card-elevated">
					<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div class="flex gap-x-4">
							<div class="icon-box">
								{#if browser && Icon}
									<Icon
										icon="heroicons:calendar-days"
										class="h-6 w-6 text-white"
									/>
								{/if}
							</div>
							<div>
								<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
									<h3 class="text-base font-semibold text-gray-900 dark:text-white">
										{ev.title}
									</h3>
									<span
										class="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-900 dark:bg-blue-900/40 dark:text-blue-200"
										>{ev.type}</span
									>
								</div>
								<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
									{ev.date} · {ev.time}
								</p>
								<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
									{ev.location}
								</p>
							</div>
						</div>
						<button
							type="button"
							onclick={handleRegister}
							class="btn-primary shrink-0 whitespace-nowrap"
							aria-label={`Meld deg på ${ev.title}`}
						>
							Meld deg på
						</button>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<!-- Archive -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Arkiv</h2>
			<p class="section-lead">Siste seks presentasjoner. For eldre materiale, kontakt IR.</p>
		</div>
		<div class="mx-auto mt-12 max-w-5xl overflow-hidden card-elevated !p-0">
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead class="bg-gray-50 dark:bg-gray-800/70">
						<tr>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
								>Dato</th
							>
							<th
								scope="col"
								class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
								>Tittel</th
							>
							<th
								scope="col"
								class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
								>PDF</th
							>
							<th
								scope="col"
								class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
								>Webcast</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
						{#each archive as a}
							<tr>
								<td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
									{a.date}
								</td>
								<td class="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
									{a.title}
								</td>
								<td class="px-4 py-4 text-right text-sm">
									<button
										type="button"
										onclick={handleDemoDownload}
										class="font-semibold text-blue-900 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
									>
										{a.pdfSize}
									</button>
								</td>
								<td class="px-4 py-4 text-right text-sm">
									{#if a.webcast}
										<button
											type="button"
											onclick={handleDemoDownload}
											class="font-semibold text-blue-900 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
										>
											Se opptak
										</button>
									{:else}
										<span class="text-gray-400 dark:text-gray-500">—</span>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Analyst coverage -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Analytikere som dekker HavBank ASA</h2>
			<p class="section-lead">
				Ekstern analytikerdekning per 1. april 2026. Anbefalinger er analytikernes egne og
				gjenspeiler ikke HavBanks syn.
			</p>
		</div>
		<div class="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each analysts as a}
				<div class="card-soft">
					<p class="text-base font-semibold text-gray-900 dark:text-white">{a.firm}</p>
					<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{a.analyst}</p>
					<p class="mt-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
						Anbefaling
					</p>
					<p class="mt-1 text-sm font-semibold text-blue-900 dark:text-blue-400">
						{a.recommendation}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- IR contact -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-3xl">
			<h2 class="section-title">Kontakt Investor Relations</h2>
			<div class="mt-8 card-soft">
				<p class="text-base font-semibold text-gray-900 dark:text-white">Anne-Lise Haugen</p>
				<p class="text-sm text-gray-600 dark:text-gray-300">Investor Relations-ansvarlig</p>
				<dl class="mt-4 space-y-2 text-sm">
					<div class="flex gap-x-3">
						{#if browser && Icon}
							<Icon
								icon="heroicons:envelope"
								class="h-5 w-5 text-blue-900 dark:text-blue-400"
							/>
						{/if}
						<a
							href="mailto:ir@havbank.net"
							class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400"
							>ir@havbank.net</a
						>
					</div>
					<div class="flex gap-x-3">
						{#if browser && Icon}
							<Icon
								icon="heroicons:phone"
								class="h-5 w-5 text-blue-900 dark:text-blue-400"
							/>
						{/if}
						<a
							href="tel:+4700000000"
							class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400"
							>+47 00 00 00 00</a
						>
					</div>
				</dl>
			</div>
		</div>
	</div>

	<!-- Legal -->
	<div class="page-container">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				HavBank ASA (org.nr. 924 850 771) er notert på Oslo Børs. Webcast og presentasjoner
				publiseres i henhold til Verdipapirhandelloven og Oslo Børs' regelverk om løpende
				informasjonsplikt. Analytikeranbefalinger er utarbeidet av tredjeparter og er ikke
				investeringsråd fra HavBank.
			</p>
		</div>
	</div>
</div>
