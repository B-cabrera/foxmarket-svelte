<script lang="ts">
	export let brands: Set<string>;
	export let chosenBrands: string[];
</script>

<div class="flex flex-col gap-3 w-full px-3 max-h-60 overflow-y-scroll">
	{#each brands as brand}
		<label class="flex items-center space-x-2">
			<input class="checkbox" type="checkbox" checked={chosenBrands.indexOf(brand) > -1}  on:click={(e) => {
				if (e.currentTarget.checked) {
					chosenBrands = [...chosenBrands, brand];
				} else {
					const index = chosenBrands.indexOf(brand);

					if (index > -1) {
						chosenBrands.splice(index, 1);
						
						chosenBrands = chosenBrands;
					}
				}
			}} />
			<p>{brand}</p>
		</label>
	{/each}
</div>
