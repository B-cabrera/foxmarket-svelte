<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Listing } from '@prisma/client';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import NewChatStarterModal from './NewChatStarterModal.svelte';

	interface ListingWithFavoriteBool extends Listing {
		isFavoritedByCurrentUser?: string;
	}

	type SellerInfo = {
		username: string;
		itemsSold: number;
	};

	export let item: ListingWithFavoriteBool;
	export let seller: SellerInfo;
	export let viewingUserID: string;
	export let submitFunction: SubmitFunction;
	export let isEditing: boolean;

	const modalStore = getModalStore();
	const modalComponent: ModalComponent = {
		ref: NewChatStarterModal,
		props: {
			sellerId: item.sellerId,
			sellerUsername: seller.username,
			userId: viewingUserID,
			itemId: item.id,
			closeFunc: () => modalStore.close()
		},
	};
	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
	};

</script>

<div class="flex items-center justify-center w-2/5">
	<div class="flex flex-col items-center h-3/4 w-4/6">
		<div class="text-slate-50 w-max max-w-[120%]">
			<h1 class="font-bold text-5xl tracking-wider">{item.listingTitle}</h1>
			<span class="flex justify-between">
				<p>{item.location}</p>
				<p>{item.size}</p>
			</span>
		</div>

		<h1 class="text-slate-50 text-5xl font-bold tracking-wider py-10 text-center">
			{`$${item.price}`}
		</h1>

		<div class="flex flex-col gap-2 w-full">
			{#if item.sellerId != viewingUserID}
				<!-- TODO: Have this button start a chat with the seller and buyer -->
				<button
					class="btn !border-0 py-2 bg-maristred text-xl font-bold text-slate-50 hover:opacity-70"
					on:click={() => modalStore.trigger(modal)}
				>
					I'm Interested
				</button>

				<form
					method="POST"
					action={`/feed?${item.isFavoritedByCurrentUser ? '/unfavorite' : '/favorite'}`}
					use:enhance={submitFunction}
				>
					<input type="hidden" name="listing_id" value={item.id} />
					<button
						class={`btn py-2 !border-2 text-xl font-bold ${
							item.isFavoritedByCurrentUser ? 'bg-maristgrey text-slate-950' : 'text-slate-50'
						} hover:opacity-70 w-full`}
					>
						<span
							tabindex="0"
							role="button"
							class={`text-maristred text-2xl font-bold material-symbols-outlined ${
								item.isFavoritedByCurrentUser ? 'fill_symbol' : 'reg_symbol'
							} hover:cursor-pointer pr-2`}
						>
							favorite
						</span>
						{item.isFavoritedByCurrentUser ? 'Unfavorite' : 'Favorite'}
					</button>
				</form>
			{:else}
				<button
					class="btn border-0 py-2 bg-maristred text-xl font-bold text-slate-50 hover:opacity-70"
					on:click={() => (isEditing = true)}
				>
					<span
						tabindex="0"
						role="button"
						class="text-slate-50 text-2xl material-symbols-outlined hover:cursor-pointer pr-2"
					>
						edit_note
					</span>
					Edit
				</button>
			{/if}
		</div>

		<div class="text-slate-50 tracking-wide">
			<p class="grid place-items-center h-1/2 text-2xl text-center">
				"{item.description}"
			</p>

			<h1 class="text-xl font-bold">Sold By</h1>

			<div
				class="flex items-center p-4 bg-maristgrey h-32 text-slate-950 font-bold justify-around text-xl"
			>
				<h1>{seller.username}</h1>
				<p>|</p>
				<h1>{`${seller.itemsSold} ${seller.itemsSold == 1 ? 'item' : 'items'} sold`}</h1>
			</div>
		</div>
	</div>
</div>
