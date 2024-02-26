<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const userID = data.userID!;
</script>

<div id="feed" class="h-[calc(100vh-56px)] flex">
	<div id="filters" class="w-1/6">Filters</div>
	<div id="items" class="w-full grid grid-cols-4 gap-8 px-5">
		{#each data.listings as listing}
			<Listing {listing} {userID} />
		{/each}
	</div>
</div>
