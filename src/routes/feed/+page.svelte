<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div id="feed" class="h-[calc(100vh-56px)] flex">
	<div id="filters" class="w-1/6">Filters</div>
	<div id="items" class="w-full">
		{#each data.listings as listing}
			<Listing {listing} />
		{/each}
	</div>
</div>
