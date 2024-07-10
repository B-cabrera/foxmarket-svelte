<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Prisma } from '@prisma/client';
	import { Ratings, getToastStore } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let transaction: Prisma.TransactionGetPayload<{
		include: {
			buyer: true;
			seller: true;
			item: {
				select: {
					imageUrl: true;
				};
			};
		};
	}>;
	export let currentUserID: string;

	const toastStore = getToastStore();

	let allowRating = false;
	let rating = 1;
	let isSubmittingRating = false;
	let component: HTMLDivElement;

	function iconClick(event: CustomEvent<{ index: number }>): void {
		rating = event.detail.index;
	}

	const submitForm: SubmitFunction = () => {
		isSubmittingRating = true;

		return async ({ result }) => {
			if (result.type == 'success') {
				rating = 1;
				component.style.display = 'none';
			} else {
				toastStore.trigger({
					message:
						'Something went wrong trying to submit to your rating. Please wait and try again.',
					classes: 'bg-maristred text-slate-50  mt-2 rounded border-2 spacing',
				});
			}

			allowRating = false;
			isSubmittingRating = false;
		};
	};
</script>

<div
	bind:this={component}
	class="w-5/6 text-slate-50 border p-4 flex gap-4 justify-around items-center"
>
	{#if allowRating}
		<form action={`/${transaction.itemId}?/rate`} method="POST" use:enhance={submitForm}>
			<Ratings bind:value={rating} max={5} interactive on:icon={iconClick}>
				<svelte:fragment slot="empty">
					<span class="material-symbols-outlined text-3xl font-light reg_symbol"> star </span>
				</svelte:fragment>
				<svelte:fragment slot="half">
					<span class="material-symbols-outlined text-3xl font-light reg_symbol"> star_half </span>
				</svelte:fragment>
				<svelte:fragment slot="full">
					<span class="material-symbols-outlined text-3xl font-light fill_symbol"> star </span>
				</svelte:fragment>
			</Ratings>
			<input type="number" name="rating" bind:value={rating} hidden />
			<input name="transaction" bind:value={transaction.id} hidden />
			<input
				name="rated"
				value={currentUserID == transaction.buyerId ? transaction.sellerId : transaction.buyerId}
				hidden
			/>

			<button class="btn bg-maristred" disabled={isSubmittingRating}>Submit</button>
			<button
				class="btn bg-maristgrey text-slate-950"
				on:click={() => (allowRating = false)}
				type="button"
				disabled={isSubmittingRating}>Cancel</button
			>
		</form>
	{:else}
		<img src={transaction.item.imageUrl} alt="" class="w-1/6" />

		<p class="text-sm">
			You {currentUserID == transaction.buyerId
				? `bought from "${transaction.seller.username}"`
				: `sold to "${transaction.buyer.username}"`}
			on {transaction.time.toDateString()}
		</p>

		<button class="btn bg-maristred" on:click={() => (allowRating = true)}>Rate</button>
	{/if}
</div>
