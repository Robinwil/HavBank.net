<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let Icon;

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.Icon;
	});

	const features = [
		{
			name: 'Sikker bankvirksomhet',
			description:
				'Vi er underlagt streng regulering av Finanstilsynet og følger alle norske banksikkerhetsstandarder.',
			icon: 'heroicons:shield-check'
		},
		{
			name: 'Personlig økonomi',
			description:
				'Få oversikt over din økonomi med våre moderne digitale løsninger og personlig rådgivning.',
			icon: 'heroicons:banknotes'
		},
		{
			name: 'Investering og sparing',
			description:
				'Vi tilbyr et bredt utvalg av spare- og investeringsprodukter tilpasset dine behov.',
			icon: 'heroicons:chart-bar'
		}
	];

	const trustIndicators = [
		{
			icon: 'heroicons:shield-check',
			text: 'SSL-sikret',
			description: '256-bit kryptering'
		},
		{
			icon: 'heroicons:building-library',
			text: 'Finanstilsynet',
			description: 'Under tilsyn'
		},
		{
			icon: 'heroicons:lock-closed',
			text: 'Sikker innlogging',
			description: 'To-faktor autentisering'
		}
	];
</script>

<svelte:head>
	<title>HavBank - Din trygge bank i Norge | Sikker og moderne bankvirksomhet</title>
	<meta
		name="description"
		content="HavBank tilbyr personlige og bedriftstjenester med fokus på bærekraft og digitale løsninger. Konkurransedyktige betingelser og personlig service."
	/>
	<meta property="og:title" content="HavBank - Din trygge bank i Norge" />
	<meta
		property="og:description"
		content="Opplev moderne bankvirksomhet med personlig service. HavBank tilbyr konkurransedyktige lån, sparing og digitale løsninger for privatpersoner og bedrifter."
	/>
</svelte:head>

<div class="relative isolate">
	<div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
		<div
			class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-800 to-blue-900 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>

	<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<div class="mb-8 flex justify-center">
				{#if browser && Icon}
					<Icon icon="heroicons:building-library" class="h-16 w-16 text-blue-900 dark:text-blue-100" />
				{/if}
			</div>
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
				Din trygge bank i Norge
			</h1>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				HavBank kombinerer moderne bankløsninger med tradisjonelle norske bankverdier. Vi er her for å
				hjelpe deg med din personlige økonomi og fremtidige investeringer.
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a
					href="/bli-kunde"
					class="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:bg-blue-800 dark:hover:bg-blue-700"
				>
					Bli kunde
				</a>
				<a
					href="/tjenester"
					class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
				>
					Se våre tjenester <span aria-hidden="true">→</span>
				</a>
			</div>

			<div class="mt-12 flex justify-center space-x-6">
				{#each trustIndicators as indicator}
					<div class="flex flex-col items-center">
						{#if browser && Icon}
							<Icon icon={indicator.icon} class="h-8 w-8 text-blue-900 dark:text-blue-100" />
						{/if}
						<span class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{indicator.text}</span>
						<span class="text-xs text-gray-500 dark:text-gray-400">{indicator.description}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
		<div
			class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-800 to-blue-900 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>
</div>

<div class="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:text-center">
			<h2 class="text-base font-semibold leading-7 text-blue-900 dark:text-blue-400">
				Trygg og moderne
			</h2>
			<p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
				Banktjenester for fremtiden
			</p>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vi tilbyr et komplett utvalg av banktjenester for privatpersoner og bedrifter, med fokus på
				sikkerhet og brukervennlighet.
			</p>
		</div>
		<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
			<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
				{#each features as feature}
					<div class="flex flex-col">
						<dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
							{#if browser && Icon}
								<Icon
									icon={feature.icon}
									class="h-5 w-5 flex-none text-blue-900 dark:text-blue-400"
								/>
							{/if}
							{feature.name}
						</dt>
						<dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
							<p class="flex-auto">{feature.description}</p>
						</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</div>

<!-- Emergency Contact -->
<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
    <div class="relative overflow-hidden rounded-3xl shadow-2xl">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-blue-700 dark:from-red-800 dark:via-red-900 dark:to-blue-900"></div>
        <div class="absolute inset-0 opacity-10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        <!-- Content -->
        <div class="relative px-6 py-20 sm:p-20">
            <div class="mx-auto max-w-xl lg:max-w-none">
                <div class="flex items-center justify-center mb-8">
                    {#if browser && Icon}
                        <div class="p-4 rounded-full bg-red-500/20 backdrop-blur-sm ring-2 ring-red-400/30">
                            <Icon icon="heroicons:exclamation-triangle" class="h-14 w-14 text-white animate-pulse" />
                        </div>
                    {/if}
                </div>
                
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold tracking-tight text-white mb-4">Mistenker du svindel?</h2>
                    <p class="mt-4 text-xl leading-8 text-gray-100 max-w-2xl mx-auto">
                        Kontakt oss umiddelbart hvis du oppdager uautoriserte transaksjoner eller mistenkelig
                        aktivitet på din konto.
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <!-- Phone -->
                    <div class="relative group">
                        <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/30 to-white/10 dark:from-white/20 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                        <div class="relative p-8 rounded-xl bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                            <div class="flex items-center gap-4 mb-4">
                                {#if browser && Icon}
                                    <div class="p-3 rounded-full bg-red-500/20 ring-2 ring-red-400/30">
                                        <Icon icon="heroicons:phone" class="h-6 w-6 text-white" />
                                    </div>
                                {/if}
                                <h3 class="text-xl font-semibold text-white">Ring oss</h3>
                            </div>
                            <p class="text-lg text-gray-100 font-medium">
                                +00 000 00 000
                                <br />
                                <span class="text-sm text-gray-300/80 font-normal">24/7 for sperring av kort</span>
                            </p>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="relative group">
                        <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/30 to-white/10 dark:from-white/20 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                        <div class="relative p-8 rounded-xl bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                            <div class="flex items-center gap-4 mb-4">
                                {#if browser && Icon}
                                    <div class="p-3 rounded-full bg-red-500/20 ring-2 ring-red-400/30">
                                        <Icon icon="heroicons:envelope" class="h-6 w-6 text-white" />
                                    </div>
                                {/if}
                                <h3 class="text-xl font-semibold text-white">Send e-post</h3>
                            </div>
                            <p class="text-lg text-gray-100 font-medium">
                                sikkerhet@havbank.no
                                <br />
                                <span class="text-sm text-gray-300/80 font-normal">Svartid innen 1 time</span>
                            </p>
                        </div>
                    </div>

                    <!-- Chat -->
                    <div class="relative group sm:col-span-2 lg:col-span-1">
                        <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/30 to-white/10 dark:from-white/20 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                        <div class="relative p-8 rounded-xl bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                            <div class="flex items-center gap-4 mb-4">
                                {#if browser && Icon}
                                    <div class="p-3 rounded-full bg-red-500/20 ring-2 ring-red-400/30">
                                        <Icon icon="heroicons:chat-bubble-left-right" class="h-6 w-6 text-white" />
                                    </div>
                                {/if}
                                <h3 class="text-xl font-semibold text-white">Chat med oss</h3>
                            </div>
                            <p class="text-lg text-gray-100 font-medium">
                                I nettbanken
                                <br />
                                <span class="text-sm text-gray-300/80 font-normal">Tilgjengelig 24/7</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>