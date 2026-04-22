<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	const categories = ['Alle', 'Teknologi', 'Rådgivning', 'Nyutdannet', 'Leder'];
	let selectedCategory = $state('Alle');

	const stories = [
		{
			id: 'ingrid',
			name: 'Ingrid Solheim',
			title: 'Senior backend-utvikler',
			years: '6 år i HavBank',
			category: 'Teknologi',
			quote:
				'Jeg kom hit fordi jeg ville bygge betalingssystemer som fungerer for folk — ikke bare for aksjonærer. Seks år senere er jeg fortsatt her fordi vi faktisk gjør det.'
		},
		{
			id: 'lars',
			name: 'Lars Ødegård',
			title: 'Boligrådgiver, Privat',
			years: '9 år i HavBank',
			category: 'Rådgivning',
			quote:
				'Jobben handler om å sitte ned med ekte familier og rydde i økonomien deres. Jeg sover godt fordi jeg vet at rådene mine ikke presser noen over evne.'
		},
		{
			id: 'amira',
			name: 'Amira Khan',
			title: 'Graduate, Risk Management',
			years: '1 år i HavBank',
			category: 'Nyutdannet',
			quote:
				'Graduateprogrammet har rotert meg gjennom kreditt, markedsrisiko og compliance. Jeg har lært mer på ett år enn i hele masterløpet.'
		},
		{
			id: 'jonas',
			name: 'Jonas Berg',
			title: 'Leder, Cash Management',
			years: '14 år i HavBank',
			category: 'Leder',
			quote:
				'Det som overrasket meg mest som ny leder var hvor kort vei det er til toppen av huset. Hvis noe er galt, løser vi det — ikke etter måneder i prosjekt.'
		},
		{
			id: 'nora',
			name: 'Nora Lindberg',
			title: 'Data Scientist, Anti-hvitvask',
			years: '3 år i HavBank',
			category: 'Teknologi',
			quote:
				'Vi jobber med reelle modeller som stopper reelle kriminelle. Det er teknisk utfordrende og moralsk meningsfullt — det er en sjelden kombinasjon.'
		},
		{
			id: 'eirik',
			name: 'Eirik Haugland',
			title: 'Kundeansvarlig, Bedrift',
			years: '11 år i HavBank',
			category: 'Rådgivning',
			quote:
				'De fleste bedriftskundene mine har jeg fulgt fra oppstart. Når de vokser, vokser vi med dem. Det er det fineste med jobben.'
		}
	];

	let filtered = $derived(
		selectedCategory === 'Alle'
			? stories
			: stories.filter((s) => s.category === selectedCategory)
	);
</script>

<svelte:head>
	<title>Historier fra HavBank – Karriere</title>
	<meta
		name="description"
		content="Møt seks ansatte i HavBank som forteller hva de faktisk gjør i jobben — fra graduate til 14-åring i huset. Les om kulturen, bredden og graduateprogrammet."
	/>
	<link rel="canonical" href="https://havbank.net/karriere/historier" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero -->
	<div class="relative isolate overflow-hidden">
		<div class="page-container py-16 sm:py-24">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<p class="section-eyebrow">Karriere</p>
				<h1 class="page-title mt-2">Historier fra HavBank</h1>
				<p class="page-lead">
					Seks ansatte, seks ulike roller. Les hvordan hverdagen faktisk ser ut — fra graduate
					som har rotert gjennom tre avdelinger til seniorleder som har fulgt samme kundeportefølje
					i ti år.
				</p>
				<div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
					<a href="/karriere" class="btn-primary">Se ledige stillinger</a>
					<a href="/karriere/kultur" class="btn-secondary">
						Les om kulturen <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Filter -->
	<div class="page-container mb-10">
		<div class="flex flex-wrap gap-2">
			{#each categories as c}
				<button
					type="button"
					onclick={() => (selectedCategory = c)}
					class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors {selectedCategory ===
					c
						? 'bg-blue-900 text-white dark:bg-blue-800'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}"
				>
					{c}
				</button>
			{/each}
		</div>
	</div>

	<!-- Stories grid -->
	<div class="page-container mb-24">
		<ul
			role="list"
			class="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
		>
			{#each filtered as story (story.id)}
				<li class="card-elevated flex flex-col">
					<div
						class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-700 dark:to-gray-800"
					>
						{#if browser && Icon}
							<Icon
								icon="heroicons:user-circle"
								class="h-20 w-20 text-gray-400 dark:text-gray-500"
							/>
						{/if}
					</div>
					<div class="mt-6">
						<h2 class="text-lg font-semibold text-gray-900 dark:text-white">{story.name}</h2>
						<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{story.title}</p>
						<p class="text-xs text-gray-500 dark:text-gray-400">{story.years}</p>
					</div>
					<blockquote
						class="mt-6 border-l-2 border-blue-900 pl-4 text-sm leading-6 text-gray-700 dark:border-blue-400 dark:text-gray-300"
					>
						«{story.quote}»
					</blockquote>
					<span
						class="mt-6 inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-900 dark:bg-blue-900/40 dark:text-blue-200"
					>
						{story.category}
					</span>
				</li>
			{:else}
				<li class="col-span-full text-sm text-gray-500 dark:text-gray-400">
					Ingen historier matcher filteret.
				</li>
			{/each}
		</ul>
	</div>

	<!-- Graduate programme callout -->
	<div class="page-container mb-24">
		<div class="rounded-2xl bg-blue-900 dark:bg-blue-800 px-6 py-12 sm:p-12">
			<div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
				<div>
					<p class="text-sm font-semibold uppercase tracking-wide text-blue-200">Graduate 2026</p>
					<h2 class="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
						Graduateprogrammet 2026 — søknadsfrist 15. oktober
					</h2>
					<p class="mt-3 max-w-2xl text-base text-blue-100">
						18 måneder med tre rotasjoner i bankens kjerneområder. 20 plasser. Start august 2026.
						Lønn fra dag én.
					</p>
				</div>
				<a href="/karriere/soknad?type=graduate" class="btn-white text-blue-900 shrink-0">
					Søk på graduate 2026
				</a>
			</div>
		</div>
	</div>

	<!-- Legal -->
	<div class="page-container">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Sitatene er gjengitt med samtykke fra ansatte. Ansettelsesforhold og roller kan endres
				over tid. HavBank AS (org.nr. 924 850 771) følger Finansforbundets tariffavtale og
				arbeidsmiljøloven.
			</p>
		</div>
	</div>
</div>
