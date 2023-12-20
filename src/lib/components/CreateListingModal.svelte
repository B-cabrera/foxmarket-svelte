<script lang="ts">
	import Dorms from '$lib/utils/Dorms';
	import { FileDropzone, getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	let file: FileList;
</script>

<div class="flex flex-col bg-maristred w-1/2 h-max border items-center justify-center py-10">
	<form method="POST" class="flex flex-col w-2/3 gap-8 items-center">
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
			required
		/>

		<input
			name="size"
			type="text"
			class="input focus:border-slate-950 pl-2"
			placeholder="Size"
			maxlength="30"
			required
		/>

		<select name="location" class="w-1/2 text-center bg-maristgrey text-slate-950">
			{#each Object.values(Dorms) as dorm}
				<option value="dorm">{dorm}</option>
			{/each}
		</select>

		<FileDropzone
			name="files"
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
	</form>
</div>
