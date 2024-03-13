<script lang="ts">
	import logo from '$lib/images/foxmarketlogo.png';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let toastStore = getToastStore();

	// display toasts on form submission failure
	if (form?.error) {
		toastStore.trigger({
			message: 'Invalid email or password.',
			classes: 'bg-maristred text-slate-50 p-5 mt-2 rounded border-2 spacing',
		});
	}
</script>

<div class="flex flex-col justify-center items-center pt-20">
	<img src={logo} class="w-1/2" alt="FoxMarket Logo" />
</div>

<form method="POST" class="flex flex-col items-center mt-20 gap-8" autocomplete="off">
	<input name="email" type="text" class="input w-1/2 !h-10 pl-4" placeholder="Email" />
	<input name="password" type="password" class="input w-1/2 !h-10 pl-4" placeholder="Password" />

	<button class="w-[20%] py-2 bg-maristred text-xl font-bold text-slate-50 hover:opacity-70"
		>Login</button
	>
</form>
