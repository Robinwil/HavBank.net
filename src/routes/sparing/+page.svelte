<script>
	import Icon from '@iconify/svelte';
	let IconifyIcon = Icon;

	import { browser } from '$app/environment';

	let isLoading = $state(true);
	let selectedProduct = $state(null);
	let pageTitle = $derived(selectedProduct ? `${selectedProduct.name} - Sparing og Investering | HavBank` : 'Sparing og Investering | HavBank');

	const products = [
		{
			name: 'Høyrentekonto',
			description:
				'Fleksibel sparekonto med konkurransedyktig rente og ingen bindingstid.',
			icon: 'heroicons:banknotes',
			href: '/sparing/hoyrentekonto',
			features: ['Konkurransedyktig rente', 'Ingen bindingstid', 'Gratis uttak', 'Innskuddsgaranti']
		},
		{
			name: 'Aksjesparekonto (ASK)',
			description:
				'Samle dine aksjefond og børsnoterte aksjer på én konto med skattefordeler.',
			icon: 'heroicons:chart-bar',
			href: '/sparing/ask',
			features: [
				'Utsatt skatt på gevinst',
				'Bred fondsportefølje',
				'Enkelt å bytte fond',
				'Oversiktlig rapportering'
			]
		},
		{
			name: 'Pensjonssparing',
			description: 'Langsiktig sparing med skattefordeler for en trygg pensjonisttilværelse.',
			icon: 'heroicons:building-library',
			href: '/sparing/pensjon',
			features: [
				'Skattefradrag',
				'Fleksibel spareplan',
				'Profesjonell forvaltning',
				'Årlig pensjonsoversikt'
			]
		}
	];

	const investmentTypes = [
		{
			name: 'Aksjefond',
			description:
				'Bredt utvalg av norske og internasjonale aksjefond med ulik risikoprofil.',
			icon: 'heroicons:arrow-trending-up'
		},
		{
			name: 'Kombinasjonsfond',
			description: 'Balansert investering i både aksjer og rentepapirer.',
			icon: 'heroicons:chart-bar'
		},
		{
			name: 'Rentefond',
			description: 'Stabil avkastning gjennom investering i rentebærende papirer.',
			icon: 'heroicons:banknotes'
		},
		{
			name: 'Indeksfond',
			description: 'Kostnadseffektiv investering som følger markedsindekser.',
			icon: 'heroicons:chart-bar'
		}
	];

	const stats = [
		{ name: 'Kunder med spareavtale', value: '150 000+' },
		{ name: 'Forvaltningskapital', value: '50 mrd' },
		{ name: 'Gjennomsnittlig kundetilfredshet', value: '4.8/5' },
		{ name: 'Års erfaring', value: '100+' }
	];

	$effect(() => {
		if (browser) {
			setTimeout(() => {
				isLoading = false;
			}, 500);
		}
	});

	$effect(() => {
		if (browser && pageTitle) {
			document.title = pageTitle;
		}
	});

	function handleProductSelect(product) {
		selectedProduct = product;
	}
</script>

<svelte:head>
	<title>Sparing og Investering | HavBank</title>
	<meta
		name="description"
		content="HavBank tilbyr et bredt utvalg av spare- og investeringsprodukter. Fra høyrentekonto til aksjesparekonto og pensjonssparing."
	/>
	<meta name="keywords" content="sparing, investering, høyrentekonto, aksjesparekonto, pensjonssparing, fond" />
	<meta property="og:title" content="Sparing og Investering | HavBank" />
	<meta
		property="og:description"
		content="HavBank tilbyr et bredt utvalg av spare- og investeringsprodukter. Fra høyrentekonto til aksjesparekonto og pensjonssparing."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/sparing" />
</svelte:head>

{#if isLoading}
	<div class="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
		<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-900 dark:border-blue-400"></div>
	</div>
{:else}
	<div class="bg-white dark:bg-gray-900">
		<div class="relative isolate overflow-hidden">
			<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
				<div class="mx-auto max-w-2xl text-center">
					<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
						Sparing og investering
					</h1>
					<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
						Vi hjelper deg med å nå dine økonomiske mål gjennom skreddersydde spare- og
						investeringsløsninger.
					</p>
				</div>
			</div>
		</div>

		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:max-w-none">
				<div class="mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
					{#each products as product}
						<article 
							class="flex flex-col relative group"
							aria-labelledby={`product-${product.name}`}
						>
							<button 
								class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								onclick={() => handleProductSelect(product)}
								aria-label={`Velg ${product.name}`}
							></button>
							<dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
								<Icon icon={product.icon} width="20" height="20" class="flex-none text-blue-900 dark:text-blue-400" aria-hidden="true"></Icon>
								<span id={`product-${product.name}`}>{product.name}</span>
							</dt>
							<dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
								<p class="flex-auto">{product.description}</p>
								<ul role="list" class="mt-8 space-y-3 text-sm">
									{#each product.features as feature}
										<li class="flex gap-x-3">
											<svg
												class="h-6 w-5 flex-none text-blue-900 dark:text-blue-400"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
													clip-rule="evenodd"
												/>
											</svg>
											<span class="dark:text-gray-300">{feature}</span>
										</li>
									{/each}
								</ul>
								<p class="mt-6">
									<a
										href={product.href}
										class="text-sm font-semibold leading-6 text-blue-900 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 relative z-10"
									>
										Les mer <span aria-hidden="true">→</span>
									</a>
								</p>
							</dd>
						</article>
					{/each}
				</div>
			</div>
		</div>

		<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
					Investeringsmuligheter
				</h2>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
					Vi tilbyr et bredt utvalg av investeringsmuligheter tilpasset din risikoprofil og dine mål.
				</p>
			</div>
			<dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
				{#each investmentTypes as type}
					<div>
						<dt class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-x-3">
							<Icon icon={type.icon} width="20" height="20" class="flex-none text-blue-900 dark:text-blue-400"></Icon>
							{type.name}
						</dt>
						<dd class="mt-1 text-gray-600 dark:text-gray-400">{type.description}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
					Trygg forvaltning
				</h2>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
					HavBank følger strenge krav til sikkerhet og forvaltning av kundemidler, i tråd med norsk
					lovgivning og Finanstilsynets regelverk.
				</p>
			</div>
			<dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
				{#each stats as stat}
					<div class="flex flex-col-reverse gap-y-3">
						<dt class="text-base leading-7 text-gray-600 dark:text-gray-400">{stat.name}</dt>
						<dd class="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">{stat.value}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8 pb-24 sm:pb-32">
			<div class="relative isolate overflow-hidden bg-gray-50 dark:bg-gray-800 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
				<h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
					Start din sparereise i dag
				</h2>
				<p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
					Våre rådgivere hjelper deg med å velge spareprodukter tilpasset din økonomiske situasjon og
					dine mål.
				</p>
				<div class="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/sparing/avtale"
						class="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:bg-blue-800 dark:hover:bg-blue-700"
					>
						Start spareavtale
					</a>
					<a href="/sparing/radgivning" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
						Book rådgivning <span aria-hidden="true">→</span>
					</a>
				</div>
				<div class="mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
					<div class="flex flex-col items-center">
						<div class="rounded-full bg-blue-900/10 dark:bg-blue-400/10 p-2">
							<Icon icon="heroicons:shield-check" width="24" height="24" class="text-blue-900 dark:text-blue-400"></Icon>
						</div>
						<h3 class="mt-4 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Sikker forvaltning</h3>
						<p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
							Dine investeringer er sikret gjennom strenge regulatoriske krav og tilsyn.
						</p>
					</div>
					<div class="flex flex-col items-center">
						<div class="rounded-full bg-blue-900/10 dark:bg-blue-400/10 p-2">
							<Icon icon="heroicons:clock" width="24" height="24" class="text-blue-900 dark:text-blue-400"></Icon>
						</div>
						<h3 class="mt-4 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Langsiktig perspektiv</h3>
						<p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
							Vi fokuserer på langsiktig verdiskapning og bærekraftige investeringer.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if} 