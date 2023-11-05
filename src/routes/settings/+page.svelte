<script lang="ts">
	async function logUserOut() {
		console.log('Logging user out....');
	}
</script>

<div class="flex w-screen h-screen justify-center items-center">
	<button
		class="btn !border-0 w-[20%] py-2 bg-maristred text-xl font-bold text-slate-50 hover:opacity-70"
		on:click={logUserOut}
	>
		Logout
	</button>
</div>
