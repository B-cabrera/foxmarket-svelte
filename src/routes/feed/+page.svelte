<script lang="ts">
	import { goto } from '$app/navigation';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Listing from '$lib/components/Listing.svelte';
	import MultiSelectFilterBlock from '$lib/components/MultiSelectFilterBlock.svelte';
	import PriceFilterBlock from '$lib/components/PriceFilterBlock.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	const userID = data.userID!;
	const { brandList, locationList, sizeList } = data;
	const toastStore = getToastStore();

	let minPrice = '';
	let maxPrice = '';
	let chosenBrands: string[] = [];
	let chosenLocations: string[] = [];
	let chosenSizes: string[] = [];

	$: isFiltering =
		minPrice != '' ||
		maxPrice != '' ||
		chosenBrands.length > 0 ||
		chosenLocations.length > 0 ||
		chosenSizes.length > 0;

	const generateSearchParamsAndApplyFilters = async () => {
		// handling when min and max aren't valid
		if (minPrice != '' && maxPrice != '' && parseInt(minPrice) > parseInt(maxPrice)) {
			toastStore.trigger({
				message: 'Min price has to be less than max price.',
				classes: 'bg-maristred text-slate-50 p-5 mt-2 rounded border-2 spacing',
			});

			minPrice = '';
			maxPrice = '';
			return;
		}

		let searchParams = new URLSearchParams();

		// adding the filter to the valid params if they aren't empty
		minPrice != '' && searchParams.append('price', 'gte' + minPrice);
		maxPrice != '' && searchParams.append('price', 'lte' + maxPrice);
		chosenBrands.length > 0 &&
			chosenBrands.forEach((brand) => {
				searchParams.append('brand', brand);
			});
		chosenLocations.length > 0 &&
			chosenLocations.forEach((location) => {
				searchParams.append('location', location);
			});
		chosenSizes.length > 0 &&
			chosenSizes.forEach((size) => {
				searchParams.append('size', size);
			});

		let searchParamsString = searchParams.toString();

		await goto(`/feed?${searchParamsString}`);
	};
</script>

<div id="feed" class="flex">
	<div id="filters" class="w-1/6 flex flex-col justify-between">
		<div>
			<Dropdown label={'Price'}>
				<PriceFilterBlock bind:min={minPrice} bind:max={maxPrice} />
			</Dropdown>
			<Dropdown label={'Brand'}>
				<MultiSelectFilterBlock bind:chosen={chosenBrands} selections={brandList} />
			</Dropdown>
			<Dropdown label={'Location'}>
				<MultiSelectFilterBlock bind:chosen={chosenLocations} selections={locationList} />
			</Dropdown>
			<Dropdown label={'Size'}>
				<MultiSelectFilterBlock bind:chosen={chosenSizes} selections={sizeList} />
			</Dropdown>
		</div>

		<div class="flex justify-around">
			<button
				class="btn text-xl !font-light border-2 border-slate-950 bg-maristgrey"
				disabled={!$page.url.searchParams.has('price') &&
					!$page.url.searchParams.has('brand') &&
					!$page.url.searchParams.has('location') &&
					!$page.url.searchParams.has('size')}
				on:click={async () => {
					minPrice = '';
					maxPrice = '';
					chosenBrands = [];
					chosenLocations = [];
					chosenSizes = [];

					await goto('/feed');
				}}>Reset</button
			>
			<button
				class="btn text-xl !font-light border-2 border-slate-50 bg-maristred text-slate-50"
				disabled={!isFiltering}
				on:click={generateSearchParamsAndApplyFilters}>Apply</button
			>
		</div>
	</div>
	<div id="items" class="w-full grid grid-cols-4 gap-8 px-5">
		{#each data.listings as listing}
			<Listing {listing} {userID} />
		{/each}
	</div>
</div>
