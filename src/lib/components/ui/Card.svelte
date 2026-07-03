<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type CardVariant = 'soft' | 'elevated' | 'flat';

	/**
	 * Reusable card wrapper.
	 *
	 *   soft     — gray-50 bg, rounded-lg, p-6  (workhorse product card)
	 *   elevated — white bg, ring-1, shadow      (metric / data card)
	 *   flat     — transparent, border only       (lightweight list item)
	 */
	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		variant?: CardVariant;
		/** Extra classes (e.g. 'mt-4', 'hover:scale-105'). */
		class?: string;
		children?: Snippet;
	}

	let { variant = 'soft', class: extraClass = '', children, ...rest }: Props = $props();

	const variantClasses = {
		soft: 'card-soft',
		elevated: 'card-elevated',
		flat: 'rounded-lg border border-gray-200 p-6 dark:border-gray-700'
	};

	const className = $derived(`${variantClasses[variant]} ${extraClass}`);
</script>

<div class={className} {...rest}>
	{@render children?.()}
</div>
