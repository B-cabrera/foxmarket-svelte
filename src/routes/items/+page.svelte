<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import type { ActionData, PageData } from './$types';
	import {
		SlideToggle,
		getModalStore,
		type ModalSettings,
		type ModalComponent,
		getToastStore,
	} from '@skeletonlabs/skeleton';
	import CreateListingModal from '$lib/components/CreateListingModal.svelte';

	export let data: PageData;
	export let form: ActionData;

	const userID = data.userID!;
	const modalStore = getModalStore();
	const modalComponent: ModalComponent = { ref: CreateListingModal };
	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
	};

	$: ({ listings } = data);

	$: filteredListings = listings;
	let searchQuery = '';
	let showSold = false;

	let toastStore = getToastStore();

	function filterListings() {
		filteredListings = listings.filter((item) => {
			return (
				item.listingTitle.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
				item.sold == showSold
			);
		});
	}

	// display toasts with form submission error messages
	if (form?.errors) {
		form.errors.forEach((error) => {
			toastStore.trigger({
				message: error,
				classes: 'bg-maristred text-slate-50 p-5 mt-2 rounded border-2 spacing',
			});
		});
	}

	$: {
		const searchDependency = searchQuery;
		const soldDependency = showSold;

		filterListings();
	}
</script>

<div class="flex flex-col items-center h-screen w-full gap-2">
	<h1 class="text-5xl text-slate-50 py-6 font-bold tracking-wider">My Items</h1>

	<div class="flex w-[55%] items-center gap-10">
		<i class="material-symbols-outlined reg_symbol text-maristgrey absolute px-2"> search </i>
		<input
			type="search"
			class="input pl-10 tracking-wider font-bold"
			placeholder="Search my items..."
			bind:value={searchQuery}
		/>

		<div class="flex items-center gap-2">
			<label for="soldToggle" class="text-slate-50">Sold Items</label>
			<SlideToggle
				id="soldToggle"
				name="showSold"
				bind:checked={showSold}
				active="bg-maristred"
				class="bg-maristgrey"
			/>
		</div>

		<button
			class="btn bg-maristred text-slate-50 text-xl borderround"
			on:click={() => modalStore.trigger(modal)}
		>
			Create Listing
		</button>
	</div>

	{#each filteredListings as item (item.id)}
		<Listing listing={item} display="row" {userID} />
	{/each}
</div>
