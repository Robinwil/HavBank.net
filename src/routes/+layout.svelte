<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Icon from '@iconify/svelte';
	import '../lib/icons.js';  // Import offline icons configuration
	
	let { children } = $props();
	
	let isMenuOpen = $state(false);
	let isLangMenuOpen = $state(false);
	let IconifyIcon = Icon;
	let isDarkMode = $state(false);
	let currentLang = $state('nb');
	let isScrolling = $state(false);
	
	// Track previous path for animation
	let previousPath = $state('');
	
	// Handle page transitions
	$effect(() => {
		if (browser && previousPath !== $page.url.pathname) {
			// Only animate if it's not the first load
			if (previousPath !== '') {
				isScrolling = true;
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setTimeout(() => {
					isScrolling = false;
				}, 500); // Match this with the CSS transition duration
			}
			previousPath = $page.url.pathname;
		}
	});
	
	const languages = [
		{ code: 'nb', name: 'Norsk bokmål' },
		{ code: 'en', name: 'English' }
	];
	
	const navigation = [
		{ name: 'Hjem', href: '/' },
		{ name: 'Privat', href: '/privat' },
		{ name: 'Bedrift', href: '/bedrift' },
		{ name: 'Sparing', href: '/sparing' },
		{ name: 'Om oss', href: '/om-oss' }
	];

	const footerNavigation = {
		tjenester: [
			{ name: 'Dagligbank', href: '/tjenester/dagligbank' },
			{ name: 'Lån', href: '/tjenester/lan' },
			{ name: 'Sparing', href: '/tjenester/sparing' },
			{ name: 'Forsikring', href: '/tjenester/forsikring' }
		],
		selskap: [
			{ name: 'Om oss', href: '/om-oss' },
			{ name: 'Karriere', href: '/karriere' },
			{ name: 'Bærekraft', href: '/baerekraft' },
			{ name: 'Investorrelasjoner', href: '/investorrelasjoner' }
		],
		hjelp: [
			{ name: 'Kundeservice', href: '/kontakt' },
			{ name: 'Sikkerhet', href: '/hjelp/sikkerhet' },
			{ name: 'Personvern', href: '/hjelp/personvern' },
			{ name: 'Tilgjengelighet', href: '/hjelp/tilgjengelighet' }
		]
	};

	onMount(async () => {

		// Check system dark mode preference
		if (browser) {
			isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			document.documentElement.classList.toggle('dark', isDarkMode);
		}
	});

	$effect(() => {
		if (browser) {
			document.documentElement.classList.toggle('dark', isDarkMode);
		}
	});

	// Handle keyboard navigation
	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			isMenuOpen = false;
			isLangMenuOpen = false;
		}
	}

	function switchLanguage(lang) {
		currentLang = lang;
		isLangMenuOpen = false;
	}
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#1e3a8a" />
	<meta name="author" content="HavBank" />
	 
	
	<!-- Security headers -->
	<meta http-equiv="Content-Security-Policy" content="
		default-src 'self'; 
		img-src 'self' data: https:; 
		script-src 'self' 'unsafe-inline';
		style-src 'self' 'unsafe-inline';
		connect-src 'self' https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com;
	" />
	<meta http-equiv="X-Content-Type-Options" content="nosniff" />
	
	<!-- Open Graph tags -->
	<meta property="og:site_name" content="HavBank" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="nb_NO" />
</svelte:head>

<!-- Skip to main content link -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-900 focus:text-white focus:rounded"
>
	Hopp til hovedinnhold
</a>

<svelte:window on:keydown={handleKeyDown} />

<div class="min-h-screen bg-white dark:bg-gray-900">
	<header class="bg-white dark:bg-gray-900 shadow-sm relative z-50">
		<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Hovednavigasjon">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<a 
						href="/" 
						class="flex items-center text-2xl font-bold text-blue-900 dark:text-blue-100 hover:text-blue-800 dark:hover:text-blue-200" 
						aria-label="HavBank hjemmeside"
					>
						{#if browser && Icon}
							<Icon icon="heroicons:building-library" class="inline-block w-8 h-8 mr-2" />
						{/if}
						HavBank
					</a>
				</div>
				<div class="hidden lg:flex lg:gap-x-8">
					{#each navigation as item}
						<a
							href={item.href}
							class={cn(
								"flex items-center text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800",
								$page.url.pathname === item.href
									? "text-blue-900 dark:text-blue-100 bg-blue-50 dark:bg-blue-900/10"
									: "text-gray-700 dark:text-gray-300"
							)}
							aria-current={$page.url.pathname === item.href ? 'page' : undefined}
						>
							{item.name}
						</a>
					{/each}
				</div>
				<div class="flex items-center gap-x-4">
					<!-- Language Switcher -->
					<div class="relative">
						<button
							type="button"
							class="flex items-center gap-x-2 rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
							onclick={() => (isLangMenuOpen = !isLangMenuOpen)}
							aria-expanded={isLangMenuOpen}
							aria-haspopup="true"
						>
							<span class="sr-only">Velg språk</span>
							{#if browser && Icon}
								<Icon icon="heroicons:language" class="h-5 w-5" />
							{/if}
							<span class="hidden sm:inline-block">{currentLang === 'nb' ? 'Norsk' : 'English'}</span>
							{#if browser && Icon}
								<Icon icon="heroicons:chevron-down" class="h-4 w-4" />
							{/if}
						</button>

						{#if isLangMenuOpen}
							<div
								class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="language-menu-button"
							>
								{#each languages as lang}
									<button
										class={cn(
											"block w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700",
											currentLang === lang.code
												? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
												: "text-gray-700 dark:text-gray-300"
										)}
										role="menuitem"
										onclick={() => switchLanguage(lang.code)}
									>
										{lang.name}
									</button>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Dark Mode Toggle -->
					<button
						type="button"
						class="rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
						onclick={() => (isDarkMode = !isDarkMode)}
						aria-label={isDarkMode ? 'Bytt til lyst tema' : 'Bytt til mørkt tema'}
					>
						{#if browser && Icon}
							<Icon icon={isDarkMode ? 'heroicons:sun' : 'heroicons:moon'} class="h-5 w-5" />
						{/if}
					</button>

					<!-- Login Button -->
					<a
						href="/login"
						class="hidden lg:inline-flex items-center justify-center rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-800 dark:hover:bg-blue-700"
						aria-label="Logg inn på nettbank"
					>
						Logg inn
					</a>

					<!-- Mobile Menu Button -->
					<button
						type="button"
						class="lg:hidden rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
						onclick={() => (isMenuOpen = !isMenuOpen)}
						aria-expanded={isMenuOpen}
						aria-controls="mobile-menu"
						aria-label="Åpne meny"
					>
						{#if isMenuOpen}
							{#if browser && Icon}
								<Icon icon="heroicons:x-mark" width="24" height="24" class="text-gray-700 dark:text-gray-300" />
							{/if}
						{:else}
							{#if browser && Icon}
								<Icon icon="heroicons:bars-3" width="24" height="24" class="text-gray-700 dark:text-gray-300" />
							{/if}
						{/if}
					</button>
				</div>
			</div>

			<!-- Mobile Menu -->
			{#if isMenuOpen}
				<div class="lg:hidden absolute inset-x-0 top-16 bg-white dark:bg-gray-900 shadow-lg" id="mobile-menu">
					<div class="space-y-1 px-2 pb-3 pt-2">
						{#each navigation as item}
							<a
								href={item.href}
								class={cn(
									"block rounded-md px-3 py-2 text-base font-medium",
									$page.url.pathname === item.href
										? "bg-blue-50 text-blue-900 dark:bg-blue-900/10 dark:text-blue-100"
										: "text-gray-700 hover:bg-gray-50 hover:text-blue-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-100"
								)}
								aria-current={$page.url.pathname === item.href ? 'page' : undefined}
							>
								{item.name}
							</a>
						{/each}
						<a
							href="/login"
							class="block w-full rounded-md bg-blue-900 px-3 py-2 text-base font-medium text-white hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700"
						>
							Logg inn
						</a>
					</div>
				</div>
			{/if}
		</nav>
	</header>

	<main 
		id="main-content" 
		class="min-h-[calc(100vh-4rem)] transition-opacity duration-500 ease-in-out"
		class:opacity-90={isScrolling}
	>
		{#if $page.url.pathname !== '/'}
			<Breadcrumb />
		{/if}
		{@render children()}
	</main>

	<footer class="bg-gray-50 dark:bg-gray-900">
		<div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-5">
				
				<!-- Privat -->
				<div class="lg:col-span-1">
					<h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Privat</h3>
					<ul role="list" class="mt-6 space-y-4">
						<li>
							<a href="/privat/boliglan" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Boliglån
							</a>
						</li>
						<li>
							<a href="/privat/sparing" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Sparing
							</a>
						</li>
						<li>
							<a href="/privat/kort" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Kort
							</a>
						</li>
						<li>
							<a href="/privat/forsikring" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Forsikring
							</a>
						</li>
					</ul>
				</div>

				<!-- Bedrift -->
				<div class="lg:col-span-1">
					<h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Bedrift</h3>
					<ul role="list" class="mt-6 space-y-4">
						<li>
							<a href="/bedrift/konto" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Bedriftskonto
							</a>
						</li>
						<li>
							<a href="/bedrift/finansiering" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Finansiering
							</a>
						</li>
						<li>
							<a href="/bedrift/cash-management" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Cash Management
							</a>
						</li>
						<li>
							<a href="/bedrift/valuta" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Valuta
							</a>
						</li>
					</ul>
				</div>

				<!-- Selskap -->
				<div class="lg:col-span-1">
					<h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Selskap</h3>
					<ul role="list" class="mt-6 space-y-4">
						<li>
							<a href="/om-oss" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Om oss
							</a>
						</li>
						<li>
							<a href="/karriere" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Karriere
							</a>
						</li>
						<li>
							<a href="/baerekraft" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Bærekraft
							</a>
						</li>
						<li>
							<a href="/investor" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Investorrelasjoner
							</a>
						</li>
					</ul>
				</div>

				<!-- Hjelp -->
				<div class="lg:col-span-1">
					<h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Hjelp</h3>
					<ul role="list" class="mt-6 space-y-4">
						<li>
							<a href="/kontakt" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Kundeservice
							</a>
						</li>
						<li>
							<a href="/sikkerhet" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Sikkerhet
							</a>
						</li>
						<li>
							<a href="/personvern" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Personvern
							</a>
						</li>
						<li>
							<a href="/tilgjengelighet" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Tilgjengelighet
							</a>
						</li>
					</ul>
				</div>

				<!-- Contact -->
				<div class="lg:col-span-1">
					<h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Kontakt oss</h3>
					<ul role="list" class="mt-6 space-y-4">
						<li class="text-sm leading-6 text-gray-600 dark:text-gray-400">
							Telefon: +00 000 00 000
						</li>
						<li class="text-sm leading-6 text-gray-600 dark:text-gray-400">
							Åpningstid: 07:00-24:00
						</li>
						<li>
							<a href="/bestill-time" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Bestill rådgivning
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="mt-16 border-t border-gray-900/10 dark:border-gray-100/10 pt-8">
				<p class="text-xs leading-5 text-gray-500 dark:text-gray-400">
					&copy; {new Date().getFullYear()} HavBank AS. Org.nr: +00 000 00 000. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
</div>

<style>
	/* Add smooth scrolling to the entire page */
	:global(html) {
		scroll-behavior: smooth;
		/* For Safari and mobile browsers */
		-webkit-overflow-scrolling: touch;
	}

	/* Add a subtle transform during scroll */
	main {
		will-change: opacity;
	}

	main.opacity-90 {
		transition: opacity 0.5s ease-in-out;
	}

	/* Ensure smooth animations on page load */
	:global(body) {
		animation: fadeIn 0.3s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0.9;
		}
		to {
			opacity: 1;
		}
	}
</style>
