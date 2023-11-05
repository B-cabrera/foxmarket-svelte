<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';

	let toastStore = getToastStore();

	async function logUserOut() {
		const response = await fetch(`http://localhost:5173/api/users/logout`, {
			method: 'POST',
		});

		if (response.ok) {
			window.location.pathname = '/'; // redirect to home page
			return;
		}

		// on logout failure
		toastStore.trigger({
			message: 'Error occurred while trying to log you out. Please try again',
			classes: 'bg-maristred text-slate-50 p-5 mt-2 rounded border-2 spacing',
		});
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
