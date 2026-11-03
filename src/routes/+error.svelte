<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} | HavBank.net</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="page-container py-24">
	<p class="text-4xl font-bold text-gray-900 dark:text-white">{$page.status}</p>
	<h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
		{$page.status === 404 ? 'Siden finnes ikke' : 'Det oppstod en feil'}
	</h1>
	<a href="/" class="btn-primary mt-8 inline-flex">Gå til forsiden</a>
</main>
