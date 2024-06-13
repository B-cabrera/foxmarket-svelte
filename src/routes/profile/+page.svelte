<script lang="ts">
	import { Ratings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Listing from '$lib/components/Listing.svelte';

	export let data: PageData;

	const { username, rating, listings, userID } = data;
</script>

<div class="w-full flex justify-center h-[calc(100vh-56px)]">
	<div class="flex flex-col w-2/3">
		<div class="flex mt-10 w-full gap-5 justify-center">
			<h1 class="text-2xl text-slate-50 tracking-wider rounded border w-min p-4">{username}</h1>

			{#if rating}
				<Ratings value={rating / 1} max={5} class="w-min !text-slate-50">
					<svelte:fragment slot="empty">
						<span class="material-symbols-outlined text-7xl font-light reg_symbol"> star </span>
					</svelte:fragment>
					<svelte:fragment slot="half">
						<span class="material-symbols-outlined text-7xl font-light reg_symbol">
							star_half
						</span>
					</svelte:fragment>
					<svelte:fragment slot="full">
						<span class="material-symbols-outlined text-7xl font-light fill_symbol"> star </span>
					</svelte:fragment>
				</Ratings>
			{:else}
				<div class="flex items-center">
					<h1 class="text-2xl text-slate-50 tracking-wider">No rating yet...</h1>
				</div>
			{/if}
		</div>

		<div id="items" class="w-full grid grid-cols-4 gap-8 pt-5">
			{#each listings as listing}
				<Listing {listing} {userID} />
			{/each}
		</div>
	</div>
</div>
