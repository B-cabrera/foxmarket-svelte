<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let buyerList: { username: string; id: string }[];
	export let itemID: string;
	export let closeFunction: () => void;

	let phase = 0;

	const submitFunction: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type == 'success') {
				phase = 1;
			}

			await applyAction(result);
		};
	};
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
			use:enhance={submitFunction}
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
			<p>RATE THE SELLERRRR</p>
		</div>
	{/if}
</div>
