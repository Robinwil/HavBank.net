<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let Icon = $state(null);

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.default;
	});

	const contactMethods = [
		{
			title: 'Ring oss',
			description: 'Vi er tilgjengelige hverdager 07-24',
			value: '+00 000 00 000',
			icon: 'heroicons:phone',
			action: 'Ring nå',
			href: 'tel:91504800'
		},
		{
			title: 'Chat med oss',
			description: 'Få rask hjelp via chat',
			value: 'Start chat',
			icon: 'heroicons:chat-bubble-left-right',
			action: 'Start chat',
			href: '#chat'
		},
		{
			title: 'Send e-post',
			description: 'Vi svarer innen 24 timer',
			value: 'post@havbank.no',
			icon: 'heroicons:envelope',
			action: 'Send e-post',
			href: 'mailto:post@havbank.no'
		}
	];

	const offices = [
		{
			city: 'Oslo',
			address: 'Karl Johans gate 7',
			postal: '0154 Oslo',
			hours: 'Man-Fre: 09-16',
			phone: '+00 000 00 000',
			image: '/images/oslo-office.jpg'
		},
		{
			city: 'Bergen',
			address: 'Torgallmenningen 2',
			postal: '5003 Bergen',
			hours: 'Man-Fre: 09-16',
			phone: '+00 000 00 000',
			image: '/images/bergen-office.jpg'
		},
		{
			city: 'Trondheim',
			address: 'Kongens gate 11',
			postal: '7013 Trondheim',
			hours: 'Man-Fre: 09-16',
			phone: '+00 000 00 000',
			image: '/images/trondheim-office.jpg'
		}
	];

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let category = $state('general');
	let isSubmitting = $state(false);

	async function handleSubmit() {
		isSubmitting = true;
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000));
		// Reset form
		name = '';
		email = '';
		phone = '';
		message = '';
		category = 'general';
		isSubmitting = false;
		alert('Takk for din henvendelse! Vi vil kontakte deg snart.');
	}
</script>

<svelte:head>
	<title>Kontakt oss | HavBank - Vi er her for å hjelpe</title>
	<meta
		name="description"
		content="Kontakt HavBank på telefon, chat eller e-post. Vi er tilgjengelige for å hjelpe deg med dine bankbehov."
	/>
	<meta name="keywords" content="kontakt, kundeservice, bank, åpningstider, telefon, chat, e-post, norge" />
	<meta property="og:title" content="Kontakt oss | HavBank" />
	<meta
		property="og:description"
		content="Vi er her for å hjelpe deg med dine bankbehov. Kontakt oss på telefon, chat eller e-post."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://havbank.no/kontakt" />
</svelte:head>

<div class="bg-white dark:bg-gray-900">
	<!-- Hero Section -->
	<div class="relative isolate overflow-hidden">
		<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
					Vi er her for å hjelpe
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					Trenger du hjelp? Vi er tilgjengelige døgnet rundt for å hjelpe deg med dine bankbehov.
					Velg den kontaktmetoden som passer deg best.
				</p>
			</div>
		</div>
	</div>

	<!-- Contact Methods Grid -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each contactMethods as method}
				<div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
					<div class="flex items-center gap-x-3 mb-4">
						{#if browser && Icon}
							<Icon icon={method.icon} class="h-6 w-6 text-blue-600" />
						{/if}
						<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{method.title}</h2>
					</div>
					<p class="text-gray-600 dark:text-gray-300 mb-6">{method.description}</p>
					<div class="mb-6">
						<span class="text-2xl font-bold text-gray-900 dark:text-white">{method.value}</span>
					</div>
					<a
						href={method.href}
						class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
					>
						{method.action}
					</a>
				</div>
			{/each}
		</div>
	</div>

	<!-- Contact Form Section -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div>
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send oss en melding</h2>
				<p class="text-gray-600 dark:text-gray-300 mb-8">
					Fyll ut skjemaet under, så vil vi kontakte deg så snart som mulig. Vi svarer normalt
					innen 24 timer på hverdager.
				</p>

				<form onsubmit={handleSubmit} class="space-y-6">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>Navn</label
						>
						<input
							type="text"
							id="name"
							bind:value={name}
							required
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						/>
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>E-post</label
						>
						<input
							type="email"
							id="email"
							bind:value={email}
							required
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						/>
					</div>

					<div>
						<label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>Telefon</label
						>
						<input
							type="tel"
							id="phone"
							bind:value={phone}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						/>
					</div>

					<div>
						<label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>Kategori</label
						>
						<select
							id="category"
							bind:value={category}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						>
							<option value="general">Generell henvendelse</option>
							<option value="account">Konto og kort</option>
							<option value="loan">Lån og kreditt</option>
							<option value="savings">Sparing og investering</option>
							<option value="technical">Teknisk support</option>
						</select>
					</div>

					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>Melding</label
						>
						<textarea
							id="message"
							bind:value={message}
							rows="4"
							required
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						></textarea>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? 'Sender...' : 'Send melding'}
					</button>
				</form>
			</div>

			<div class="lg:pl-8">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Våre kontorer</h2>
				<div class="space-y-8">
					{#each offices as office}
						<div class="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
							<div class="p-6">
								<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
									{office.city}
								</h3>
								<div class="space-y-2 text-gray-600 dark:text-gray-300">
									<p>{office.address}</p>
									<p>{office.postal}</p>
									<p>{office.hours}</p>
									<p>Tlf: {office.phone}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- FAQ Section -->
	<div class="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
		<div class="border-t border-gray-200 dark:border-gray-700 pt-8">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ofte stilte spørsmål</h2>
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Når er kundeservice åpent?
					</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Vår kundeservice er tilgjengelig på telefon hverdager fra 07:00 til 24:00. Chat og e-post
						besvares innen 24 timer på hverdager.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Hvordan sperrer jeg kortet mitt?
					</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Ring oss på +00 000 00 000 for øyeblikkelig sperring av kort. Dette nummeret er tilgjengelig
						24/7. Du kan også sperre kortet selv i mobilbanken.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Hvordan bestiller jeg ny BankID?
					</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Du kan bestille ny BankID ved å logge inn i nettbanken eller ved å kontakte kundeservice.
						Husk gyldig legitimasjon.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Hvor finner jeg kontonummer for innbetaling?
					</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Kontonummer for innbetaling av lån og andre tjenester finner du i nettbanken under "Mine
						produkter" eller ved å kontakte oss.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	input[type="text"],
	input[type="email"],
	input[type="tel"],
	select,
	textarea {
		@apply px-4 py-2;
	}

	textarea {
		@apply resize-none;
	}
</style> 