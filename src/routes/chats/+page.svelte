<script lang="ts">
	import MessageInput from '$lib/components/MessageInput.svelte';
	import MessageFeedBlock from '$lib/components/MessageFeedBlock.svelte';
	import TwoButtonToggle from '$lib/components/TwoButtonToggle.svelte';
	import type { PageData } from './$types';
	import ChatListDisplay from '$lib/components/ChatListDisplay.svelte';
	import type { ChatInformation } from './+page.server';
	import type { MessageWithoutID } from '../+layout.server';

	export let data: PageData;
	const { buyingChatMap, sellingChatMap, userChannel, messageStore } = data;

	messageStore.subscribe((batch) => {
		if (batch) {
			batch.forEach((conversationWithMessages) => {
				const [conversationID, messages] = conversationWithMessages;

				if (buyingChatMap.has(conversationID)) {
					const buyingConvo = buyingChatMap.get(conversationID)!;

					buyingConvo.Message.push(...messages);

					if (activeChatId == conversationID) activeChat = buyingConvo;
				} else if (sellingChatMap.has(conversationID)) {
					const sellingConvo = sellingChatMap.get(conversationID)!;

					sellingConvo.Message.push(...messages);

					if (activeChatId == conversationID) activeChat = sellingConvo;
				}
			});
		}
	});

	let currentMessage = '';
	let isBuyingActive = true;
	let activeChatId = Array.from(buyingChatMap.entries())[0][0];
	let activeChat: ChatInformation;
	const userID = data.userID!;
	const username = data.username!;

	const sendMessage = () => {
		if (currentMessage.trim() === '') {
			currentMessage = '';
			return;
		}

		const newMessage: MessageWithoutID = {
			conversationId: activeChat.id,
			itemTitle: activeChat.item.listingTitle,
			username,
			timeSent: new Date(Date.now()),
			senderId: userID,
			receiverId: activeChat.sellerId == userID ? activeChat.buyerId : activeChat.sellerId,
			content: currentMessage,
		};

		userChannel.send({
			type: 'broadcast',
			event: 'outMessage',
			payload: {
				newMessage,
			},
		});

		// optomistic update
		// TODO: need a way here to know if messages were sent successfully
		activeChat.Message.push(newMessage);
		activeChat = activeChat;

		currentMessage = '';
	};

	$: {
		if (isBuyingActive) {
			activeChatId = buyingChatMap.has(activeChatId)
				? activeChatId
				: Array.from(buyingChatMap.entries())[0][0];
			activeChat = buyingChatMap.get(activeChatId)!;
		} else {
			activeChatId = sellingChatMap.has(activeChatId)
				? activeChatId
				: Array.from(sellingChatMap.entries())[0][0];
			activeChat = sellingChatMap.get(activeChatId)!;
		}
	}
</script>

<div class="h-[calc(100vh-56px)] w-full grid grid-cols-[250px_1fr]">
	<div class="flex flex-col items-center border pt-0">
		<TwoButtonToggle bind:isLeftActive={isBuyingActive} />
		<ChatListDisplay bind:activeChatId chatMap={isBuyingActive ? buyingChatMap : sellingChatMap} />
	</div>
	<div class="border">
		<div class="h-full grid grid-rows-[1fr_auto]">
			<MessageFeedBlock
				otherUserName={isBuyingActive ? activeChat.seller?.username : activeChat.buyer?.username}
				bind:messageFeed={activeChat.Message}
				currentUserID={userID}
			/>
			<MessageInput bind:currentMessage {sendMessage} />
		</div>
	</div>
</div>
