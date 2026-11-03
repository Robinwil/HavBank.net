<script lang="ts">
	import type { Snippet } from 'svelte';
	import SecurityContactDialog from '$lib/components/SecurityContactDialog.svelte';
	import '$lib/icons.js'; // Offline icons: the CSP blocks the Iconify API

	let { children }: { children: Snippet } = $props();
</script>

<SecurityContactDialog />

<div class="min-h-screen bg-white dark:bg-gray-900">
	<header class="page-container pt-6">
		<a href="/" class="font-semibold text-gray-900 hover:underline dark:text-white">HavBank.net</a>
	</header>
	{@render children()}
</div>
