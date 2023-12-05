<script lang="ts">
	import type { Listing } from '@prisma/client';

	export let listing: Listing;
	export let display: 'row' | 'card' = 'card';

	function favoriteListing(event: Event) {
		event.preventDefault();
		console.log('Favorite');
	}
</script>

{#if display == 'card'}
	<div class="relative h-min text-slate-50">
		<a href={`/${listing.id}`} class="inline-block h-full w-full">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				on:click={favoriteListing}
				tabindex="0"
				role="button"
				class="absolute text-maristred text-4xl font-bold material-symbols-outlined right-0 hover:cursor-pointer"
			>
				favorite
			</span>

			<img src={listing.imageUrl} alt="" />
			<div class="flex pt-2 justify-between">
				<p>{listing.listingTitle}</p>
				<b>{`$ ${listing.price}`}</b>
			</div>

			<div class="flex pt-2 justify-between">
				<p>{listing.location}</p>

				{#if listing.size}
					<strong>{listing.size}</strong>
				{/if}
			</div>
		</a>
	</div>
{:else if display == 'row'}
	<div class="w-3/4 hover:bg-slate-700">
		<a class="flex" href={`/${listing.id}`}>
			<img src={listing.imageUrl} alt="Listing" width="10%" />

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
