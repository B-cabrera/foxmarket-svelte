<script lang="ts">
	export let selections: string[];
	export let chosen: string[];
</script>

<div class="flex flex-col gap-3 w-full px-3 max-h-60 overflow-y-scroll">
	{#each selections as selection}
		<label class="flex items-center space-x-2">
			<input
				class="checkbox"
				type="checkbox"
				checked={chosen.indexOf(selection) > -1}
				on:click={(e) => {
					if (e.currentTarget.checked) {
						chosen = [...chosen, selection];
					} else {
						const index = chosen.indexOf(selection);

						if (index > -1) {
							chosen.splice(index, 1);

							chosen = chosen;
						}
					}
				}}
			/>
			<p>{selection}</p>
		</label>
	{/each}
</div>
