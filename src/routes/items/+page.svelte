<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import type { Listing as TListing } from '@prisma/client';
	import type { PageData } from './$types';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let data: PageData;
	const originalListings = data.listings as TListing[];
	let filteredListings: TListing[] = originalListings;
	let searchQuery = '';
	let showSold = false;

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
	<h1 class="text-5xl text-slate-50 py-6 font-bold tracking-wider">My Items</h1>

	<div class="flex w-[55%] items-center gap-40">
		<i class="material-symbols-outlined text-maristgrey absolute px-2"> search </i>
		<input
			type="search"
			class="input pl-10 tracking-wider font-bold"
			placeholder="Search my items..."
			bind:value={searchQuery}
		/>

		<div class="flex items-center gap-2">
			<label for="soldToggle" class="text-slate-50">Sold Items</label>
			<SlideToggle
				id="soldToggle"
				name="showSold"
				bind:checked={showSold}
				active="bg-maristred"
				class="bg-maristgrey"
			/>
		</div>
	</div>

	{#each filteredListings as item (item.id)}
		<Listing listing={item} display="row" />
	{/each}
</div>
