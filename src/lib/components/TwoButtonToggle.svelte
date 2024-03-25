<script lang="ts">
	export let isLeftActive: boolean = true;

	const activeButtonStyles = 'w-2/3 bg-maristred text-slate-50';
	const inactiveButtonStyles = 'w-1/3 bg-maristgrey text-slate-900';
</script>

<span class="flex w-[250px]">
	<button
		class={`btn ${isLeftActive ? activeButtonStyles : inactiveButtonStyles} `}
		on:click={() => (isLeftActive = true)}>Buying</button
	>
	<button
		class={`btn ${isLeftActive ? inactiveButtonStyles : activeButtonStyles} `}
		on:click={() => (isLeftActive = false)}>Selling</button
	>
</span>
