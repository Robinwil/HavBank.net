<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	let IconifyIcon = Icon;
	
	// Debug logs
	$effect(() => {
		console.log('Browser:', browser);
		console.log('Icon:', Icon);
	});
</script>

<svelte:head>
	<title>{$page.status} - {$page.error?.message || 'Feil'} | HavBank</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-[50vh] bg-white dark:bg-gray-900 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
	<div class="mx-auto max-w-max">
		<main class="sm:flex">
			<p class="text-4xl font-bold tracking-tight text-blue-900 dark:text-blue-100 sm:text-5xl">
				{$page.status}
			</p>
			<div class="sm:ml-6">
				<div class="sm:border-l sm:border-gray-200 dark:border-gray-700 sm:pl-6">
					<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
						{#if $page.status === 404}
							Siden finnes ikke
						{:else}
							{$page.error?.message || 'Det oppstod en feil'}
						{/if}
					</h1>
					<p class="mt-4 text-base text-gray-500 dark:text-gray-400">
						{#if $page.status === 404}
							Beklager, vi kunne ikke finne siden du lette etter.
						{:else}
							Beklager, det oppstod en feil. Vennligst prøv igjen senere.
						{/if}
					</p>
				</div>
				<div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
					<a
						href="/"
						class="inline-flex items-center rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:bg-blue-800 dark:hover:bg-blue-700"
					>
						{#if browser && Icon}
							<Icon icon="heroicons:home" class="mr-2 h-5 w-5" />
						{/if}
						Gå til forsiden
					</a>
					<a
						href="/kontakt"
						class="inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
					>
						{#if browser && Icon}
							<Icon icon="heroicons:chat-bubble-left-ellipsis" class="mr-2 h-5 w-5" />
						{/if}
						Kontakt oss
					</a>
				</div>
			</div>
		</main>
	</div>
</div> 