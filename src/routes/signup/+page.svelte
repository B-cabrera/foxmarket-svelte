<script lang="ts">
	import logo from '$lib/images/foxmarketlogo.png';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';
	import type { LayoutData } from '../$types';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let form: ActionData;
	export let data: LayoutData;

	const loggedIn = data.loggedIn;

	// redirect to home page if user is already logged in
	if (loggedIn && browser) goto('/');

	let toastStore = getToastStore();

	// display toasts with form submission error messages
	if (form?.errors) {
		form.errors.forEach((error) => {
			toastStore.trigger({
				message: error,
				classes: 'bg-maristred text-slate-50 p-5 mt-2 rounded border-2 spacing',
			});
		});
	}

	let password1 = '';
	let password2 = '';

	$: match = password1 === password2;

	// NOTE: client side validation maybe ?
</script>

<div class="grid place-items-center h-[calc(100vh-56px)]">
	<div class="flex flex-col bg-maristred w-2/5 border shadow-2xl items-center gap-10">
		<img src={logo} alt="FoxMarket Logo" class="w-3/4 pt-6" />
		<p class="text-slate-50 text-2xl font-semibold">Join FoxMarket!</p>

		<form method="POST" class="flex flex-col w-2/3 gap-8 items-center">
			<input
				name="username"
				type="text"
				class="input focus:border-slate-950 pl-2"
				placeholder="Username"
				required
			/>
			<input
				name="email"
				type="email"
				class="input focus:border-slate-950 pl-2"
				placeholder="Email"
				required
			/>
			<input
				bind:value={password1}
				name="password"
				type="password"
				class="input focus:border-slate-950 pl-2"
				placeholder="Password"
				required
			/>
			<input
				bind:value={password2}
				name="password2"
				type="password"
				class="input focus:border-slate-950 pl-2"
				placeholder="Confirm Password"
				required
			/>

			<!-- Displaying message for passwords not matching. -->
			{#if !match}
				<p class="text-slate-50">Passwords don't match.</p>
			{/if}

			<button
				class="w-1/3 bg-maristgrey border-slate-950 border-2 mt-8 text-xl font-semibold py-1 hover:opacity-80 disabled:opacity-50 mb-3"
				disabled={!match}
			>
				Sign Up
			</button>
		</form>
	</div>
</div>
