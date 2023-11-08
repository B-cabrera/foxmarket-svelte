<script lang="ts">
	import type { Listing } from '@prisma/client';

	export let listing: Listing;

	function favoriteListing(event: Event) {
		event.preventDefault();
		console.log('Favorite');
	}
</script>

<div class="relative h-80 w-60 text-slate-50">
	<a href={`/${listing.id}`} class="inline-block h-full w-full">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span
			on:click={favoriteListing}
			tabindex="0"
			role="button"
			class="absolute text-maristred font-bold material-symbols-outlined right-0 hover:cursor-pointer"
		>
			favorite
		</span>

		<img src={listing.imageUrl} alt="" />
		<div class="flex pt-2 justify-between">
			<p>{listing.listingTitle}</p>
			<b>{`$ ${listing.price}`}</b>
		</div>

		<div class="pt-2">
			<p>{listing.location}</p>
		</div>
	</a>
</div>
