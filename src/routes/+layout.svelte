<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import DisclaimerModal from '$lib/components/DisclaimerModal.svelte';
	import DemoNoticeToast from '$lib/components/DemoNoticeToast.svelte';
	import SecurityContactDialog from '$lib/components/SecurityContactDialog.svelte';
	import Icon from '@iconify/svelte';
	import '../lib/icons.js';  // Import offline icons configuration
	
	let { children } = $props();
	
	let isMenuOpen = $state(false);
	let isThemeMenuOpen = $state(false);
	let themePreference = $state('system');
	let isDarkMode = $state(false);
	let isScrolling = $state(false);
	
	const THEME_STORAGE_KEY = 'havbank-theme';
	
	let previousPath = $state('');
	
	$effect(() => {
		if (browser && previousPath !== $page.url.pathname) {
			if (previousPath !== '') {
				isScrolling = true;
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setTimeout(() => {
					isScrolling = false;
				}, 500);
			}
			previousPath = $page.url.pathname;
		}
	});

	afterNavigate(() => {
		isMenuOpen = false;
		isThemeMenuOpen = false;
	});

	// Lock body scroll while the mobile menu overlay is open so the page
	// underneath doesn't scroll behind the sheet on touch devices.
	$effect(() => {
		if (isMenuOpen) {
			const previous = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = previous;
			};
		}
	});
	
	const themeOptions = [
		{ value: 'system', label: 'System', icon: 'heroicons:computer-desktop' },
		{ value: 'light', label: 'Lyst', icon: 'heroicons:sun' },
		{ value: 'dark', label: 'Mørkt', icon: 'heroicons:moon' }
	];
	
	const navigation = [
		{ name: 'Hjem', href: '/' },
		{ name: 'Privat', href: '/privat' },
		{ name: 'Bedrift', href: '/bedrift' },
		{ name: 'Om oss', href: '/om-oss' }
	];

	function resolveTheme(theme = themePreference) {
		if (!browser) return false;
		if (theme === 'dark') return true;
		if (theme === 'light') return false;
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	function applyTheme(theme = themePreference) {
		if (!browser) return;
		isDarkMode = resolveTheme(theme);
		document.documentElement.classList.toggle('dark', isDarkMode);
		document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
	}

	function setTheme(theme) {
		themePreference = theme;
		isThemeMenuOpen = false;
		if (browser) {
			if (theme === 'system') {
				localStorage.removeItem(THEME_STORAGE_KEY);
			} else {
				localStorage.setItem(THEME_STORAGE_KEY, theme);
			}
		}
		applyTheme(theme);
	}

	function getThemeLabel(theme = themePreference) {
		return themeOptions.find((option) => option.value === theme)?.label ?? 'System';
	}

	function getThemeIcon(theme = themePreference) {
		return themeOptions.find((option) => option.value === theme)?.icon ?? 'heroicons:computer-desktop';
	}

	onMount(() => {
		if (!browser) return;

		const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
		themePreference = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'system';
		applyTheme(themePreference);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleSystemThemeChange = () => {
			if (themePreference === 'system') {
				applyTheme('system');
			}
		};

		if (typeof mediaQuery.addEventListener === 'function') {
			mediaQuery.addEventListener('change', handleSystemThemeChange);
		} else {
			mediaQuery.addListener(handleSystemThemeChange);
		}

		return () => {
			if (typeof mediaQuery.removeEventListener === 'function') {
				mediaQuery.removeEventListener('change', handleSystemThemeChange);
			} else {
				mediaQuery.removeListener(handleSystemThemeChange);
			}
		};
	});

	// Handle keyboard navigation
	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			isMenuOpen = false;
			isThemeMenuOpen = false;
		}
	}
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content={isDarkMode ? '#111827' : '#1e3a8a'} />
	<meta name="color-scheme" content="light dark" />
	<meta name="author" content="HavBank" />

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

<svelte:window onkeydown={handleKeyDown} />

<DisclaimerModal />
<DemoNoticeToast />
<SecurityContactDialog />

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
				<div class="hidden md:flex md:gap-x-8">
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
				<div class="flex items-center gap-x-2 sm:gap-x-4">
					<!-- Theme Selector -->
					<div class="relative">
						<button
							type="button"
							class="flex items-center gap-x-2 rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
							onclick={() => {
								isThemeMenuOpen = !isThemeMenuOpen;
								isMenuOpen = false;
							}}
							aria-label={`Velg tema. Aktivt tema: ${getThemeLabel()}`}
							aria-expanded={isThemeMenuOpen}
							aria-haspopup="true"
							title={`Aktivt tema: ${getThemeLabel()}`}
						>
							{#if browser && Icon}
								<Icon icon={getThemeIcon()} class="h-5 w-5" />
							{/if}
							<span class="hidden sm:inline-block">{getThemeLabel()}</span>
							{#if browser && Icon}
								<Icon icon="heroicons:chevron-down" class="h-4 w-4" />
							{/if}
						</button>

						{#if isThemeMenuOpen}
							<div
								class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
							>
								{#each themeOptions as option}
									<button
										type="button"
										class={cn(
											"flex w-full items-center gap-x-2 px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700",
											themePreference === option.value
												? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
												: "text-gray-700 dark:text-gray-300"
										)}
										role="menuitemradio"
										aria-checked={themePreference === option.value}
										onclick={() => setTheme(option.value)}
									>
										{#if browser && Icon}
											<Icon icon={option.icon} class="h-4 w-4" />
										{/if}
										<span>{option.label}</span>
									</button>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Login Button -->
					<a
						href="/login"
						class="hidden md:inline-flex btn-primary"
						aria-label="Logg inn på nettbank"
					>
						Logg inn
					</a>

					<!-- Mobile Menu Button -->
					<button
						type="button"
						class="md:hidden rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
						onclick={() => {
							isMenuOpen = !isMenuOpen;
							isThemeMenuOpen = false;
						}}
						aria-expanded={isMenuOpen}
						aria-controls="mobile-menu"
						aria-label={isMenuOpen ? 'Lukk meny' : 'Åpne meny'}
					>
						{#if browser && Icon}
							<Icon
								icon={isMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'}
								width="24"
								height="24"
								class="text-gray-700 dark:text-gray-300"
							/>
						{/if}
					</button>
				</div>
			</div>
		</nav>
	</header>

	<!-- Mobile Menu Overlay -->
	{#if isMenuOpen}
		<button
			type="button"
			class="md:hidden fixed inset-0 top-16 z-40 bg-gray-900/40 backdrop-blur-sm"
			aria-label="Lukk meny"
			onclick={() => (isMenuOpen = false)}
		></button>
		<div
			class="md:hidden fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800"
			id="mobile-menu"
		>
			<nav class="space-y-1 px-4 py-4" aria-label="Mobilnavigasjon">
				{#each navigation as item}
					<a
						href={item.href}
						class={cn(
							'block rounded-md px-3 py-3 text-base font-medium',
							$page.url.pathname === item.href
								? 'bg-blue-50 text-blue-900 dark:bg-blue-900/10 dark:text-blue-100'
								: 'text-gray-700 hover:bg-gray-50 hover:text-blue-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-100'
						)}
						aria-current={$page.url.pathname === item.href ? 'page' : undefined}
					>
						{item.name}
					</a>
				{/each}
				<a href="/login" class="btn-primary w-full mt-2">
					Logg inn
				</a>
			</nav>
		</div>
	{/if}

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
		<div class="page-container py-12 sm:py-16">
			<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5">
				
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
						<li>
							<a href="/om-prosjektet" class="text-sm leading-6 text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-red-200 font-medium">
								Om prosjektet (ikke en ekte bank)
							</a>
						</li>
					</ul>
				</div>

				<!-- Contact -->
				<div class="sm:col-span-2 lg:col-span-1 border-t border-gray-900/10 dark:border-gray-100/10 pt-8 sm:border-t-0 sm:pt-0">
					<h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Kontakt oss</h3>
					<ul role="list" class="mt-6 space-y-4">
						<li class="text-sm leading-6 text-gray-600 dark:text-gray-400">
							Telefon: +47 00 00 00 00
						</li>
						<li class="text-sm leading-6 text-gray-600 dark:text-gray-400">
							Åpningstider: 07:00–23:00
						</li>
						<li>
							<a href="/bestill-time" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
								Bestill rådgivning
							</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- Sitewide disclosure banner: HavBank is a fictitious hobby project. -->
			<div
				class="mt-10 sm:mt-16 rounded-lg border border-red-300 dark:border-red-900/70 bg-red-50 dark:bg-red-950/40 px-4 py-4 sm:px-6 sm:py-5"
				role="note"
				aria-label="Viktig informasjon om HavBank"
			>
				<p class="text-sm leading-6 text-red-900 dark:text-red-100">
					<strong class="font-semibold">HavBank er ikke en ekte bank.</strong>
					Nettsiden er et fiktivt hobbyprosjekt uten konsesjon fra Finanstilsynet, uten
					organisasjonsnummer og uten reelle banktjenester.
					<a
						href="/om-prosjektet"
						class="font-semibold underline underline-offset-4 decoration-2 hover:text-red-800 dark:hover:text-red-200"
					>
						Les hele redegjørelsen på «Om prosjektet»
					</a>
					· <a
						href="https://www.finanstilsynet.no/nyhetsarkiv/nyheter/2026/finanstilsynet-advarer-mot-havbank/"
						target="_blank"
						rel="noopener noreferrer"
						class="underline underline-offset-4 decoration-2 hover:text-red-800 dark:hover:text-red-200"
					>
						Finanstilsynets advarsel (6. mars 2026)
					</a>
				</p>
			</div>

			<div class="mt-6 border-t border-gray-900/10 dark:border-gray-100/10 pt-6">
				<p class="text-xs leading-5 text-gray-500 dark:text-gray-400">
					Hobbyprosjekt · Ikke en juridisk enhet · Ingen organisasjonsnummer, ikke registrert i
					Brønnøysundregisteret. Kildekoden er et personlig designprosjekt.
				</p>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
	}

	main {
		will-change: opacity;
	}

	main.opacity-90 {
		transition: opacity 0.5s ease-in-out;
	}
</style>
