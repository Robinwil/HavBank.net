<script lang="ts">
	import { browser } from '$app/environment';
	import { tick } from 'svelte';
	import Icon from '@iconify/svelte';
	import { demoNoticeState, hideDemoNotice } from '$lib/stores/demoNotice.svelte.js';

	let dismissButton = $state<HTMLButtonElement>();

	$effect(() => {
		if (!browser) return;

		if (demoNoticeState.isOpen) {
			const previousOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			tick().then(() => dismissButton?.focus());
			return () => {
				document.body.style.overflow = previousOverflow;
			};
		}
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			hideDemoNotice();
		}
	}
</script>

{#if demoNoticeState.isOpen}
	<!-- Backdrop (clickable to dismiss) -->
	<button
		type="button"
		class="fixed inset-0 z-[90] bg-gray-950/70 backdrop-blur-sm cursor-default"
		aria-label="Lukk melding"
		onclick={hideDemoNotice}
	></button>

	<div
		class="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none"
		role="alertdialog"
		tabindex="-1"
		aria-modal="true"
		aria-labelledby="demo-notice-title"
		aria-describedby="demo-notice-body"
		onkeydown={handleKeydown}
	>
		<div
			class="pointer-events-auto w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-red-900/20 dark:ring-red-500/30 overflow-hidden"
		>
			<div
				class="flex items-start gap-3 px-5 sm:px-6 py-4 sm:py-5 bg-red-700 dark:bg-red-800 text-white"
			>
				{#if browser && Icon}
					<Icon
						icon="heroicons:exclamation-triangle"
						class="h-6 w-6 sm:h-7 sm:w-7 shrink-0 mt-0.5"
						aria-hidden="true"
					/>
				{/if}
				<div class="min-w-0 flex-1">
					<p class="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-widest text-red-100">
						Fiktiv nettside
					</p>
					<h2 id="demo-notice-title" class="mt-0.5 text-base sm:text-lg font-bold leading-snug">
						Denne handlingen er ikke mulig her
					</h2>
				</div>
				<button
					type="button"
					class="shrink-0 rounded-md p-1 -m-1 text-red-100 hover:bg-red-800/60 dark:hover:bg-red-900/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					aria-label="Lukk melding"
					onclick={hideDemoNotice}
				>
					{#if browser && Icon}
						<Icon icon="heroicons:x-mark" class="h-5 w-5" aria-hidden="true" />
					{/if}
				</button>
			</div>

			<div
				id="demo-notice-body"
				class="px-5 sm:px-6 py-4 sm:py-5 space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed"
			>
				<p>{demoNoticeState.message}</p>
				{#if demoNoticeState.detail}
					<p class="text-gray-900 dark:text-white font-medium">
						{demoNoticeState.detail}
					</p>
				{/if}
				<p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
					<a
						href="/om-prosjektet"
						onclick={hideDemoNotice}
						class="text-blue-900 dark:text-blue-300 underline underline-offset-4 hover:text-blue-800 dark:hover:text-blue-200"
					>
						Les mer om hva dette prosjektet er →
					</a>
				</p>
			</div>

			<div
				class="px-5 sm:px-6 py-3 bg-gray-50 dark:bg-gray-800/60 border-t border-gray-200 dark:border-gray-800 flex justify-end"
			>
				<button
					bind:this={dismissButton}
					type="button"
					class="btn-primary px-5 py-2 text-sm"
					onclick={hideDemoNotice}
				>
					OK
				</button>
			</div>
		</div>
	</div>
{/if}
