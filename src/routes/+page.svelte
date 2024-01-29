<script lang="ts">
	import students_photo from '$lib/images/marist-students.jpg';
	import Dorms from '$lib/utils/Dorms';
	import logo from '$lib/images/foxmarketlogo.png';

	const locations = Object.values(Dorms);
</script>

<div class="relative h-1/3">
	<img src={students_photo} class="opacity-30 w-full h-[690px]" alt="Marist students on campus." />
	<img
		src={logo}
		alt="The FoxMarket Logo"
		class="px-4 py-2 absolute text-7xl text-slate-50 top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 font-semibold"
	/>
	<h1
		class="absolute text-7xl text-slate-50 top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-max font-semibold"
	>
		The Marist Student Marketplace
	</h1>

	<a
		href={'/login'}
		class="absolute btn top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5
    font-semibold text-2xl !border-2 text-slate-50 hover:text-maristgrey hover:border-maristgrey"
	>
		Shop Now
	</a>
</div>

<div class="pt-10 text-2xl font-semibold text-slate-50 pl-4">
	<h1>Shop By Location</h1>

	<div
		class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-3 overflow-x-auto px-4 py-10"
	>
		{#each locations as location}
			<!--TODO: implement the routing when cards are pressed -->
			<a href={`/${location}`} class="snap-start shrink-0 card text-center">{location}</a>
		{/each}
	</div>
</div>

<div class="flex h-[800px] pt-14">
	<div class="w-1/2 bg-maristred text-slate-50 text-center">
		<div class="grid h-1/2 place-items-center w-96 mx-auto">
			<h1 class="text-6xl font-bold">Sold & Bought by Students</h1>
		</div>

		<div class="flex flex-col h-1/2 items-center justify-center w-96 mx-auto gap-10 text-2xl">
			<p class="font-medium">Sell your unwanted items or clothes to your fellow students!</p>
			<a
				href={'/login'}
				class="btn !border-2 hover:text-maristgrey hover:border-maristgrey text-xl py-5 px-2"
			>
				Sell Now
			</a>
		</div>
	</div>

	<div class="w-1/2 bg-maristgrey text-slate-950 text-center">
		<div class="flex flex-col h-1/2 items-center justify-center w-96 mx-auto gap-10 text-2xl">
			<p class="font-medium">
				All items are posted by students, and all items are bought by students.
			</p>
			<a href={'/login'} class="btn !border-2 hover:opacity-40 border-slate-950 text-xl py-5 px-2">
				Shop Now
			</a>
		</div>

		<div class="grid h-1/2 place-items-center w-96 mx-auto">
			<h1 class="text-6xl font-bold">The Marist Marketplace</h1>
		</div>
	</div>
</div>
