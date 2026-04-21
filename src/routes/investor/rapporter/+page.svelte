<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	function handleDemoDownload(event) {
		event.preventDefault();
		alert(
			'Dette er en fiktiv demoside. Investorrapporter er ikke tilgjengelig for nedlasting.'
		);
	}

	function handleSubscribe(event) {
		event.preventDefault();
		alert('Takk! I en reell tjeneste ville du nå få varsel når ny rapport publiseres.');
	}

	const types = ['Alle', 'Kvartal', 'Årsrapport', 'Pillar III'];
	const years = ['2024', '2023', '2022'];

	let selectedType = $state('Alle');
	let selectedYear = $state('2024');

	const reports = [
		{
			id: 'q4-2024',
			title: 'Kvartalsrapport Q4 2024',
			type: 'Kvartal',
			year: '2024',
			published: '13. februar 2025',
			pages: 48,
			size: '2,1 MB'
		},
		{
			id: 'q3-2024',
			title: 'Kvartalsrapport Q3 2024',
			type: 'Kvartal',
			year: '2024',
			published: '24. oktober 2024',
			pages: 46,
			size: '2,0 MB'
		},
		{
			id: 'q2-2024',
			title: 'Kvartalsrapport Q2 2024',
			type: 'Kvartal',
			year: '2024',
			published: '18. juli 2024',
			pages: 44,
			size: '1,9 MB'
		},
		{
			id: 'q1-2024',
			title: 'Kvartalsrapport Q1 2024',
			type: 'Kvartal',
			year: '2024',
			published: '25. april 2024',
			pages: 42,
			size: '1,8 MB'
		},
		{
			id: 'annual-2024',
			title: 'Årsrapport 2024',
			type: 'Årsrapport',
			year: '2024',
			published: '13. februar 2025',
			pages: 184,
			size: '8,7 MB'
		},
		{
			id: 'pillar3-2024',
			title: 'Pillar III-rapport 2024',
			type: 'Pillar III',
			year: '2024',
			published: '28. februar 2025',
			pages: 72,
			size: '3,4 MB'
		},
		{
			id: 'annual-2023',
			title: 'Årsrapport 2023',
			type: 'Årsrapport',
			year: '2023',
			published: '15. februar 2024',
			pages: 172,
			size: '8,2 MB'
		},
		{
			id: 'pillar3-2023',
			title: 'Pillar III-rapport 2023',
			type: 'Pillar III',
			year: '2023',
			published: '1. mars 2024',
			pages: 68,
			size: '3,1 MB'
		}
	];

	let filteredReports = $derived(
		reports.filter(
			(r) =>
				(selectedType === 'Alle' || r.type === selectedType) &&
				(selectedYear === 'Alle' || r.year === selectedYear)
		)
	);

	const keyMetrics = [
		{ label: 'Resultat før skatt', value: 'kr 1,24 mrd', note: 'Q4 2024' },
		{ label: 'Egenkapitalavkastning', value: '12,8 %', note: 'Rullerende 12 mnd' },
		{ label: 'CET1-kapitaldekning', value: '17,9 %', note: 'Per 31.12.2024' },
		{ label: 'Kost–inntektsforhold', value: '41,2 %', note: 'Q4 2024' }
	];
</script>

<svelte:head>
	<title>Finansielle rapporter – HavBank Investor Relations</title>
	<meta
		name="description"
		content="Last ned HavBanks kvartalsrapporter, årsrapporter og Pillar III-rapporter. Abonner på varsel når nye rapporter publiseres."
	/>
	<link rel="canonical" href="https://havbank.no/investor/rapporter" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero -->
	<div class="relative isolate overflow-hidden">
		<div class="page-container py-16 sm:py-24">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<p class="section-eyebrow">Investor Relations</p>
				<h1 class="page-title mt-2">Finansielle rapporter</h1>
				<p class="page-lead">
					Alle kvartalsrapporter, årsrapporter og Pillar III-dokumenter fra HavBank ASA.
					Rapportene publiseres i tråd med Oslo Børs' løpende informasjonsplikt.
				</p>
				<div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
					<a href="/investor" class="btn-secondary">
						<span aria-hidden="true">←</span> Tilbake til Investor Relations
					</a>
					<a href="/investor/presentasjoner" class="btn-secondary">
						Presentasjoner <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Key metrics snapshot -->
	<div class="page-container mb-20">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Siste nøkkeltall</h2>
			<p class="section-lead">Fra Q4 2024-rapporten.</p>
		</div>
		<div class="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-6 lg:max-w-none lg:grid-cols-4">
			{#each keyMetrics as m}
				<div class="card-elevated">
					<dt class="text-sm text-gray-600 dark:text-gray-400">{m.label}</dt>
					<dd class="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
						{m.value}
					</dd>
					<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{m.note}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Filter + list -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Rapportarkiv</h2>
			<p class="section-lead">Filtrer etter type og år.</p>
		</div>

		<div class="mt-8 flex flex-wrap gap-x-6 gap-y-4">
			<div>
				<span class="block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400"
					>Type</span
				>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each types as t}
						<button
							type="button"
							onclick={() => (selectedType = t)}
							class="rounded-full px-3 py-1 text-sm font-medium transition-colors {selectedType ===
							t
								? 'bg-blue-900 text-white dark:bg-blue-800'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}"
						>
							{t}
						</button>
					{/each}
				</div>
			</div>

			<div>
				<span class="block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400"
					>År</span
				>
				<div class="mt-2 flex flex-wrap gap-2">
					<button
						type="button"
						onclick={() => (selectedYear = 'Alle')}
						class="rounded-full px-3 py-1 text-sm font-medium transition-colors {selectedYear ===
						'Alle'
							? 'bg-blue-900 text-white dark:bg-blue-800'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}"
					>
						Alle
					</button>
					{#each years as y}
						<button
							type="button"
							onclick={() => (selectedYear = y)}
							class="rounded-full px-3 py-1 text-sm font-medium transition-colors {selectedYear ===
							y
								? 'bg-blue-900 text-white dark:bg-blue-800'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}"
						>
							{y}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-10 space-y-4">
			{#each filteredReports as report (report.id)}
				<article class="card-elevated">
					<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
								<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
									<h3 class="text-base font-semibold text-gray-900 dark:text-white">
										{report.title}
									</h3>
									<span
										class="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-900 dark:bg-blue-900/40 dark:text-blue-200"
										>{report.type}</span
									>
								</div>
								<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
									{report.published} · {report.pages} sider · PDF {report.size}
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
							Last ned
						</button>
					</div>
				</article>
			{:else}
				<p class="text-sm text-gray-500 dark:text-gray-400">
					Ingen rapporter matchet filteret.
				</p>
			{/each}
		</div>
	</div>

	<!-- Subscribe -->
	<div class="page-container mb-24">
		<div class="rounded-2xl bg-blue-900 dark:bg-blue-800 px-6 py-12 sm:p-12">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
					Få varsel når ny rapport publiseres
				</h2>
				<p class="mx-auto mt-4 max-w-xl text-base text-blue-100">
					Meld deg på investor-nyhetsbrevet. Du mottar kun e-post på publiseringsdager.
				</p>
				<form
					class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
					onsubmit={handleSubscribe}
				>
					<label for="ir-email" class="sr-only">E-postadresse</label>
					<input
						id="ir-email"
						type="email"
						required
						placeholder="din@epost.no"
						class="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-white/60 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm"
					/>
					<button type="submit" class="btn-white text-blue-900">Meld meg på</button>
				</form>
			</div>
		</div>
	</div>

	<!-- Legal -->
	<div class="page-container">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				HavBank ASA (org.nr. 924 850 771) er notert på Oslo Børs og publiserer kvartalsrapporter
				i tråd med Verdipapirhandelloven og Oslo Børs' løpende informasjonsplikt. Pillar
				III-rapporten utgis etter CRR/CRD-regelverket. Historisk avkastning er ingen garanti for
				fremtidig avkastning.
			</p>
		</div>
	</div>
</div>
