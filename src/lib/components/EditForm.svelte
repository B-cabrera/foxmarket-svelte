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
			value={item.listingTitle}
			required
		/>
		<textarea
			name="description"
			class="input focus:border-slate-950 pl-2 resize-none !h-1/2"
			rows="3"
			placeholder="Description"
			maxlength="100"
			value={item.description}
			required
		/>
		<input
			name="price"
			type="number"
			inputmode="numeric"
			class="input focus:border-slate-950 pl-2"
			placeholder="Price"
			value={item.price}
			required
		/>

		<input
			name="brand"
			type="text"
			class="input focus:border-slate-950 pl-2"
			placeholder="Brand"
			maxlength="30"
			value={item.brand}
			required
		/>
		<div class="flex w-full justify-between">
			<select name="size" class="bg-maristgrey w-1/3 text-center" value={item.size} required>
				<option selected disabled value="">Size</option>
				{#each Object.values(Sizes) as size}
					<option value={size}>{size}</option>
				{/each}
			</select>

			<select
				name="location"
				class="w-1/2 text-center bg-maristgrey"
				value={Dorms[item.location]}
				required
			>
				<option selected disabled value="">Location</option>
				{#each Object.values(Dorms) as dorm}
					<option value={dorm}>{dorm}</option>
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

		<button
			class="w-1/3 bg-maristgrey border-slate-950 border-2 mt-8 text-xl font-semibold py-1 hover:opacity-80 disabled:opacity-50 mb-3"
			disabled={isLoading}
		>
			{isLoading ? 'Submitting...' : 'List Item'}
		</button>
	</form>
</div>
