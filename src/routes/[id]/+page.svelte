<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const item = data.theItem;
	const seller = { username: data.sellerUsername, itemsSold: data.sellerItemsSold };
</script>

<div class="flex w-full h-[calc(100vh-56px)]">
	<div class="w-2/3 grid place-items-center">
		<img class="w-4/6" src={item.imageUrl} alt="" />
	</div>

	<div class="flex items-center w-1/3">
		<div class="flex flex-col items-center h-3/4 w-4/6">
			<div class="text-slate-50">
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
				<button
					class="btn !border-0 py-2 bg-maristred text-xl font-bold text-slate-50 hover:opacity-70"
				>
					I'm Interested
				</button>
				<button class="btn py-2 !border-2 text-xl font-bold text-slate-50 hover:opacity-70">
					Favorite
				</button>
			</div>

			<div class="pt-10 text-slate-50 tracking-wide">
				<h1 class="text-xl font-bold">Description</h1>

				<p class="grid place-items-center h-32 text-2xl text-center">
					{item.description}
				</p>

				<h1 class="pt-10 text-xl font-bold">Sold By</h1>

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
</div>
