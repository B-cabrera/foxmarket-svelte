<script lang="ts">
	import Dorms from '$lib/utils/Dorms';
	import Sizes from '$lib/utils/Sizes';
	import type { Listing } from '@prisma/client';
	import { FileDropzone } from '@skeletonlabs/skeleton';

	interface ListingWithFavoriteBool extends Listing {
		isFavoritedByCurrentUser?: string;
	}

	let file: FileList;
	let isLoading = false;

	export let item: ListingWithFavoriteBool;
	export let isEditing: boolean;

	const originalItem = item;
	const editedItem = {
		editedTitle: item.listingTitle,
		editedDescription: item.description,
		editedPrice: item.price,
		editedBrand: item.brand,
		editedSize: item.size,
		editedLocation: item.location,
	};
</script>

<div class="flex items-center justify-center w-2/5">
	<form
		method="POST"
		class="flex flex-col w-2/3 gap-8 items-center"
		enctype="multipart/form-data"
		autocomplete="off"
	>
		<input
			name="title"
			type="text"
			class="input focus:border-slate-950 pl-2"
			placeholder="Title"
			maxlength="30"
			bind:value={editedItem.editedTitle}
			required
		/>
		<textarea
			name="description"
			class="input focus:border-slate-950 pl-2 resize-none !h-1/2"
			rows="3"
			placeholder="Description"
			maxlength="100"
			bind:value={editedItem.editedDescription}
			required
		/>
		<input
			name="price"
			type="number"
			inputmode="numeric"
			class="input focus:border-slate-950 pl-2"
			placeholder="Price"
			bind:value={editedItem.editedPrice}
			required
		/>

		<input
			name="brand"
			type="text"
			class="input focus:border-slate-950 pl-2"
			placeholder="Brand"
			maxlength="30"
			bind:value={editedItem.editedBrand}
			required
		/>
		<div class="flex w-full justify-between">
			<select
				name="size"
				class="bg-maristgrey w-1/3 text-center"
				bind:value={editedItem.editedSize}
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
				bind:value={editedItem.editedLocation}
				required
			>
				<option selected disabled value="">Location</option>
				{#each Object.entries(Dorms) as [dormKey, dormValue]}
					<option value={dormKey}>{dormValue}</option>
				{/each}
			</select>
		</div>

		<FileDropzone
			name="file"
			class="text-slate-50"
			accept="image/jpg, image/png, image/jpeg, image/heic"
			bind:files={file}
			required
		>
			<svelte:fragment slot="lead">
				{#if !file}
					<span class="material-symbols-outlined text-5xl"> upload_file </span>
				{:else}
					<span class="material-symbols-outlined text-5xl"> image </span>
				{/if}
			</svelte:fragment>

			<svelte:fragment slot="message">
				{#if !file}
					<p class="font-bold tracking-wide">
						Upload or drag and drop a photo of your item to replace current image!
					</p>
				{:else}
					<p class="font-bold tracking-wide text-xl">{file.item(0)?.name}</p>
				{/if}
			</svelte:fragment>
		</FileDropzone>

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
