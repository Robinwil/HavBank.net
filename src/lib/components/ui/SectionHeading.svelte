<script lang="ts">
	/**
	 * Standard section header: optional eyebrow label + title + optional lead text.
	 * Replaces the repeated eyebrow → h2 → lead paragraph pattern seen across pages.
	 */
	interface Props {
		/** Small coloured label above the title. */
		eyebrow?: string;
		/** The section heading text. */
		title: string;
		/** Supporting paragraph below the title. */
		lead?: string;
		/** If true, text-center. */
		center?: boolean;
		/** Extra wrapper classes. */
		class?: string;
	}

	let { eyebrow = '', title, lead = '', center = false, class: extraClass = '' }: Props = $props();
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
