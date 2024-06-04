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
	let { brandList, locationList, sizeList } = data;
	const toastStore = getToastStore();

	let minPrice = '';
	let maxPrice = '';
	let chosenBrands: string[] = [];
	let chosenLocations: string[] = [];
	let chosenSizes: string[] = [];
	let isApplyingFilters = false;
	const lastParams = {
		minPrice,
		maxPrice,
		chosenBrands,
		chosenLocations,
		chosenSizes,
	};

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

		if (!isDifferent()) return;

		lastParams.minPrice = minPrice;
		lastParams.maxPrice = maxPrice;
		lastParams.chosenBrands = [...chosenBrands];
		lastParams.chosenLocations = [...chosenLocations];
		lastParams.chosenSizes = [...chosenSizes];

		const params = new URLSearchParams();

		// adding the filter to the valid params if they aren't empty
		minPrice != '' && params.append('price', 'gte' + minPrice);
		maxPrice != '' && params.append('price', 'lte' + maxPrice);

		chosenBrands.length > 0 &&
			chosenBrands.forEach((brand) => {
				params.append('brand', brand);
			});
		chosenLocations.length > 0 &&
			chosenLocations.forEach((location) => {
				params.append('location', location);
			});
		chosenSizes.length > 0 &&
			chosenSizes.forEach((size) => {
				params.append('size', size);
			});

		$page.url.searchParams.has('search') &&
			params.set('search', $page.url.searchParams.get('search')!);

		let searchParamsString = params.toString();

		isApplyingFilters = true;
		await goto(`/feed?${searchParamsString}`, {
			invalidateAll: true,
		});
		isApplyingFilters = false;
	};

	$: if (
		$page.url.searchParams.has('search') &&
		$page.url.searchParams.size == 1 &&
		!isApplyingFilters
	) {
		// update left side filters if search is the only param
		brandList = data.brandList;
		locationList = data.locationList;
		sizeList = data.sizeList;

		resetChosenFilters();
	}

	const resetChosenFilters = () => {
		minPrice = '';
		maxPrice = '';
		chosenBrands = [];
		chosenLocations = [];
		chosenSizes = [];

		lastParams.minPrice = '';
		lastParams.maxPrice = '';
		lastParams.chosenBrands = [];
		lastParams.chosenLocations = [];
		lastParams.chosenSizes = [];
	};

	const isDifferent = () => {
		if (minPrice != lastParams.minPrice) return true;
		if (maxPrice != lastParams.maxPrice) return true;
		if (chosenBrands.length != lastParams.chosenBrands.length) return true;

		const sortedPrevBrands = lastParams.chosenBrands.sort();
		const sortedAfterBrands = chosenBrands.sort();

		if (
			!sortedPrevBrands.every((val, index) => {
				return val == sortedAfterBrands[index];
			})
		)
			return true;

		if (chosenLocations.length != lastParams.chosenLocations.length) return true;

		const sortedPrevLocations = lastParams.chosenLocations.sort();
		const sortedAfterLocations = chosenLocations.sort();
		if (
			!sortedPrevLocations.every((val, index) => {
				return val == sortedAfterLocations[index];
			})
		)
			return true;

		if (chosenSizes.length != lastParams.chosenSizes.length) return true;

		const sortedPrevSizes = lastParams.chosenSizes.sort();
		const sortedAfterSizes = chosenSizes.sort();

		if (
			!sortedPrevSizes.every((val, index) => {
				return val == sortedAfterSizes[index];
			})
		)
			return true;

		return false;
	};

	$: {
		const _ = $page.url.searchParams;

		if ($page.url.searchParams.size == 0) {
			brandList = data.brandList;
			locationList = data.locationList;
			sizeList = data.sizeList;

			resetChosenFilters();
		}
	}
</script>

<div id="feed" class="flex">
	<div id="filters" class="sticky top-14 w-1/6 flex flex-col justify-between h-[calc(100vh-56px)]">
		<div>
			{#if $page.url.searchParams.has('search')}
				<div class="text-slate-50 text-3xl py-2 px-6 tracking-wider font-bold">
					<h1>"{$page.url.searchParams.get('search')}"</h1>
				</div>
			{/if}

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
					resetChosenFilters();

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
			<Listing {listing} {userID} params={$page.url.searchParams.toString()} />
		{/each}
	</div>
</div>
