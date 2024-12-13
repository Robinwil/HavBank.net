<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	const IconifyIcon = Icon;

	let email = $state('');
	let subscribeStatus = $state('idle'); // idle, loading, success, error
	let errorMessage = $state('');

	// Company benefits
	const benefits = [
		{
			icon: 'heroicons:academic-cap',
			title: 'Faglig utvikling',
			description: 'Kontinuerlig læring gjennom kurs, konferanser og intern kunnskapsdeling'
		},
		{
			icon: 'heroicons:heart',
			title: 'Helse og velvære',
			description: 'Helseforsikring, treningsstøtte og fleksibel arbeidstid'
		},
		{
			icon: 'heroicons:building-office-2',
			title: 'Moderne lokaler',
			description: 'Sentrale kontorer med state-of-the-art fasiliteter'
		},
		{
			icon: 'heroicons:user-group',
			title: 'Sosialt miljø',
			description: 'Aktiv sosialkomité, teambuilding og faglige arrangementer'
		},
		{
			icon: 'heroicons:banknotes',
			title: 'Konkurransedyktige betingelser',
			description: 'God lønn, pensjon og forsikringsordninger'
		},
		{
			icon: 'heroicons:home',
			title: 'Fleksibel arbeidshverdag',
			description: 'Mulighet for hjemmekontor og fleksitid'
		}
	];

	// Values
	const values = [
		{
			title: 'Innovasjon',
			description: 'Vi utfordrer det etablerte og søker nye løsninger'
		},
		{
			title: 'Integritet',
			description: 'Vi handler etisk og tar ansvar for våre beslutninger'
		},
		{
			title: 'Samarbeid',
			description: 'Vi lykkes best når vi jobber sammen'
		},
		{
			title: 'Kundefokus',
			description: 'Kundenes behov står i sentrum for alt vi gjør'
		}
	];

	// Update the navigation links
	const navLinks = [
		{ href: '/om-oss', text: 'Om HavBank' }
	];


	function handleSubmit(event) {
		event.preventDefault();
		if (!email) {
			errorMessage = 'Vennligst skriv inn din e-postadresse';
			return;
		}

		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			errorMessage = 'Vennligst skriv inn en gyldig e-postadresse';
			return;
		}

		subscribeStatus = 'loading';
		errorMessage = '';

		// Simulate API call
		setTimeout(async () => {
			subscribeStatus = 'success';
			email = '';
			
			// Reset after 3 seconds
			setTimeout(() => {
				subscribeStatus = 'idle';
			}, 3000);
		}, 1000);
	}
</script>

<svelte:head>
	<title>Karriere | HavBank - Bli med på laget</title>
	<meta
		name="description"
		content="Utforsk karrieremuligheter i HavBank. Vi søker engasjerte mennesker som vil være med å forme fremtidens bank."
	/>
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden bg-gradient-to-b from-blue-100 dark:from-blue-950 to-transparent">
		<div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Bli med på laget
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					I HavBank jobber vi for å skape fremtidens bank. Vi søker engasjerte mennesker som vil være
					med på reisen.
				</p>
			</div>
		</div>
	</div>

	<!-- Quick Navigation -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 -mt-8 mb-16">
		<div class="flex flex-wrap gap-4 justify-center">
			{#each navLinks as link}
				<a
					href={link.href}
					class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
				>
					{link.text}
				</a>
			{/each}
		</div>
	</div>

	<!-- Current Openings -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800">
			<!-- Background Pattern -->
			<div class="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"> </div>
			
			<div class="relative p-8 lg:p-12">
				<div class="mx-auto max-w-2xl text-center">
					<div class="inline-flex items-center justify-center rounded-lg bg-white/10 p-2 mb-8">
						{#if browser && Icon}
							<Icon icon="heroicons:briefcase" class="h-5 w-5 text-white" />
						{/if}
						<span class="ml-2 text-sm font-medium text-white">Karrieremuligheter</span>
					</div>

					<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Ledige stillinger
					</h2>
					<p class="mt-4 text-lg text-blue-100">
						Vi har for øyeblikket ingen ledige stillinger, men vi er alltid på utkikk etter dyktige
						mennesker. Velg en av søknadsmulighetene under.
					</p>

					<!-- Application Options -->
					<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<a
							href="/karriere/soknad?type=open"
							class="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm p-6 hover:bg-white/20 transition-colors group"
						>
							<div class="flex flex-col items-center">
								{#if browser && Icon}
									<Icon icon="heroicons:document-text" class="h-8 w-8 text-white mb-4" />
								{/if}
								<h3 class="text-lg font-semibold text-white">Åpen søknad</h3>
								<p class="mt-2 text-sm text-blue-100">Send oss din søknad</p>
								<div class="mt-4 flex items-center text-sm text-white">
									<span>Les mer</span>
									{#if browser && Icon}
										<Icon 
											icon="heroicons:arrow-right" 
											class="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" 
										/>
									{/if}
								</div>
							</div>
						</a>

						<a
							href="/karriere/soknad?type=student"
							class="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm p-6 hover:bg-white/20 transition-colors group"
						>
							<div class="flex flex-col items-center">
								{#if browser && Icon}
									<Icon icon="heroicons:academic-cap" class="h-8 w-8 text-white mb-4" />
								{/if}
								<h3 class="text-lg font-semibold text-white">Student og nyutdannet</h3>
								<p class="mt-2 text-sm text-blue-100">Start din karriere hos oss</p>
								<div class="mt-4 flex items-center text-sm text-white">
									<span>Les mer</span>
									{#if browser && Icon}
										<Icon 
											icon="heroicons:arrow-right" 
											class="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" 
										/>
									{/if}
								</div>
							</div>
						</a>

						<a
							href="/karriere/soknad?type=internship"
							class="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm p-6 hover:bg-white/20 transition-colors group"
						>
							<div class="flex flex-col items-center">
								{#if browser && Icon}
									<Icon icon="heroicons:beaker" class="h-8 w-8 text-white mb-4" />
								{/if}
								<h3 class="text-lg font-semibold text-white">Internship</h3>
								<p class="mt-2 text-sm text-blue-100">Få verdifull erfaring</p>
								<div class="mt-4 flex items-center text-sm text-white">
									<span>Les mer</span>
									{#if browser && Icon}
										<Icon 
											icon="heroicons:arrow-right" 
											class="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" 
										/>
									{/if}
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Benefits -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				Fordeler i HavBank
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Vi tilbyr mer enn bare en jobb. Her er noen av fordelene ved å jobbe hos oss.
			</p>
		</div>
		<div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
			{#each benefits as benefit}
				<div class="flex flex-col rounded-xl bg-white dark:bg-gray-800 p-6 ring-1 ring-gray-200 dark:ring-gray-700">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
						{#if browser && Icon}
							<Icon icon={benefit.icon} class="h-6 w-6 text-white" />
						{/if}
					</div>
					<h3 class="mt-4 text-lg font-semibold leading-8 text-gray-900 dark:text-white">
						{benefit.title}
					</h3>
					<p class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
						{benefit.description}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Values -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				Våre verdier
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Verdiene våre definerer hvem vi er og hvordan vi jobber sammen.
			</p>
		</div>
		<div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
			{#each values as value}
				<div class="flex flex-col rounded-xl bg-white dark:bg-gray-800 p-6 ring-1 ring-gray-200 dark:ring-gray-700">
					<h3 class="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
						{value.title}
					</h3>
					<p class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
						{value.description}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Life at HavBank -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="rounded-2xl bg-blue-600 px-6 py-16 sm:p-16">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-bold tracking-tight text-white">Livet i HavBank</h2>
				<p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
					Bli bedre kjent med hvordan det er å jobbe hos oss gjennom våre ansattes historier og
					opplevelser.
				</p>
				<div class="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/karriere/historier"
						class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						Les våre historier
					</a>
					<a href="/karriere/kultur" class="text-sm font-semibold leading-6 text-white">
						Vår kultur <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Grid background pattern */
	.bg-grid-white\/10 {
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
		background-size: 24px 24px;
	}

	/* Animation for success state */
	@keyframes checkmark {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}

	:global(.success-icon) {
		animation: checkmark 0.3s ease-in-out forwards;
	}
</style> 