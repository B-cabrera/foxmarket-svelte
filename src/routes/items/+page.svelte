<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col items-center h-screen w-full gap-2">
	{#each data.listings as listing}
		<Listing {listing} display="row" />
	{/each}
</div>
