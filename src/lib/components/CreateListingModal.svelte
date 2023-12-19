<script lang="ts">
	import Dorms from '$lib/utils/Dorms';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
</script>

<div class="flex flex-col bg-maristred w-1/2 h-[60vh] border items-center justify-center">
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
	</form>
</div>
