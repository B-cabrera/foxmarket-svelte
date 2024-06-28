<script lang="ts">
	import type { Prisma } from '@prisma/client';

	export let transaction: Prisma.TransactionGetPayload<{
		include: {
			buyer: true;
			seller: true;
		};
	}>;
	export let currentUserID: string;
</script>

<div class="w-5/6 text-slate-50 border p-4 flex justify-around items-center">
	<p class="text-sm">
		You {currentUserID == transaction.buyerId
			? `bought from "${transaction.seller.username}"`
			: `sold to "${transaction.buyer.username}"`}
		on {transaction.time.toDateString()}
	</p>

	<button class="btn bg-maristred">Rate</button>
</div>
