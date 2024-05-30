<script lang="ts">
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Listing from '$lib/components/Listing.svelte';
	import MultiSelectFilterBlock from '$lib/components/MultiSelectFilterBlock.svelte';
	import PriceFilterBlock from '$lib/components/PriceFilterBlock.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const userID = data.userID!;
	const { brandSet, locationSet } = data;

	let minPrice = '';
	let maxPrice = '';
	let chosenBrands: string[] = [];
	let chosenLocations: string[] = [];
</script>

<div id="feed" class="h-[calc(100vh-56px)] flex">
	<div id="filters" class="w-1/6">
		<Dropdown label={'Price'}>
			<PriceFilterBlock bind:min={minPrice} bind:max={maxPrice} />
		</Dropdown>
		<Dropdown label={'Brand'}>
			<MultiSelectFilterBlock bind:chosen={chosenBrands} selections={brandSet} />
		</Dropdown>
		<Dropdown label={'Location'}>
			<MultiSelectFilterBlock bind:chosen={chosenLocations} selections={locationSet} />
		</Dropdown>
	</div>
	<div id="items" class="w-full grid grid-cols-4 gap-8 px-5">
		{#each data.listings as listing}
			<Listing {listing} {userID} />
		{/each}
	</div>
</div>
