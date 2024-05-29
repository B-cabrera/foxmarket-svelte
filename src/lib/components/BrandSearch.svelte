<script lang="ts">
	export let selectedBrand = false;
	export let value = '';

	let debounceTimer: NodeJS.Timeout | null = null;
	let DEBOUNCE_MS = 1000;
	let brands: { name: string; icon: string }[] = [];
	let isLoading = false;

	$: value && handleSearchDebounce();

	function handleSearchDebounce() {
		if (selectedBrand) {
			return;
		}

		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		debounceTimer = setTimeout(async () => {
			if (value.trim() == '') {
				brands = [];
				return;
			}

			isLoading = true;

			const response = await fetch(`https://api.brandfetch.io/v2/search/${value}`);
			const data = await response.json();

			brands = data as { name: string; icon: string }[];
			isLoading = false;
		}, DEBOUNCE_MS);
	}
</script>

<div class="w-full -mt-8">
	<div class="flex gap-4">
		{#if selectedBrand}
			<button
				class="btn bg-maristgrey border-none p-2 !font-light text-sm"
				type="button"
				on:click={() => {
					selectedBrand = false;
					value = '';
				}}>Clear Selection</button
			>
		{/if}
	</div>
	<div class="flex flex-col w-full h-1/3 overflow-y-scroll" hidden={brands.length === 0}>
		{#if isLoading}
			<div
				class="flex w-full bg-maristdarkgrey p-4 justify-start text-slate-50 hover:opacity-90 items-center"
			>
				<p>Loading...</p>
			</div>
		{:else}
			{#each brands as brand}
				{#if brand.name}
					<button
						class="flex w-full gap-3 bg-maristdarkgrey p-4 justify-start text-slate-50 hover:opacity-90 items-center"
						type="button"
						on:click={() => {
							value = brand.name;
							brands = [];
							selectedBrand = true;
						}}
					>
						<img src={brand.icon} alt="" />
						<p>{brand.name}</p>
					</button>
				{/if}
			{/each}
		{/if}
	</div>
</div>
