<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Listing } from '@prisma/client';

	interface ListingWithFavoriteBool extends Listing {
		isFavoritedByCurrentUser?: string;
	}

	export let listing: ListingWithFavoriteBool;
	export let display: 'row' | 'card' = 'card';
	export let userID: string;
	export let params: string = '';
</script>

{#if display == 'card'}
	<div class="relative h-min text-slate-50">
		{#if listing.sellerId != userID}
			<form
				method="POST"
				action={`/feed?${listing.isFavoritedByCurrentUser ? '/unfavorite' : '/favorite'}&${params}`}
				use:enhance
			>
				<input type="hidden" name="listing_id" value={listing.id} />
				<button
					class="absolute right-0 border rounded-md bg-slate-300 hover:opacity-60 border-maristdarkgrey"
				>
					<span
						class={`material-symbols-outlined ${
							listing.isFavoritedByCurrentUser ? 'fill_symbol' : 'reg_symbol'
						} text-maristred font-bold text-3xl p-0.5`}
					>
						favorite
					</span>
				</button>
			</form>
		{/if}

		<a href={`/${listing.id}`} class="inline-block h-full w-full">
			<img src={listing.imageUrl} alt="" class="aspect-square max-w-[100%]" />
			<div class="flex pt-2 justify-between">
				<p>{listing.listingTitle}</p>
				<b>{`$ ${listing.price}`}</b>
			</div>

			<div class="flex pt-2 justify-between">
				<p>{listing.location}</p>

				<span class="flex gap-1">
					<p>{listing.brand}</p>
					<p>•</p>
					<strong>{listing.size}</strong>
				</span>
			</div>
		</a>
	</div>
{:else if display == 'row'}
	<div class="w-4/6 hover:bg-slate-700 border border-solid">
		<a class="flex" href={`/${listing.id}`}>
			<img src={listing.imageUrl} alt="Listing" class="aspect-square max-w-[10%]" />

			<div class="flex text-slate-50 pl-2 items-center justify-between w-full font-bold text-2xl">
				<p class="font-bold text-2xl">{listing.listingTitle}</p>

				<div class="grid grid-cols-3 gap-10">
					<p>{`$${listing.price}`}</p>
					<p class={`${listing.sold ? 'text-green-500' : 'text-red-500'}`}>
						{listing.sold ? 'SOLD' : 'For Sale'}
					</p>
					<p>{listing.size}</p>
				</div>
			</div>
		</a>
	</div>
{/if}
