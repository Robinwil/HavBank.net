<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	const values = [
		{
			name: 'Kundefokus',
			icon: 'heroicons:building-office',
			description:
				'Vi setter kundens behov først, og tar beslutninger som tjener dem på lang sikt.'
		},
		{
			name: 'Sikkerhet',
			icon: 'heroicons:shield-check',
			description:
				'Vi tar ansvar for å beskytte kundenes verdier og data. Sikkerhet er en del av håndverket.'
		},
		{
			name: 'Samfunnsansvar',
			icon: 'heroicons:user-group',
			description:
				'Vi bidrar til bærekraftig utvikling — gjennom grønn finansiering, mangfold og åpenhet.'
		},
		{
			name: 'Integritet',
			icon: 'heroicons:scale',
			description:
				'Vi sier fra når noe er feil. Kort vei til ledelsen, varslingsrutiner i tråd med arbeidsmiljøloven.'
		}
	];

	const workdayColumns = [
		{
			icon: 'heroicons:home-modern',
			title: 'Hybrid arbeidssted',
			description:
				'Opp til 3 hjemmedager i uken. Hovedkontor ved Dronning Eufemias gate, regionskontorer i Bergen, Trondheim og Tromsø.'
		},
		{
			icon: 'heroicons:clock',
			title: '37,5 timers uke med fleks',
			description:
				'Kjernetid 09:00–14:30. Avspasering for overtid er standard — vi betaler ikke for å brenne folk ut.'
		},
		{
			icon: 'heroicons:academic-cap',
			title: 'Kompetansebudsjett kr 25 000',
			description:
				'Årlig budsjett per ansatt til kurs, sertifiseringer og konferanser. Inntil 10 dager studiepermisjon med lønn.'
		}
	];

	const benefits = [
		{
			icon: 'heroicons:banknotes',
			title: 'Innskuddspensjon 7 %',
			description:
				'Sparing fra første krone, 1 G – 12 G. Uføreforsikring og fripoliseinformasjon inkludert.'
		},
		{
			icon: 'heroicons:heart',
			title: 'Helseforsikring',
			description:
				'Behandlings- og helseforsikring hos Storebrand Helseforsikring for deg og barn under 21 år.'
		},
		{
			icon: 'heroicons:home',
			title: 'Boliglån til personalrente',
			description:
				'Fra fast ansettelse kan du søke boliglån med 0,5 prosentpoeng rabatt på ordinær boliglånsrente.'
		},
		{
			icon: 'heroicons:sun',
			title: 'Sommerstudio i Kragerø',
			description:
				'Ansatte kan låne selskapets sommerstudio på Skåtøy i sommerhalvåret. Loddtrekning i mars.'
		}
	];

	const diversity = [
		{ label: 'Kvinneandel totalt', value: '48 %' },
		{ label: 'Kvinner i ledelsen', value: '52 %' },
		{ label: 'Nasjonaliteter', value: '22' },
		{ label: 'Gjennomsnittlig ansettelsestid', value: '7,4 år' }
	];
</script>

<svelte:head>
	<title>Kultur og verdier – Karriere i HavBank</title>
	<meta
		name="description"
		content="Møt kulturen i HavBank. Fire kjerneverdier, hybrid arbeidshverdag, kompetansebudsjett på kr 25 000 og ansatteordninger som boliglån til personalrente."
	/>
	<link rel="canonical" href="https://havbank.net/karriere/kultur" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero -->
	<div class="relative isolate overflow-hidden">
		<div class="page-container py-16 sm:py-24">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<p class="section-eyebrow">Karriere</p>
				<h1 class="page-title mt-2">Kultur og verdier i HavBank</h1>
				<p class="page-lead">
					Vi bygger en bank som er rettferdig, åpen og faglig tung. Kulturen er bygd rundt fire
					verdier som vises igjen i hvordan vi ansetter, leder og snakker med kundene våre.
				</p>
				<div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
					<a href="/karriere" class="btn-primary">Se ledige stillinger</a>
					<a href="/karriere/soknad?type=open" class="btn-secondary">
						Fortell oss hvem du er <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Values -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Fire kjerneverdier</h2>
			<p class="section-lead">
				Samme verdier som står på forsiden av årsrapporten og på veggen i lunsjen. De skal kunne
				testes i hverdagen, ikke bare henges i ramme.
			</p>
		</div>
		<div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
			{#each values as value}
				<div class="card-soft">
					<div class="icon-box">
						{#if browser && Icon}
							<Icon icon={value.icon} class="h-6 w-6 text-white" />
						{/if}
					</div>
					<h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white">{value.name}</h3>
					<p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
						{value.description}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Hverdag -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Slik er hverdagen</h2>
			<p class="section-lead">
				Fleksibilitet, faglig tyngde og plass til livet utenfor jobb.
			</p>
		</div>
		<div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
			{#each workdayColumns as col}
				<div class="flex flex-col">
					<div class="icon-box">
						{#if browser && Icon}
							<Icon icon={col.icon} class="h-6 w-6 text-white" />
						{/if}
					</div>
					<h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white">{col.title}</h3>
					<p class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
						{col.description}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Benefits -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Goder og ordninger</h2>
			<p class="section-lead">
				Konkurransedyktige vilkår i tråd med Finansforbundets hovedtariffavtale, pluss det lille
				ekstra.
			</p>
		</div>
		<div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none">
			{#each benefits as b}
				<div class="flex gap-x-4">
					<div class="icon-box shrink-0">
						{#if browser && Icon}
							<Icon icon={b.icon} class="h-6 w-6 text-white" />
						{/if}
					</div>
					<div>
						<h3 class="text-base font-semibold text-gray-900 dark:text-white">{b.title}</h3>
						<p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
							{b.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Diversity stats -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Mangfold i tall</h2>
			<p class="section-lead">
				Oppdaterte tall fra bærekraftsrapporten 2024. Vi rapporterer det — også når det er
				ubehagelig.
			</p>
		</div>
		<div class="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-6 lg:max-w-none lg:grid-cols-4">
			{#each diversity as d}
				<div class="card-elevated">
					<dt class="text-sm text-gray-600 dark:text-gray-400">{d.label}</dt>
					<dd class="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
						{d.value}
					</dd>
				</div>
			{/each}
		</div>
		<p class="mx-auto mt-6 max-w-3xl text-sm text-gray-500 dark:text-gray-400">
			Se full likestillingsredegjørelse i
			<a
				href="/baerekraft/historikk"
				class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400"
				>bærekraftsrapporten</a
			>.
		</p>
	</div>

	<!-- CTA -->
	<div class="page-container mb-24">
		<div class="rounded-2xl bg-blue-900 dark:bg-blue-800 px-6 py-12 sm:p-12">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
					Er du nysgjerrig?
				</h2>
				<p class="mx-auto mt-4 max-w-xl text-base text-blue-100">
					Se ledige stillinger, eller send oss en åpen søknad om du ikke finner den rette.
				</p>
				<div class="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
					<a href="/karriere" class="btn-white text-blue-900">Se ledige stillinger</a>
					<a href="/karriere/historier" class="text-sm font-semibold leading-6 text-white">
						Les ansatthistorier <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Legal -->
	<div class="page-container">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				HavBank AS (org.nr. 924 850 771) er en IA-bedrift og arbeider aktivt mot
				aktivitets- og redegjørelsesplikten. Tall hentet fra bærekraftsrapport 2024 og intern
				HR-statistikk per 31. desember 2024.
			</p>
		</div>
	</div>
</div>
