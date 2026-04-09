<script>
	/**
	 * Standard section header: optional eyebrow label + title + optional lead text.
	 * Replaces the repeated eyebrow → h2 → lead paragraph pattern seen across pages.
	 *
	 * @prop {string}  [eyebrow='']  - Small coloured label above the title.
	 * @prop {string}  title         - The section heading text.
	 * @prop {string}  [lead='']     - Supporting paragraph below the title.
	 * @prop {boolean} [center=false]- If true, text-center.
	 * @prop {string}  [class='']    - Extra wrapper classes.
	 */
	let {
		eyebrow = '',
		title,
		lead = '',
		center = false,
		class: extraClass = ''
	} = $props();
</script>

<div class="{center ? 'text-center' : ''} {extraClass}">
	{#if eyebrow}
		<p class="section-eyebrow">{eyebrow}</p>
	{/if}
	<h2 class="{eyebrow ? 'mt-2 ' : ''}section-title">{title}</h2>
	{#if lead}
		<p class="section-lead">{lead}</p>
	{/if}
</div>
