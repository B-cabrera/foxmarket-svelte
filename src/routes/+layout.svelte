<script lang="ts">
	import '../app.css';
	import logo from '$lib/images/foxmarketlogo.png';
	import ButtonContainer from '$lib/components/ButtonContainer.svelte';
	import { Modal, Toast, getToastStore, initializeStores } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import type { MessageWithoutID } from './+layout.server';
	initializeStores();

	export let data: PageData;

	let showAuthedButtons: boolean;
	let isListenerSetup = false;
	const { userChannel, userID } = data;
	let toastStore = getToastStore();

	$: messageStore = data.messageStore;

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

	onMount(() => {
		setUpUserListener();
	});

	onDestroy(() => {
		userChannel.unsubscribe();
	});

	$: {
		const dep = $page.url.pathname;

		showAuthedButtons = !['/', '/login', '/signup'].includes($page.url.pathname);
	}
</script>

<nav class="sticky flex h-14 items-center top-0 bg-maristdarkgrey z-10 w-screen">
	<a href={showAuthedButtons ? '/feed' : '/'}>
		<img src={logo} alt="The FoxMarket Logo" class="w-[250px] px-4 py-2" />
	</a>
	<div class="flex w-[55%] items-center">
		<i class="material-symbols-outlined reg_symbol text-maristgrey absolute px-2"> search </i>
		<input type="search" class="input pl-10 tracking-wider font-bold" placeholder="Search" />
	</div>

	<ButtonContainer {showAuthedButtons} />
</nav>

<Toast max={4} buttonDismiss="pl-2 hover:text-slate-950" />
<Modal />

<slot />
