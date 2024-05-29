<script lang="ts">
	import { enhance } from '$app/forms';
	import Dorms from '$lib/utils/Dorms';
	import Sizes from '$lib/utils/Sizes';
	import { FileDropzone, getModalStore } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import BrandSearch from './BrandSearch.svelte';

	const modalStore = getModalStore();
	let file: FileList;
	let isLoading = false;
	let brandInput = '';
	let selectedBrand = false;

	const submitForm: SubmitFunction = ({ formData }) => {
		isLoading = true;
		formData.set('brand', brandInput);

		return async ({ update }) => {
			isLoading = false;
			await update();

			modalStore.close();
		};
	};
</script>

<div class="flex flex-col bg-maristred w-1/2 h-max border items-center justify-center py-10">
	<form
		method="POST"
		class="flex flex-col w-2/3 gap-8 items-center"
		action="/items?/new"
		enctype="multipart/form-data"
		use:enhance={submitForm}
		autocomplete="off"
	>
		<input
			name="title"
			type="text"
			class="input focus:border-slate-950 pl-2"
			placeholder="Title"
			maxlength="30"
			required
		/>
		<textarea
			name="description"
			class="input focus:border-slate-950 pl-2 resize-none !h-1/2"
			rows="3"
			placeholder="Description"
			maxlength="100"
			required
		/>
		<input
			name="price"
			type="number"
			inputmode="numeric"
			class="input focus:border-slate-950 pl-2"
			placeholder="Price"
			required
		/>

		<input
			name="brand"
			type="text"
			class="input focus:border-slate-950 pl-2"
			placeholder="Brand"
			maxlength="30"
			bind:value={brandInput}
			disabled={selectedBrand}
			required
		/>
		<BrandSearch bind:value={brandInput} bind:selectedBrand />

		<div class="flex w-full justify-between">
			<select name="size" class="bg-maristgrey w-1/3 text-center" required>
				<option selected disabled value="">Size</option>
				{#each Object.values(Sizes) as size}
					<option value={size}>{size}</option>
				{/each}
			</select>

			<select name="location" class="w-1/2 text-center bg-maristgrey" required>
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
					<p class="font-bold tracking-wide">Upload or drap and drop a photo of your item!.</p>
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
