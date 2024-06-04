<script lang="ts">
	import '../app.css';
	import logo from '$lib/images/foxmarketlogo.png';
	import ButtonContainer from '$lib/components/ButtonContainer.svelte';
	import { Modal, Toast, getToastStore, initializeStores } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import type { MessageWithoutID } from './+layout.server';
	import { afterNavigate, goto } from '$app/navigation';
	initializeStores();

	export let data: PageData;

	let showAuthedButtons: boolean;
	let isListenerSetup = false;
	let searchTerm = '';
	const { userChannel, userID } = data;
	let toastStore = getToastStore();

	$: messageStore = data.messageStore;

	afterNavigate(({ type }) => {
		if (type == 'link') searchTerm = '';
	});

	const setUpUserListener = () => {
		if (isListenerSetup || userID === undefined) return;

		userChannel.on('broadcast', { event: 'inMessage' }, (payload) => {
			const messageBatch: [string, MessageWithoutID[]][] = payload.payload.messages;

			messageStore.set(messageBatch);

			if ($page.url.pathname != '/chats') {
				toastStore.trigger({
					message: `You have ${messageBatch[0][1].length} new message${
						messageBatch[0][1].length > 1 ? 's' : ''
					} from ${messageBatch[0][1][0].username} about ${messageBatch[0][1][0].itemTitle}`,
					classes: 'bg-maristdarkgrey text-slate-50 p-5 mt-2 rounded border-2 spacing',
					timeout: 1500,
				});
			}
		});

		isListenerSetup = true;
	};

	const sendSearch = async () => {
		if (searchTerm.trim() == '') return;

		await goto(`/feed?search=${searchTerm}`);
	};

	onMount(() => {
		setUpUserListener();

		document.getElementById('searchInput')?.addEventListener('keydown', (event) => {
			if (event.code === 'Enter' && !event.shiftKey) {
				sendSearch();

				event.preventDefault();
			}
		});
	});

	onDestroy(() => {
		userChannel.unsubscribe();
	});

	$: {
		const dep = $page.url.pathname;

		showAuthedButtons = !['/', '/login', '/signup'].includes($page.url.pathname);
	}
</script>

<nav class="sticky flex h-14 items-center top-0 bg-maristdarkgrey z-10 w-full">
	<a href={showAuthedButtons ? '/feed' : '/'}>
		<img src={logo} alt="The FoxMarket Logo" class="w-[250px] px-4 py-2" />
	</a>
	{#if showAuthedButtons}
		<div class="flex w-[55%] items-center">
			<i class="material-symbols-outlined reg_symbol text-maristgrey absolute px-2"> search </i>
			<input
				id="searchInput"
				type="search"
				bind:value={searchTerm}
				class="input pl-10 tracking-wider font-bold"
				placeholder="Search"
				autocomplete="off"
			/>
		</div>
		{:else}
		<div class="w-[55%] text-center">
			<p class="text-2xl text-slate-50">FoxMarket: The Marist Student Marketplace</p>
		</div>
	{/if}

	<ButtonContainer {showAuthedButtons} />
</nav>

<Toast max={4} buttonDismiss="pl-2 hover:text-slate-950" />
<Modal />

<slot />
