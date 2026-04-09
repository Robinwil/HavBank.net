<script>
	/**
	 * Reusable card wrapper.
	 *
	 * @prop {'soft'|'elevated'|'flat'} [variant='soft']
	 *   soft     — gray-50 bg, rounded-lg, p-6  (workhorse product card)
	 *   elevated — white bg, ring-1, shadow      (metric / data card)
	 *   flat     — transparent, border only       (lightweight list item)
	 * @prop {string} [class=''] - Extra classes (e.g. 'mt-4', 'hover:scale-105').
	 */
	let { variant = 'soft', class: extraClass = '', children, ...rest } = $props();

	const variantClasses = {
		soft: 'card-soft',
		elevated: 'card-elevated',
		flat: 'rounded-lg border border-gray-200 p-6 dark:border-gray-700'
	};

	const className = `${variantClasses[variant]} ${extraClass}`;
</script>

<div class={className} {...rest}>
	{@render children?.()}
</div>
