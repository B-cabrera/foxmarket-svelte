<script lang="ts">
	import { applyAction } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import ListingInfoDisplay from '$lib/components/ListingInfoDisplay.svelte';
	import EditForm from '$lib/components/EditForm.svelte';
	import type { ActionData } from '../items/$types';
	import { getToastStore } from '@skeletonlabs/skeleton';

	export let data: PageData;
	export let form: ActionData;
	let toastStore = getToastStore();

	$: {
		const errors = form?.errors;

		if (errors) {
			errors.forEach((error) => {
				toastStore.trigger({
					message: `Edit failed: ${error}`,
					classes: 'bg-maristred text-slate-50 p-5 mt-2 rounded border-2 spacing',
				});
			});
		}
	}

	$: ({ theItem: item } = data);

	const seller = { username: data.sellerUsername, itemsSold: data.sellerItemsSold };
	const viewingUserID = data.userID!;
	let isEditing = false;
	let isLoading: boolean;

	const submitForm: SubmitFunction = () => {
		isLoading = true;

		return async ({ result }) => {
			isLoading = false;

			if (result.type === 'redirect') {
				await goto(`/${item.id}`, {
					invalidateAll: true,
				});
			} else {
				await applyAction(result);
			}
		};
	};
</script>

<div class="flex w-full h-[calc(100vh-56px)]">
	<div class="w-3/5 grid place-items-center">
		<img class="w-4/6 aspect-square" src={item.imageUrl} alt="" />
	</div>
	{#if isEditing}
		<EditForm bind:isEditing {item} />
	{:else}
		<ListingInfoDisplay
			{item}
			{seller}
			{viewingUserID}
			submitFunction={submitForm}
			bind:isEditing
		/>
	{/if}
</div>
