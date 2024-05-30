<script lang="ts">
	export let label: string;

	let showMenu = false;
</script>

<div class="text-slate-50">
	<hr />
	<button on:click={() => (showMenu = !showMenu)} class="w-full flex p-3 justify-between">
		<p>{label}</p>
		{#if showMenu}
			<span class="material-symbols-outlined"> keyboard_arrow_up </span>
		{:else}
			<span class="material-symbols-outlined"> keyboard_arrow_down </span>
		{/if}
	</button>

	{#if showMenu}
		<slot />
	{/if}
	<hr />
</div>
