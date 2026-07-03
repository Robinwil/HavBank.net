<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type ButtonVariant = 'primary' | 'secondary' | 'white' | 'outline' | 'ghost';
	type ButtonSize = 'sm' | 'md' | 'lg';

	/**
	 * Reusable button / link component.
	 *
	 * Renders as <a> when `href` is provided, otherwise as <button>. `rest` is typed against the
	 * common `HTMLElement` attributes (rather than button- or anchor-specific ones) so the same
	 * spread works on either tag.
	 */
	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
		/** When set, renders an anchor tag. */
		href?: string;
		/** HTML button type. */
		type?: HTMLButtonAttributes['type'];
		variant?: ButtonVariant;
		size?: ButtonSize;
		/** Extra classes to merge. */
		class?: string;
		disabled?: boolean;
		children?: Snippet;
	}

	let {
		href = undefined,
		type = 'button',
		variant = 'primary',
		size = 'md',
		class: extraClass = '',
		disabled = false,
		children,
		...rest
	}: Props = $props();

	const sizeClasses = {
		sm: 'px-3 py-2 text-xs',
		md: 'px-4 py-2.5 text-sm',
		lg: 'px-6 py-3 text-base'
	};

	const variantClasses = {
		primary:
			'rounded-md bg-blue-900 text-white shadow-sm transition-colors ' +
			'hover:bg-blue-800 ' +
			'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ' +
			'dark:bg-blue-800 dark:hover:bg-blue-700',
		white:
			'rounded-md bg-white shadow-sm transition-colors ' +
			'hover:bg-gray-50 ' +
			'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
		outline:
			'rounded-md ring-1 ring-current transition-colors ' +
			'hover:bg-gray-50 dark:hover:bg-gray-800 ' +
			'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
		ghost: 'rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800',
		secondary: ''
	};

	const isInline = $derived(variant === 'secondary');

	const className = $derived(
		isInline
			? `inline-flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 transition-colors hover:text-blue-900 dark:text-gray-100 dark:hover:text-blue-400 ${extraClass}`
			: `inline-flex items-center justify-center font-semibold ${sizeClasses[size]} ${variantClasses[variant]} ${extraClass}`
	);
</script>

{#if href}
	<a {href} class={className} {...rest}>{@render children?.()}</a>
{:else}
	<button {type} {disabled} class={className} {...rest}>{@render children?.()}</button>
{/if}
