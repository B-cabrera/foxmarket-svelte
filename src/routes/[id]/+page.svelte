<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import ListingInfoDisplay from '$lib/components/ListingInfoDisplay.svelte';

	export let data: PageData;

	$: ({ theItem: item } = data);

	const seller = { username: data.sellerUsername, itemsSold: data.sellerItemsSold };
	const viewingUserID = data.userID!;
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
	<ListingInfoDisplay {item} {seller} {viewingUserID} submitFunction={submitForm} />
</div>
