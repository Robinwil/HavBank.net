<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	const IconifyIcon = Icon;


	const LOAD_TIMEOUT_MS = 10000; // 10 seconds timeout

	// Use plain objects instead of Maps for better reactivity
	let imageStates = $state({});
	let timeouts = $state({});

	const stats = [
		{ name: 'Kontorer i Norge', value: '45+' },
		{ name: 'Ansatte', value: '2,500+' },
		{ name: 'Privatkunder', value: '400,000+' },
		{ name: 'Bedriftskunder', value: '50,000+' }
	];

	const timeline = [
		{
			year: '1924',
			title: 'Grunnleggelsen',
			description:
				'HavBank ble etablert som en lokal sparebank i Oslo med mål om å støtte lokalsamfunnet.'
		},
		{
			year: '1950',
			title: 'Regional ekspansjon',
			description: 'Banken ekspanderte til flere regioner i Norge gjennom strategiske fusjoner.'
		},
		{
			year: '1985',
			title: 'Digital pionér',
			description: 'En av de første norske bankene som tilbød elektroniske banktjenester.'
		},
		{
			year: '2000',
			title: 'Moderne bank',
			description: 'Lansering av nettbank og mobile banktjenester for privat- og bedriftskunder.'
		},
		{
			year: '2015',
			title: 'Bærekraftig finans',
			description: 'Implementering av ESG-kriterier i alle investeringsbeslutninger.'
		},
		{
			year: '2024',
			title: 'Fremtiden',
			description: 'Fortsetter å innovere med fokus på digitalisering og bærekraftig bankdrift.'
		}
	];

	const values = [
		{
			name: 'Kundefokus',
			icon: 'heroicons:building-office',
			description: 'Vi setter kunden først i alt vi gjør.'
		},
		{
			name: 'Sikkerhet',
			icon: 'heroicons:shield-check',
			description: 'Vi tar ansvar for å beskytte våre kunders verdier og data.'
		},
		{
			name: 'Samfunnsansvar',
			icon: 'heroicons:user-group',
			description: 'Vi bidrar aktivt til bærekraftig utvikling av samfunnet.'
		},
		{
			name: 'Innovasjon',
			icon: 'heroicons:globe-europe-africa',
			description: 'Vi utvikler fremtidsrettede løsninger for våre kunder.'
		},
		{
			name: 'Integritet',
			icon: 'heroicons:scale',
			description: 'Vi opptrer etisk og ansvarlig i all vår virksomhet.'
		},
		{
			name: 'Tilgjengelighet',
			icon: 'heroicons:hand-raised',
			description: 'Vi er tilgjengelige når kundene trenger oss.'
		}
	];

	const employees = [
		{
			id: 'erik-hansen',
			name: 'Erik Hansen',
			title: 'Administrerende Direktør',
			department: 'Ledelse',
			email: 'erik.hansen@havbank.no',
			image: '/images/employees/erik-hansen.jpg',
			linkedIn: 'https://linkedin.com/in/erik-hansen',
			phone: '+00 000 00 000'
		},
		{
			id: 'maria-olsen',
			name: 'Maria Olsen',
			title: 'Sikkerhetssjef',
			department: 'IT-Sikkerhet',
			email: 'maria.olsen@havbank.no',
			image: '/images/employees/maria-olsen.jpg',
			linkedIn: 'https://linkedin.com/in/maria-olsen',
			phone: '+00 000 00 000'
		},
		{
			id: 'anders-berg',
			name: 'Anders Berg',
			title: 'Finansdirektør',
			department: 'Økonomi',
			email: 'anders.berg@havbank.no',
			image: null,
			linkedIn: 'https://linkedin.com/in/anders-berg',
			phone: '+00 000 00 000'
		},
		{
			id: 'kristine-dahl',
			name: 'Kristine Dahl',
			title: 'Personvernombud',
			department: 'Compliance',
			email: 'kristine.dahl@havbank.no',
			image: '/images/employees/kristine-dahl.jpg',
			linkedIn: 'https://linkedin.com/in/kristine-dahl',
			phone: '+00 000 00 000'
		}
	];

	// Initialize states for employees with images
	employees.forEach(employee => {
		if (employee.image) {
			imageStates[employee.id] = 'loading';
			startTimeout(employee.id);
		} else {
			imageStates[employee.id] = 'fallback';
		}
	});

	function startTimeout(employeeId) {
		// Clear existing timeout if any
		clearTimeout(timeouts[employeeId]);

		// Set new timeout
		const timeoutId = setTimeout(() => {
			console.log('Image load timeout for:', employeeId);
			imageStates[employeeId] = 'fallback';
			delete timeouts[employeeId];
			// Force reactivity update
			imageStates = { ...imageStates };
			timeouts = { ...timeouts };
		}, LOAD_TIMEOUT_MS);

		timeouts[employeeId] = timeoutId;
	}

	function handleImageLoad(employeeId) {
		console.log('Image loaded:', employeeId);
		clearTimeout(timeouts[employeeId]);
		delete timeouts[employeeId];
		imageStates[employeeId] = 'loaded';
		// Force reactivity update
		imageStates = { ...imageStates };
		timeouts = { ...timeouts };
	}

	function handleImageError(employeeId) {
		console.log('Image error:', employeeId);
		clearTimeout(timeouts[employeeId]);
		delete timeouts[employeeId];
		imageStates[employeeId] = 'fallback';
		// Force reactivity update
		imageStates = { ...imageStates };
		timeouts = { ...timeouts };
	}

	// Cleanup timeouts on destroy
	onMount(() => {
		return () => {
			Object.values(timeouts).forEach(timeoutId => clearTimeout(timeoutId));
		};
	});
</script>

<svelte:head>
	<title>Om oss - HavBank | Vårt team og historie</title>
	<meta
		name="description"
		content="Møt teamet bak HavBank - erfarne fagfolk dedikert til sikker og moderne bankvirksomhet i Norge."
	/>
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
				Vårt team
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
				Møt fagfolkene som sikrer trygg og moderne bankvirksomhet for våre kunder.
			</p>
		</div>
		<ul
			role="list"
			class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
		>
			{#each employees as employee}
				<li class="group relative flex flex-col items-start">
					<div class="relative h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-transform group-hover:scale-105">
						{#if employee.image && imageStates[employee.id] === 'loading'}
							<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-gray-100/50 dark:from-gray-800 dark:to-gray-900">
								{#if browser && Icon}
									<Icon 
										icon="heroicons:arrow-path" 
										class="h-12 w-12 text-gray-400 dark:text-gray-600 animate-spin"
									/>
								{:else}
									<div class="h-12 w-12 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-transparent animate-spin"></div>
								{/if}
							</div>
						{/if}

						{#if employee.image && imageStates[employee.id] === 'loaded'}
							<img
								src={employee.image}
								alt={employee.name}
								class="h-full w-full object-cover"
								onload={() => handleImageLoad(employee.id)}
								onerror={() => handleImageError(employee.id)}
							/>
						{/if}

						{#if !employee.image || imageStates[employee.id] === 'fallback'}
							<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-gray-100/50 dark:from-gray-800 dark:to-gray-900">
								{#if browser && Icon}
									<Icon 
										icon="heroicons:user-circle" 
										class="h-24 w-24 text-gray-400 dark:text-gray-600"
									/>
								{:else}
									<div class="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
								{/if}
							</div>
						{/if}
					</div>
					<div class="mt-6 w-full">
						<h3 class="text-lg font-semibold leading-8 tracking-tight text-gray-900 dark:text-white">
							{employee.name}
						</h3>
						<p class="text-base leading-7 text-gray-600 dark:text-gray-300">{employee.title}</p>
						<p class="text-sm leading-6 text-gray-500 dark:text-gray-400">{employee.department}</p>
					</div>
					<div class="mt-4 w-full space-y-3">
						<!-- Email -->
						<a
							href={`mailto:${employee.email}`}
							class="group/link flex items-center gap-x-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
							aria-label={`Send e-post til ${employee.name}`}
						>
							{#if browser && Icon}
								{#key Icon}
									<Icon icon="heroicons:envelope" class="h-5 w-5" />
								{/key}
							{:else}
								<span class="h-5 w-5"></span> 
							{/if}
							<span class="truncate">{employee.email}</span>
						</a>

						<!-- Phone -->
						<a
							href={`tel:${employee.phone}`}
							class="group/link flex items-center gap-x-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
							aria-label={`Ring ${employee.name}`}
						>
							{#if browser && Icon}
								{#key Icon}
									<Icon icon="heroicons:phone" class="h-5 w-5" />
								{/key}
							{:else}
								<span class="h-5 w-5"></span>
							{/if}
							<span>{employee.phone}</span>
						</a>

						<!-- LinkedIn -->
						{#if employee.linkedIn}
							<a
								href={employee.linkedIn}
								target="_blank"
								rel="noopener noreferrer"
								class="group/link flex items-center gap-x-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
								aria-label={`${employee.name} på LinkedIn`}
							>
								{#if browser && Icon}
									<Icon icon="heroicons:link" class="h-5 w-5" />
								{:else}
									<span class="h-5 w-5"></span>
								{/if}
								<span>LinkedIn</span>
							</a>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<div class="bg-white">
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
					En trygg bank siden 1924
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600">
					HavBank er en moderne norsk bank med røtter tilbake til 1924. Vi kombinerer tradisjonelle
					bankverdier med innovative løsninger for å møte dagens og morgendagens behov.
				</p>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Våre verdier</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600">
				Våre kjerneverdier reflekterer vår forpliktelse til kundene, samfunnet og norsk
				banklovgivning.
			</p>
			<div class="mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
				{#each values as value}
					<div class="flex flex-col">
						<dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
							{#if browser && Icon}
								<Icon 
									icon={value.icon} 
									width="20" 
									height="20" 
									class="flex-none text-blue-900"
								/>
							{:else}
								<span class="w-5 h-5"></span>
							{/if}
							{value.name}
						</dt>
						<dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
							<p class="flex-auto">{value.description}</p>
						</dd>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Vår historie</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600">
				Fra våre beskjedne begynnelser som en lokal sparebank til dagens posisjon som en ledende
				finansinstitusjon.
			</p>
		</div>
		<div class="mx-auto mt-16 max-w-2xl lg:mx-0">
			<div class="mt-8 space-y-16">
				{#each timeline as event}
					<div class="flex flex-col gap-x-4 gap-y-2 lg:flex-row lg:items-baseline lg:gap-x-8">
						<h3 class="mt-1 text-lg font-semibold leading-6 text-blue-900 lg:w-32 lg:flex-none lg:text-right">
							{event.year}
						</h3>
						<div class="lg:flex-auto">
							<h4 class="font-semibold text-gray-900">{event.title}</h4>
							<p class="mt-1 text-base leading-7 text-gray-600">{event.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Regulering og compliance
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600">
				HavBank opererer under streng regulering og tilsyn av Finanstilsynet, og følger alle gjeldende
				lover og forskrifter for norsk bankvirksomhet.
			</p>
		</div>
		<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
			<div class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
				<div class="flex flex-col gap-y-8">
					<div class="bg-gray-50 p-8 rounded-2xl">
						<h3 class="text-base font-semibold leading-7 text-gray-900">
							Lisenser og tillatelser
						</h3>
						<p class="mt-4 text-sm leading-6 text-gray-600">
							Vi har alle nødvendige lisenser og tillatelser fra Finanstilsynet for å drive
							bankvirksomhet i Norge, inkludert:
						</p>
						<ul class="mt-4 text-sm leading-6 text-gray-600 list-disc pl-5 space-y-2">
							<li>Konsesjon for bank- og finansieringsvirksomhet</li>
							<li>Tillatelse til verdipapirhandel</li>
							<li>Konsesjon for forsikringsformidling</li>
							<li>Autorisasjon for eiendomsmegling</li>
						</ul>
					</div>
					<div class="bg-gray-50 p-8 rounded-2xl">
						<h3 class="text-base font-semibold leading-7 text-gray-900">
							Sikkerhet og personvern
						</h3>
						<p class="mt-4 text-sm leading-6 text-gray-600">
							Vi følger strenge sikkerhetsrutiner og personvernregler, inkludert:
						</p>
						<ul class="mt-4 text-sm leading-6 text-gray-600 list-disc pl-5 space-y-2">
							<li>GDPR og personopplysningsloven</li>
							<li>Hvitvaskingsloven og terrorfinansiering</li>
							<li>IKT-forskriften for banker</li>
							<li>Finansforetaksloven</li>
						</ul>
					</div>
				</div>
				<div class="flex flex-col gap-y-8">
					<div class="bg-gray-50 p-8 rounded-2xl">
						<h3 class="text-base font-semibold leading-7 text-gray-900">
							Medlemskap og garantier
						</h3>
						<p class="mt-4 text-sm leading-6 text-gray-600">
							Som kunde i HavBank er du sikret gjennom:
						</p>
						<ul class="mt-4 text-sm leading-6 text-gray-600 list-disc pl-5 space-y-2">
							<li>Bankenes sikringsfond (inntil 2 millioner NOK)</li>
							<li>Verdipapirforetakenes sikringsfond</li>
							<li>Finansnæringens fellesorganisasjon (Finans Norge)</li>
							<li>Den norske Revisorforening</li>
						</ul>
					</div>
					<div class="bg-gray-50 p-8 rounded-2xl">
						<h3 class="text-base font-semibold leading-7 text-gray-900">
							Bærekraft og samfunnsansvar
						</h3>
						<p class="mt-4 text-sm leading-6 text-gray-600">
							Vi er forpliktet til bærekraftig bankdrift og følger:
						</p>
						<ul class="mt-4 text-sm leading-6 text-gray-600 list-disc pl-5 space-y-2">
							<li>FNs prinsipper for bærekraftig bankdrift</li>
							<li>EUs taksonomi for bærekraftig finans</li>
							<li>Norske retningslinjer for bærekraftig finans</li>
							<li>Paris-avtalen og klimamål</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">HavBank i tall</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600">
				Vi er stolte av vår posisjon som en ledende norsk bank og vår evne til å betjene et stort
				antall kunder.
			</p>
		</div>
		<dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
			{#each stats as stat}
				<div class="flex flex-col-reverse gap-y-3">
					<dt class="text-base leading-7 text-gray-600">{stat.name}</dt>
					<dd class="text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
				</div>
			{/each}
		</dl>
	</div>

	<div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8 pb-24 sm:pb-32">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Bli en del av HavBank
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600">
				Vi er alltid på utkikk etter dyktige medarbeidere som deler våre verdier og ønsker å bidra til
				vår videre utvikling.
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a
					href="/karriere"
					class="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
				>
					Se ledige stillinger
				</a>
				<a href="/kontakt" class="text-sm font-semibold leading-6 text-gray-900">
					Kontakt oss <span aria-hidden="true">→</span>
				</a>
			</div>
		</div>
	</div>
</div> 