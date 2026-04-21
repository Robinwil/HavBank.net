<script>
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	const demoAlert =
		'Dette er en fiktiv nettside laget for utdanningsformål. Ingen reelle banktjenester tilbys.';

	let formData = $state({
		companyForm: 'as',
		orgnr: '',
		companyName: '',
		contactName: '',
		contactEmail: '',
		contactPhone: '',
		employees: '1-10',
		topic: 'konto',
		message: '',
		acceptTerms: false
	});

	let submitting = $state(false);

	const steps = [
		{
			number: '1',
			title: 'Signer med BankID',
			description:
				'Signaturberettiget logger inn med BankID og bekrefter opplysninger fra Brønnøysundregisteret.',
			icon: 'heroicons:identification'
		},
		{
			number: '2',
			title: 'Dokumentasjon',
			description:
				'Vi henter organisasjonsinformasjon automatisk. Du legger til kontoinformasjon, UBO-erklæring og eventuelle fullmakter.',
			icon: 'heroicons:document-text'
		},
		{
			number: '3',
			title: 'Konto aktivert',
			description:
				'Bedriftskonto er klar til bruk innen 1 virkedag. Du får tilgang til nettbank, kort og betalingsløsninger.',
			icon: 'heroicons:check-badge'
		}
	];

	const requirements = [
		{
			title: 'Organisasjonsnummer',
			description:
				'Foretaket må være registrert i Brønnøysundregisteret (Foretaksregisteret eller Enhetsregisteret).',
			icon: 'heroicons:building-office-2'
		},
		{
			title: 'BankID for signaturberettiget',
			description:
				'Personer med signaturrett må identifiseres med BankID på mobil eller kodebrikke.',
			icon: 'heroicons:finger-print'
		},
		{
			title: 'UBO- og PEP-erklæring',
			description:
				'Oversikt over reelle rettighetshavere (UBO) og politisk eksponerte personer (PEP), i henhold til hvitvaskingsloven.',
			icon: 'heroicons:users'
		},
		{
			title: 'Kontoinformasjon fra gammel bank',
			description:
				'Vi hjelper med automatisk overføring av avtalegiro, eFaktura og lønnsutbetalinger — du trenger bare kontonummeret.',
			icon: 'heroicons:arrow-path'
		}
	];

	const segments = [
		{
			name: 'Enkeltpersonforetak',
			description:
				'For selvstendig næringsdrivende. Åpne konto direkte med BankID — ingen fysisk dokumentasjon.',
			features: ['Digital onboarding', 'Kontoen er klar samme dag', 'Ingen startgebyr'],
			icon: 'heroicons:user',
			cta: 'Kom i gang'
		},
		{
			name: 'AS (0–10 ansatte)',
			description:
				'For små og mellomstore aksjeselskaper. Standard bedriftspakke med nettbank og betalingskort.',
			features: ['Nettbank med roller', 'Integrert regnskap (Tripletex, Fiken, Visma)', 'Vipps Bedrift'],
			icon: 'heroicons:briefcase',
			cta: 'Kom i gang'
		},
		{
			name: 'Større AS og konsern',
			description:
				'For selskaper med avanserte behov innen cash management, valuta og finansiering.',
			features: ['Dedikert kundeansvarlig', 'Cash pooling', 'SWIFT og internasjonale betalinger'],
			icon: 'heroicons:building-library',
			cta: 'Be om tilbud'
		},
		{
			name: 'Ideelle organisasjoner',
			description:
				'For stiftelser, foreninger og frivillige organisasjoner. Reduserte gebyrer og tilpasset rapportering.',
			features: ['Gratis bedriftskonto', 'Vipps for innsamling', 'Rapportering til styret'],
			icon: 'heroicons:heart',
			cta: 'Kom i gang'
		}
	];

	const pricing = [
		{ label: 'Opprettelse av bedriftskonto', value: 'Gratis' },
		{ label: 'Månedsgebyr standard bedriftskonto', value: 'kr 79 / mnd' },
		{ label: 'Inngående betaling (innland)', value: 'Gratis' },
		{ label: 'Utgående betaling (innland)', value: 'kr 2,50' },
		{ label: 'SEPA-betaling', value: 'kr 15' },
		{ label: 'Bedriftskort (Visa Business)', value: 'kr 450 / år' }
	];

	function handleSubmit(event) {
		event.preventDefault();
		if (!formData.acceptTerms) return;
		submitting = true;
		setTimeout(() => {
			submitting = false;
			alert(demoAlert);
		}, 300);
	}
</script>

<svelte:head>
	<title>Bli bedriftskunde – HavBank | Digital onboarding på 1 virkedag</title>
	<meta
		name="description"
		content="Åpne bedriftskonto i HavBank med full digital onboarding via BankID. Gratis opprettelse, månedsgebyr fra kr 79, klar til bruk på én virkedag."
	/>
	<meta property="og:title" content="Bli bedriftskunde – HavBank" />
	<meta
		property="og:description"
		content="Åpne bedriftskonto i HavBank med full digital onboarding via BankID. Klar til bruk på én virkedag."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/bedrift/bli-kunde" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero -->
	<div class="relative isolate overflow-hidden">
		<div class="page-container py-24 sm:py-32">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<p class="section-eyebrow">For næringsdrivende</p>
				<h1 class="page-title mt-2">Bli bedriftskunde i HavBank</h1>
				<p class="page-lead">
					Åpne bedriftskonto på 1 virkedag. Full digital onboarding med BankID for
					enkeltpersonforetak, aksjeselskap og ideelle organisasjoner.
				</p>
				<div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
					<a href="#soknad" class="btn-primary">Start søknad</a>
					<a href="/bestill-time?tema=bedrift" class="btn-secondary">
						Snakk med rådgiver <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- 3-step process -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Slik åpner du bedriftskonto</h2>
			<p class="section-lead">
				Digital prosess uten papir. De fleste er ferdige innen 15 minutter.
			</p>
		</div>
		<div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
			{#each steps as step}
				<div class="card-soft flex flex-col">
					<div class="flex items-center gap-x-4">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-900 text-sm font-semibold text-white dark:bg-blue-800"
						>
							{step.number}
						</div>
						{#if browser && Icon}
							<Icon
								icon={step.icon}
								class="h-6 w-6 text-blue-900 dark:text-blue-400"
							/>
						{/if}
					</div>
					<h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
					<p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{step.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Requirements -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Dette trenger du</h2>
			<p class="section-lead">
				Vi følger norsk hvitvaskingslov og henter informasjon fra offentlige registre der det er
				mulig.
			</p>
		</div>
		<div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:max-w-none">
			{#each requirements as req}
				<div class="flex gap-x-4">
					<div class="icon-box">
						{#if browser && Icon}
							<Icon icon={req.icon} class="h-6 w-6 text-white" />
						{/if}
					</div>
					<div>
						<h3 class="text-base font-semibold text-gray-900 dark:text-white">{req.title}</h3>
						<p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
							{req.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Segments -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Velg type virksomhet</h2>
			<p class="section-lead">
				Vi tilpasser onboardingen etter selskapsform og størrelse.
			</p>
		</div>
		<div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none">
			{#each segments as segment}
				<div class="card-elevated flex flex-col">
					<div class="flex items-center gap-x-3">
						{#if browser && Icon}
							<Icon
								icon={segment.icon}
								class="h-8 w-8 text-blue-900 dark:text-blue-400"
							/>
						{/if}
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{segment.name}</h3>
					</div>
					<p class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
						{segment.description}
					</p>
					<ul role="list" class="mt-6 space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
						{#each segment.features as feature}
							<li class="flex gap-x-2">
								{#if browser && Icon}
									<Icon
										icon="heroicons:check"
										class="h-5 w-5 flex-none text-blue-900 dark:text-blue-400"
									/>
								{/if}
								{feature}
							</li>
						{/each}
					</ul>
					<a href="#soknad" class="btn-secondary mt-6">
						{segment.cta} <span aria-hidden="true">→</span>
					</a>
				</div>
			{/each}
		</div>
	</div>

	<!-- Pricing -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="section-title">Åpnings- og månedskostnader</h2>
			<p class="section-lead">
				Priseksempel for standard bedriftskonto. Se full prisliste for spesialtilpassede løsninger.
			</p>
		</div>
		<div class="mx-auto mt-12 max-w-3xl">
			<div class="card-elevated">
				<dl class="divide-y divide-gray-200 dark:divide-gray-700">
					{#each pricing as row}
						<div class="flex justify-between py-4 text-sm">
							<dt class="text-gray-700 dark:text-gray-300">{row.label}</dt>
							<dd class="font-semibold text-gray-900 dark:text-white">{row.value}</dd>
						</div>
					{/each}
				</dl>
			</div>
			<p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
				Priser per 1. januar 2026. Vilkår og gebyrer kan endres. Se
				<a
					href="/bedrift/konto"
					class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400"
					>bedriftskonto-siden</a
				>
				for fullstendig oversikt.
			</p>
		</div>
	</div>

	<!-- Compliance callout -->
	<div class="page-container mb-24">
		<div class="mx-auto max-w-3xl rounded-md border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/10 p-6">
			<div class="flex gap-x-3">
				<div class="flex-shrink-0">
					{#if browser && Icon}
						<Icon
							icon="heroicons:shield-check"
							class="h-6 w-6 text-blue-900 dark:text-blue-400"
						/>
					{/if}
				</div>
				<div>
					<h2 class="text-base font-semibold text-blue-900 dark:text-blue-200">
						Dette spør vi om — og hvorfor
					</h2>
					<p class="mt-2 text-sm leading-6 text-blue-900/80 dark:text-blue-100">
						Som norsk bank er vi pålagt å kjenne kundene våre (KYC) og identifisere reelle
						rettighetshavere (UBO) i henhold til hvitvaskingsloven. Derfor stiller vi spørsmål om
						eierstruktur, planlagt omsetning, betalingsmønster og formålet med bedriftskontoen.
						Opplysningene lagres sikkert og deles kun med myndigheter når loven krever det.
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Application form -->
	<div id="soknad" class="page-container mb-24 scroll-mt-24">
		<div class="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<h2 class="section-title">Send forespørsel</h2>
				<p class="mt-4 text-base text-gray-600 dark:text-gray-300">
					Skjemaet er illustrativt. I en reell tjeneste ville du signert med BankID og fått
					tilbakemelding umiddelbart.
				</p>

				<form class="mt-10 space-y-6" onsubmit={handleSubmit}>
					<div>
						<label
							for="companyForm"
							class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>Selskapsform</label
						>
						<div class="mt-2">
							<select
								id="companyForm"
								bind:value={formData.companyForm}
								required
								class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							>
								<option value="enk">Enkeltpersonforetak</option>
								<option value="as">Aksjeselskap (AS)</option>
								<option value="asa">Allmennaksjeselskap (ASA)</option>
								<option value="ans">Ansvarlig selskap (ANS/DA)</option>
								<option value="ideell">Ideell organisasjon</option>
							</select>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label
								for="orgnr"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Organisasjonsnummer</label
							>
							<input
								id="orgnr"
								type="text"
								inputmode="numeric"
								pattern="[0-9 ]{9,11}"
								maxlength="11"
								placeholder="123 456 789"
								bind:value={formData.orgnr}
								required
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							/>
						</div>
						<div>
							<label
								for="companyName"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Foretaksnavn</label
							>
							<input
								id="companyName"
								type="text"
								bind:value={formData.companyName}
								required
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label
								for="contactName"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Kontaktperson</label
							>
							<input
								id="contactName"
								type="text"
								bind:value={formData.contactName}
								required
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							/>
						</div>
						<div>
							<label
								for="employees"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Antall ansatte</label
							>
							<select
								id="employees"
								bind:value={formData.employees}
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							>
								<option value="0">Ingen ansatte</option>
								<option value="1-10">1–10</option>
								<option value="11-50">11–50</option>
								<option value="51-250">51–250</option>
								<option value="250+">Over 250</option>
							</select>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label
								for="contactEmail"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>E-post</label
							>
							<input
								id="contactEmail"
								type="email"
								bind:value={formData.contactEmail}
								required
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							/>
						</div>
						<div>
							<label
								for="contactPhone"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Telefon</label
							>
							<input
								id="contactPhone"
								type="tel"
								bind:value={formData.contactPhone}
								required
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
							/>
						</div>
					</div>

					<div>
						<label
							for="topic"
							class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>Hva trenger dere først?</label
						>
						<select
							id="topic"
							bind:value={formData.topic}
							class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
						>
							<option value="konto">Bedriftskonto og dagligbank</option>
							<option value="finansiering">Finansiering</option>
							<option value="cash">Cash management</option>
							<option value="valuta">Valuta og internasjonal handel</option>
							<option value="pensjon">Pensjon og forsikring</option>
						</select>
					</div>

					<div>
						<label
							for="message"
							class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>Kort om bedriften (valgfritt)</label
						>
						<textarea
							id="message"
							rows="4"
							bind:value={formData.message}
							class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
						></textarea>
					</div>

					<div class="flex items-start">
						<input
							id="acceptTerms"
							type="checkbox"
							bind:checked={formData.acceptTerms}
							required
							class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
						/>
						<label
							for="acceptTerms"
							class="ml-3 text-sm text-gray-700 dark:text-gray-300"
						>
							Jeg bekrefter at opplysningene over er korrekte og samtykker til at HavBank kan
							behandle dem i henhold til
							<a
								href="/personvern"
								class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400"
								>personvernerklæringen</a
							>.
						</label>
					</div>

					<button
						type="submit"
						disabled={submitting}
						class="btn-primary w-full justify-center"
					>
						{submitting ? 'Sender …' : 'Send forespørsel'}
					</button>
				</form>
			</div>

			<aside class="lg:pl-4">
				<div class="sticky top-8 space-y-6">
					<div class="card-soft">
						<h3 class="text-base font-semibold text-gray-900 dark:text-white">Rask respons</h3>
						<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
							Vi tar kontakt innen neste virkedag. For hastesaker, ring
							<a
								href="tel:+4700000000"
								class="font-medium text-blue-900 hover:text-blue-800 dark:text-blue-400"
								>+47 00 00 00 00</a
							>.
						</p>
					</div>

					<div class="card-soft">
						<h3 class="text-base font-semibold text-gray-900 dark:text-white">Er dere flere banker?</h3>
						<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
							Vi hjelper med flytting av faste betalinger, avtalegiro og lønnsutbetalinger, slik
							at overgangen blir smertefri.
						</p>
					</div>
				</div>
			</aside>
		</div>
	</div>

	<!-- Trust footer -->
	<div class="page-container">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8 space-y-3">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				HavBank AS (org.nr. 924 850 771) er under tilsyn av Finanstilsynet. Innskudd på
				bedriftskonto er dekket av Bankenes sikringsfond med inntil kr 2 000 000 per innskyter per
				bank. HavBank er ISO/IEC 27001-sertifisert, og alle pålogginger skjer med BankID og
				to-faktor autentisering.
			</p>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Åpning av bedriftskonto forutsetter godkjent KYC-kontroll i henhold til hvitvaskingsloven
				(lov av 1. juni 2018 nr. 23). Vilkår og priser er veiledende og kan endres i henhold til
				markedsforhold og bankens retningslinjer.
			</p>
		</div>
	</div>
</div>
