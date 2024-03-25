<script lang="ts">
	import MessageInput from '$lib/components/MessageInput.svelte';
	import MessageFeedBlock from '$lib/components/MessageFeedBlock.svelte';
	import TwoButtonToggle from '$lib/components/TwoButtonToggle.svelte';
	import type { PageData } from './$types';
	import ChatListDisplay from '$lib/components/ChatListDisplay.svelte';
	import type { ChatInformation } from './+page.server';

	export let data: PageData;
	const { buyingChats, sellingChats } = data;

	let currentMessage = '';
	let isBuyingActive = true;
	let activeChatIndex = 0;
	let activeChat: ChatInformation;
	const userID = data.userID!;

	$: {
		if (isBuyingActive) {
			activeChatIndex = activeChatIndex >= buyingChats.length ? 0 : activeChatIndex;
			activeChat = buyingChats[activeChatIndex];
		} else {
			activeChatIndex = activeChatIndex >= sellingChats.length ? 0 : activeChatIndex;
			activeChat = sellingChats[activeChatIndex];
		}
	}
</script>

<div class="h-[calc(100vh-56px)] w-full grid grid-cols-[250px_1fr]">
	<div class="flex flex-col items-center border pt-0">
		<TwoButtonToggle bind:isLeftActive={isBuyingActive} />
		<ChatListDisplay bind:activeChatIndex chatList={isBuyingActive ? buyingChats : sellingChats} />
	</div>
	<div class="border">
		<div class="h-full grid grid-rows-[1fr_auto]">
			<MessageFeedBlock
				otherUserName={isBuyingActive ? activeChat.seller?.username : activeChat.buyer?.username}
				messageFeed={activeChat.Message}
				currentUserID={userID}
			/>
			<MessageInput {currentMessage} />
		</div>
	</div>
</div>
