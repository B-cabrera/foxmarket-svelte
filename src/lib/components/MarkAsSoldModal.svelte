<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Ratings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let buyerList: { username: string; id: string }[];
	export let itemID: string;
	export let closeFunction: () => void;

	let phase = 0;
	let rating = 1;
	let transactionID = '';
	let buyerID = '';

	const sellSubmitFunction: SubmitFunction = ({ formData }) => {
		return async ({ result }) => {
			if (result.type == 'success') {
				buyerID = JSON.parse(formData.get('buyer') as string).id;
				transactionID = result.data!.transactionID;
				phase = 1;
			}

			await applyAction(result);
		};
	};

	const rateSubmitFunction: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type == 'success') {
				closeFunction();
				await goto('/items');
			}

			await applyAction(result);
		};
	};

	function iconClick(event: CustomEvent<{ index: number }>): void {
		rating = event.detail.index;
	}
</script>

<div class="flex flex-col items-center gap-10 bg-maristred w-1/2 text-slate-50 h-max border p-5">
	{#if phase == 0}
		<div>
			<h1 class="text-2xl text-center font-bold">
				Ready to Sell? Please choose the buyer from the choices below:
			</h1>
			<h1 class="text-center">(Buyers are chosen from your current conversations)</h1>
		</div>

		<form
			method="POST"
			action="/items?/sell"
			class="flex justify-center w-full gap-4"
			use:enhance={sellSubmitFunction}
		>
			<select name="buyer" class="w-1/3 text-slate-950 text-center bg-maristgrey" required>
				<option selected disabled value="">Buyer</option>
				{#each buyerList as buyer}
					<option
						value={JSON.stringify({
							...buyer,
							item: itemID,
						})}>{buyer.username}</option
					>
				{/each}
			</select>

			<button class="btn">Sell!</button>
		</form>
	{:else}
		<div>
			<h1 class="text-2xl text-center font-bold">One more step...</h1>
			<h1 class="text-xl italic text-center font-bold">Rate your buyer!!</h1>
		</div>

		<form
			method="POST"
			action={`/${itemID}?/rate`}
			class="flex flex-col items-center"
			use:enhance={rateSubmitFunction}
		>
			<Ratings bind:value={rating} max={5} interactive on:icon={iconClick}>
				<svelte:fragment slot="empty">
					<span class="material-symbols-outlined text-7xl font-light reg_symbol"> star </span>
				</svelte:fragment>
				<svelte:fragment slot="half">
					<span class="material-symbols-outlined text-7xl font-light reg_symbol"> star_half </span>
				</svelte:fragment>
				<svelte:fragment slot="full">
					<span class="material-symbols-outlined text-7xl font-light fill_symbol"> star </span>
				</svelte:fragment>
			</Ratings>

			<input type="number" name="rating" bind:value={rating} hidden />
			<input name="transaction" bind:value={transactionID} hidden />
			<input name="buyer" bind:value={buyerID} hidden />
			<div>
				<button class="btn">Rate!</button>
				<button
					type="button"
					class="hover:underline"
					on:click={async () => {
						closeFunction();
						await goto('/items');
					}}>...or skip and do it later</button
				>
			</div>
		</form>
	{/if}
</div>
