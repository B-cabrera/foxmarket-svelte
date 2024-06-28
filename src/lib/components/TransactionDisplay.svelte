<script lang="ts">
	import type { Prisma } from '@prisma/client';

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

	let allowRating = false;
</script>

<div class="w-5/6 text-slate-50 border p-4 flex justify-around items-center">
	{#if allowRating}
		<p>RATING HERE</p>

		<button class="btn bg-maristred">Submit</button>
		<button class="btn bg-maristgrey text-slate-950" on:click={() => (allowRating = false)}
			>Cancel</button
		>
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
