<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let Icon;

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.Icon;
	});

	// Generate breadcrumbs from current path
	$: path = $page.url.pathname;
	$: breadcrumbs = path
		.split('/')
		.filter(Boolean)
		.map((segment, index, array) => {
			const href = '/' + array.slice(0, index + 1).join('/');
			const name = segment
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');
			return { name, href };
		});
</script>
