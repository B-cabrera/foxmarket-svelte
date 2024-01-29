<script lang="ts">
	import '../app.css';
	import logo from '$lib/images/foxmarketlogo.png';
	import ButtonContainer from '$lib/components/ButtonContainer.svelte';
	import { Modal, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	initializeStores();

	let showAuthedButtons: boolean;

	$: {
		const dep = $page.url.pathname;

		showAuthedButtons = !['/', '/login', '/signup'].includes($page.url.pathname);
	}
</script>

<nav class="sticky flex h-14 items-center top-0 bg-maristdarkgrey z-10">
	<a href="/">
		<img src={logo} alt="The FoxMarket Logo" class="w-[250px] px-4 py-2" />
	</a>
	<div class="flex w-[55%] items-center">
		<i class="material-symbols-outlined text-maristgrey absolute px-2"> search </i>
		<input type="search" class="input pl-10 tracking-wider font-bold" placeholder="Search" />
	</div>

	<ButtonContainer {showAuthedButtons} />
</nav>

<Toast max={4} buttonDismiss="pl-2 hover:text-slate-950" />
<Modal />

<slot />
