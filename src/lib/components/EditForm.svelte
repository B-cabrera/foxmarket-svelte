<script lang="ts">
	import { enhance } from '$app/forms';
	import Dorms from '$lib/utils/Dorms';
	import Sizes from '$lib/utils/Sizes';
	import type { Listing } from '@prisma/client';
	import type { SubmitFunction } from '@sveltejs/kit';

	interface ListingWithFavoriteBool extends Listing {
		isFavoritedByCurrentUser?: string;
	}

	let isLoading = false;

	export let item: ListingWithFavoriteBool;
	export let isEditing: boolean;

	const originalItem = item;
	const editedItem = {
		listingTitle: item.listingTitle,
		description: item.description,
		price: item.price,
		brand: item.brand,
		size: item.size,
		location: item.location,
	};

	const submitForm: SubmitFunction = ({ formData, cancel }) => {
		isLoading = true;
		const uneditedFields = getUneditedFieldNames();
		const noFieldsEdited = uneditedFields.length === 6;

		if (noFieldsEdited) {
			isLoading = false;

			cancel();
		}

		// send only the edit fields
		for (let uneditedFieldName of uneditedFields) {
			formData.delete(uneditedFieldName);
		}

		formData.append('id', item.id);

		return async ({ update }) => {
			isLoading = false;
			isEditing = false;

			await update();
		};
	};

	function getUneditedFieldNames(): string[] {
		const uneditedFieldNames: string[] = [];

		for (const [key, editedValue] of Object.entries(editedItem)) {
			const originalValue = originalItem[key as keyof typeof originalItem];

			if (editedValue === originalValue) {
				uneditedFieldNames.push(key === 'listingTitle' ? 'title' : key);
			}
		}

		return uneditedFieldNames;
	}
</script>

<div class="flex items-center justify-center w-2/5">
	<form
		method="POST"
		class="flex flex-col w-2/3 gap-8 items-center"
		enctype="multipart/form-data"
		action="/items?/edit"
		use:enhance={submitForm}
		autocomplete="off"
	>
		<input
			name="title"
			type="text"
			class="input focus:border-slate-950 pl-2"
			placeholder="Title"
			maxlength="30"
			bind:value={editedItem.listingTitle}
			required
		/>
		<textarea
			name="description"
			class="input focus:border-slate-950 pl-2 resize-none !h-1/2"
			rows="3"
			placeholder="Description"
			maxlength="100"
			bind:value={editedItem.description}
			required
		/>
		<input
			name="price"
			type="number"
			inputmode="numeric"
			class="input focus:border-slate-950 pl-2"
			placeholder="Price"
			bind:value={editedItem.price}
			required
		/>

		<input
			name="brand"
			type="text"
			class="input focus:border-slate-950 pl-2"
			placeholder="Brand"
			maxlength="30"
			bind:value={editedItem.brand}
			required
		/>
		<div class="flex w-full justify-between">
			<select
				name="size"
				class="bg-maristgrey w-1/3 text-center"
				bind:value={editedItem.size}
				required
			>
				<option selected disabled value="">Size</option>
				{#each Object.values(Sizes) as size}
					<option value={size}>{size}</option>
				{/each}
			</select>

			<select
				name="location"
				class="w-1/2 text-center bg-maristgrey"
				bind:value={editedItem.location}
				required
			>
				<option selected disabled value="">Location</option>
				{#each Object.entries(Dorms) as [dormKey, dormValue]}
					<option value={dormKey}>{dormValue}</option>
				{/each}
			</select>
		</div>

		<div class="flex justify-evenly w-full">
			<button
				class="w-1/3 bg-maristred border-slate-50 border-2 mt-8 text-xl text-slate-50 py-1 hover:opacity-80 disabled:opacity-50 mb-3"
				disabled={isLoading}
			>
				{isLoading ? 'Submitting...' : 'List Item'}
			</button>
			<button
				class="w-1/3 bg-maristgrey border-slate-950 border-2 mt-8 text-xl text-slate-950 py-1 hover:opacity-80 disabled:opacity-50 mb-3"
				type="button"
				disabled={isLoading}
				on:click={() => (isEditing = false)}
			>
				Cancel
			</button>
		</div>
	</form>
</div>
