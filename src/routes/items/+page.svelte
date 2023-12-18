<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import type { Listing as TListing } from '@prisma/client';
	import type { PageData } from './$types';

	export let data: PageData;
	const originalListings = data.listings as TListing[];
	let filteredListings: TListing[] = originalListings;
	let searchQuery = '';

	function filterListings() {
		filteredListings = originalListings.filter((item) => {
			return item.listingTitle.toLowerCase().includes(searchQuery.trim().toLowerCase());
		});
	}

	$: {
		const dependency = searchQuery;

		filterListings();
	}
</script>

<div class="flex flex-col items-center h-screen w-full gap-2">
	<div class="flex w-[55%] items-center">
		<i class="material-symbols-outlined text-maristgrey absolute px-2"> search </i>
		<input
			type="search"
			class="input pl-10 tracking-wider font-bold"
			placeholder="Search"
			bind:value={searchQuery}
		/>
	</div>

	{#each filteredListings as item (item.id)}
		<Listing listing={item} display="row" />
	{/each}
</div>
