<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	
	let Icon = $state(null);
	let currentType = $state('open');
	let formData = $state({
		name: '',
		email: '',
		phone: '',
		motivation: '',
		motivationFile: null,
		cv: null,
		portfolio: []
	});
	let submitStatus = $state('idle');
	let errorMessage = $state('');
	let dragActive = $state(false);
	let motivationInputType = $state('text');

	// Application types configuration
	const applicationTypes = {
		open: {
			title: 'Send åpen søknad',
			description: 'Er du interessert i å jobbe hos oss? Send oss en åpen søknad, så tar vi kontakt når relevante stillinger dukker opp.'
		},
		student: {
			title: 'Student og nyutdannet',
			description: 'Vi er alltid på jakt etter dyktige studenter og nyutdannede som vil starte sin karriere hos oss.'
		},
		internship: {
			title: 'Internship',
			description: 'Få verdifull erfaring gjennom vårt internship-program. Vi tilbyr spennende muligheter året rundt.'
		}
	};

	$effect(() => {
		const type = $page.url.searchParams.get('type') || 'open';
		if (applicationTypes[type]) {
			currentType = type;
		}
	});

	onMount(async () => {
		const module = await import('@iconify/svelte');
		Icon = module.default;
	});

	function handleSubmit(event) {
		event.preventDefault();
		submitStatus = 'loading';
		errorMessage = '';

		// Simulate API call
		setTimeout(() => {
			submitStatus = 'success';
			// Reset form after success
			setTimeout(() => {
				submitStatus = 'idle';
				formData = {
					name: '',
					email: '',
					phone: '',
					motivation: '',
					motivationFile: null,
					cv: null,
					portfolio: []
				};
			}, 3000);
		}, 1500);
	}

	function handleFileChange(event, type) {
		if (type === 'portfolio') {
			const files = Array.from(event.target.files);
			if (files.length > 0) {
				const newFiles = [...formData.portfolio, ...files];
				if (newFiles.length <= 10) {
					formData.portfolio = newFiles;
				}
			}
		} else {
			const file = event.target.files[0];
			if (file) {
				formData[type] = file;
			}
		}
	}

	function handleDragEnter(e, type) {
		e.preventDefault();
		e.stopPropagation();
		dragActive = type;
	}

	function handleDragLeave(e) {
		e.preventDefault();
		e.stopPropagation();
		dragActive = false;
	}

	function handleDrop(e, type) {
		e.preventDefault();
		e.stopPropagation();
		dragActive = false;
		
		if (type === 'portfolio') {
			const files = Array.from(e.dataTransfer.files);
			if (files.length > 0) {
				const newFiles = [...formData.portfolio, ...files];
				if (newFiles.length <= 10) {
					formData.portfolio = newFiles;
				}
			}
		} else {
			const file = e.dataTransfer.files[0];
			if (file) {
				formData[type] = file;
			}
		}
	}

	function handleMotivationFileChange(event) {
		const file = event.target.files[0];
		if (file) {
			formData.motivationFile = file;
		}
	}

	function handleMotivationDrop(e) {
		e.preventDefault();
		e.stopPropagation();
		dragActive = false;
		
		const file = e.dataTransfer.files[0];
		if (file) {
			formData.motivationFile = file;
		}
	}

	function removePortfolioFile(index) {
		formData.portfolio = formData.portfolio.filter((_, i) => i !== index);
	}
</script>

<svelte:head>
	<title>{applicationTypes[currentType].title} | HavBank - Karriere</title>
	<meta name="description" content={applicationTypes[currentType].description} />
</svelte:head>

<div class="relative isolate overflow-hidden">
	<div class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
		<div class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"></div>
	</div>

	<!-- Navigation -->
	<div class="bg-white dark:bg-gray-900 p-8">
		<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<ul class="flex flex-wrap gap-4 justify-center">
				{#each Object.entries(applicationTypes) as [type, data]}
					<li>
						<a
							href="/karriere/soknad?type={type}"
							class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md {currentType === type 
								? 'bg-blue-600 text-white'
								: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 hover:bg-gray-50 dark:hover:bg-gray-700'} transition-colors"
							aria-current={currentType === type ? 'page' : undefined}
						>
							{data.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<!-- Content -->
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
		<div class="max-w-2xl mx-auto">
			<div class="text-center mb-12">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
					{applicationTypes[currentType].title}
				</h1>
				<p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
					{applicationTypes[currentType].description}
				</p>
			</div>

			<form class="space-y-8" onsubmit={handleSubmit}>
				<!-- Personal Information -->
				<div class="space-y-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 ring-1 ring-gray-900/5 dark:ring-white/10">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Kontaktinformasjon</h2>
					
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label for="application-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Navn
							</label>
							<input
								type="text"
								id="application-name"
								name="application-name"
								autocomplete="name"
								bind:value={formData.name}
								required
								class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
							/>
						</div>

						<div>
							<label for="application-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
								E-post
							</label>
							<input
								type="email"
								id="application-email"
								name="application-email"
								autocomplete="email"
								bind:value={formData.email}
								required
								class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
				</div>

				<!-- Motivation -->
				<div class="space-y-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 ring-1 ring-gray-900/5 dark:ring-white/10">
					<div class="flex justify-between items-center">
						<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Din søknad</h2>
						<div class="flex items-center gap-2">
							<span id="uploadLabel" class="text-sm text-gray-600 dark:text-gray-400">Last opp fil</span>
							<button
								type="button"
								class={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
									motivationInputType === 'file' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
								}`}
								role="switch"
								aria-checked={motivationInputType === 'file'}
								aria-labelledby="uploadLabel"
								onclick={() => motivationInputType = motivationInputType === 'text' ? 'file' : 'text'}
							>
								<span 
									aria-hidden="true"
									class={`${
										motivationInputType === 'file' ? 'translate-x-5' : 'translate-x-0'
									} pointer-events-none absolute h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
									style="top: 1px; left: 1px;"
								></span>
							</button>
						</div>
					</div>

					<div>
						<label for="application-motivation" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Søknadstekst
						</label>
						<div class="mt-1">
							{#if motivationInputType === 'text'}
								<textarea
									id="application-motivation"
									name="application-motivation"
									autocomplete="off"
									bind:value={formData.motivation}
									rows="6"
									required={!formData.motivationFile}
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
									placeholder="Fortell oss litt om deg selv, din motivasjon og hvorfor du ønsker å jobbe hos oss..."
								></textarea>
							{:else}
								<div
									role="region"
									aria-labelledby="motivation-file-label"
									class={`relative rounded-lg border-2 border-dashed p-4 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors ${
										dragActive === 'motivation' 
											? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
											: 'border-gray-300 dark:border-gray-700'
									}`}
									ondragenter={(e) => handleDragEnter(e, 'motivation')}
									ondragleave={handleDragLeave}
									ondragover={(e) => e.preventDefault()}
									ondrop={(e) => handleMotivationDrop(e)}
								>
									<input
										type="file"
										id="motivation-file"
										name="motivation-file"
										accept=".pdf,.txt,.doc,.docx,.rtf,.odt"
										required={!formData.motivation}
										onchange={handleMotivationFileChange}
										class="sr-only"
									/>
									<label
										id="motivation-file-label"
										for="motivation-file"
										class="cursor-pointer block"
									>
										<div class="text-center">
											{#if formData.motivationFile}
												<div class="flex items-center justify-center text-blue-600 dark:text-blue-400">
													{#if browser && Icon}
														<Icon icon="heroicons:document-check" class="h-8 w-8" />
													{/if}
												</div>
												<p class="mt-2 text-sm text-gray-900 dark:text-white">
													{formData.motivationFile.name}
												</p>
												<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
													Klikk for å endre
												</p>
											{:else}
												<div class="flex items-center justify-center text-gray-400 dark:text-gray-600">
													{#if browser && Icon}
														<Icon icon="heroicons:document-plus" class="h-8 w-8" />
													{/if}
												</div>
												<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
													Dra og slipp eller <span class="text-blue-600 dark:text-blue-400">velg fil</span>
												</p>
												<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
													PDF, TXT, DOC, DOCX, RTF, ODT
												</p>
											{/if}
										</div>
									</label>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Attachments -->
				<div class="space-y-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 ring-1 ring-gray-900/5 dark:ring-white/10">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Vedlegg</h2>

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<!-- CV Upload -->
						<div>
							<label for="cv" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								CV (PDF)
							</label>
							<div
								role="region"
								aria-labelledby="cv"
								class={`relative rounded-lg border-2 border-dashed p-4 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors ${
									dragActive === 'cv'
										? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
										: 'border-gray-300 dark:border-gray-700'
								}`}
								ondragenter={(e) => handleDragEnter(e, 'cv')}
								ondragleave={handleDragLeave}
								ondragover={(e) => e.preventDefault()}
								ondrop={(e) => handleDrop(e, 'cv')}
							>
								<input
									type="file"
									id="cv"
									accept=".pdf"
									required
									onchange={(e) => handleFileChange(e, 'cv')}
									class="sr-only"
								/>
								<label
									for="cv"
									class="cursor-pointer"
								>
									<div class="text-center">
										{#if formData.cv}
											<div class="flex items-center justify-center text-blue-600 dark:text-blue-400">
												{#if browser && Icon}
													<Icon icon="heroicons:document-check" class="h-8 w-8" />
												{/if}
											</div>
											<p class="mt-2 text-sm text-gray-900 dark:text-white">
												{formData.cv.name}
											</p>
											<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
												Klikk for å endre
											</p>
										{:else}
											<div class="flex items-center justify-center text-gray-400 dark:text-gray-600">
												{#if browser && Icon}
													<Icon icon="heroicons:document-plus" class="h-8 w-8" />
												{/if}
											</div>
											<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
												Dra og slipp eller <span class="text-blue-600 dark:text-blue-400">velg fil</span>
											</p>
										{/if}
									</div>
								</label>
							</div>
						</div>

						<!-- Portfolio Upload -->
						<div>
							<label for="portfolio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Portfolio/Andre vedlegg ({formData.portfolio.length}/10)
							</label>
							<div
								role="region"
								aria-labelledby="portfolio"
								class={`relative rounded-lg border-2 border-dashed p-4 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors ${
									dragActive === 'portfolio'
										? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
										: 'border-gray-300 dark:border-gray-700'
								}`}
								ondragenter={(e) => handleDragEnter(e, 'portfolio')}
								ondragleave={handleDragLeave}
								ondragover={(e) => e.preventDefault()}
								ondrop={(e) => handleDrop(e, 'portfolio')}
							>
								<input
									type="file"
									id="portfolio"
									accept=".pdf,.zip"
									multiple
									onchange={(e) => handleFileChange(e, 'portfolio')}
									class="sr-only"
									disabled={formData.portfolio.length >= 10}
								/>
								<label
									for="portfolio"
									class="cursor-pointer"
								>
									<div class="text-center">
										{#if formData.portfolio.length > 0}
											<div class="flex flex-col gap-2">
												<div class="flex items-center justify-center text-blue-600 dark:text-blue-400">
													{#if browser && Icon}
														<Icon icon="heroicons:document-check" class="h-8 w-8" />
													{/if}
												</div>
												<div class="space-y-2">
													{#each formData.portfolio as file, index}
														<div class="flex items-center justify-between text-sm bg-white/50 dark:bg-gray-700/50 rounded p-2">
															<span class="truncate max-w-[200px]">{file.name}</span>
															<button
																type="button"
																class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
																onclick={() => removePortfolioFile(index)}
															>
																{#if browser && Icon}
																	<Icon icon="heroicons:x-mark" class="h-5 w-5" />
																{/if}
															</button>
														</div>
													{/each}
												</div>
												{#if formData.portfolio.length < 10}
													<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
														Dra og slipp eller <span class="text-blue-600 dark:text-blue-400">velg flere filer</span>
													</p>
												{:else}
													<p class="mt-2 text-sm text-red-500 dark:text-red-400">
														Maksimalt antall filer nådd (10)
													</p>
												{/if}
											</div>
										{:else}
											<div class="flex items-center justify-center text-gray-400 dark:text-gray-600">
												{#if browser && Icon}
													<Icon icon="heroicons:document-plus" class="h-8 w-8" />
												{/if}
											</div>
											<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
												Dra og slipp eller <span class="text-blue-600 dark:text-blue-400">velg filer</span>
											</p>
										{/if}
									</div>
								</label>
							</div>
						</div>
					</div>
				</div>

				<!-- Submit Button -->
				<div class="flex justify-end">
					<button
						type="submit"
						disabled={submitStatus === 'loading'}
						class="group relative flex w-full sm:w-auto items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 px-8 py-3 text-sm font-medium text-white shadow-lg hover:from-indigo-500 hover:to-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 overflow-hidden border border-transparent hover:border-blue-400/20"
					>
						<span class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
						<span class="relative flex items-center gap-2">
							{#if submitStatus === 'loading'}
								<div class="animate-spin">
									{#if browser && Icon}
										<Icon icon="heroicons:arrow-path" class="h-5 w-5" />
									{/if}
								</div>
								<span>Sender...</span>
							{:else if submitStatus === 'success'}
								<div class="success-icon">
									{#if browser && Icon}
										<Icon icon="heroicons:check" class="h-5 w-5" />
									{/if}
								</div>
								<span>Sendt!</span>
							{:else}
								<span>Send søknad</span>
							{/if}
						</span>
					</button>
				</div>

				{#if errorMessage}
					<p class="mt-2 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
				{/if}
			</form>
		</div>
	</div>
</div>

<style>
	/* Make sure these styles are included */
	button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}

	/* Animation for success state */
	@keyframes checkmark {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}

	:global(.success-icon) {
		animation: checkmark 0.3s ease-in-out forwards;
	}

	button[role="switch"] {
		position: relative;
		transition: background-color 0.2s ease-in-out;
	}

	button[role="switch"] span {
		will-change: transform;
		transform: translateX(0);
	}

	button[role="switch"][aria-checked="true"] span {
		transform: translateX(20px);
	}
</style> 