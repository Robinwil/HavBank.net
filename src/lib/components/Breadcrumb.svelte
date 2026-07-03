<script lang="ts">
	import { page } from '$app/stores';
	// Pre-existing: this component has no markup at all (see below), so nothing declared in this
	// script is ever rendered or read. Flagging rather than fixing/removing to preserve behavior.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- see note above.
	let Icon: unknown;

	onMount(async () => {
		const module = await import('@iconify/svelte');
		// @ts-expect-error -- pre-existing bug: @iconify/svelte's module has no named `Icon` export
		// (only a default export), so this assignment is always undefined at runtime. `Icon` is
		// also never referenced anywhere in this component (it has no markup), so this is dead
		// code either way. Flagging rather than fixing to preserve behavior; see conversion report.
		Icon = module.Icon;
	});

	// Generate breadcrumbs from current path.
	// Pre-existing: this component is never given any markup (see note above `Icon`), so `path`
	// and `breadcrumbs` are computed but never rendered anywhere. Flagging rather than
	// fixing/removing to preserve behavior.
	let path = $derived($page.url.pathname);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- see note above.
	let breadcrumbs = $derived(
		path
			.split('/')
			.filter(Boolean)
			.map((segment, index, array) => {
				const href = '/' + array.slice(0, index + 1).join('/');
				const name = segment
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ');
				return { name, href };
			})
	);
</script>
