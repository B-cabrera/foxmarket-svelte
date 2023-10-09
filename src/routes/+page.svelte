<script lang="ts">
	import students_photo from '$lib/images/marist-students.jpg';
	import Dorms from '$lib/utils/Dorms';

	const locations = Object.values(Dorms);
</script>

<div class="relative h-1/3">
	<img src={students_photo} class="opacity-30 w-full h-[690px]" alt="Marist students on campus." />
	<h1
		class="absolute text-7xl text-slate-50 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max font-semibold"
	>
		The Marist Student Marketplace
	</h1>

	<a
		href="/login"
		class="absolute btn top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5
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
