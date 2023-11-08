<script lang="ts">
	import type { Listing } from '@prisma/client';

	export let listing: Listing;
</script>

<div class="h-80 w-60 text-slate-50">
	<a href={`/${listing.id}`} class="inline-block h-full w-full">
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
