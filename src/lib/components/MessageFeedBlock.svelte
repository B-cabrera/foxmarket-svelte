<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { MessageWithoutID } from '../../routes/+layout.server';
	import MessageRow from './MessageRow.svelte';
	import { MESSAGE_CHUNK_AMOUNT } from '$lib/utils/utils';
	import { getToastStore } from '@skeletonlabs/skeleton';

	export let messageFeed: MessageWithoutID[];
	export let otherUserName: string | undefined;
	export let currentUserID: string;

	const DEBOUNCE_MS = 1000;

	let feedElem: HTMLElement;
	let unreadMessages: Set<{
		conversationId: string;
		timeSent: Date;
		content: string;
	}> = new Set();
	let debounceTimer: NodeJS.Timeout | null = null;
	let totalRetries = 0;
	let MAX_RETRIES = 3;
	let reachedBeginningIds: string[] = [];
	let upperScroll = false;
	let prevLocation = 0;
	let isLoading = false;
	let toastStore = getToastStore();

	onMount(() => {
		feedElem.addEventListener('scroll', async () => {
			if (messageFeed.length < -MESSAGE_CHUNK_AMOUNT) return;

			if (feedElem.scrollTop == 0 && !reachedBeginningIds.includes(chatId)) {
				isLoading = true;
				await getMoreMessages();
				isLoading = false;
			}
		});
	});

	function scrollChatBottom(): void {
		if (!feedElem) return;

		requestAnimationFrame(() => {
			// Scroll to the bottom
			feedElem.scrollTo({
				top: upperScroll ? feedElem.scrollHeight - prevLocation - 30 : feedElem.scrollHeight,
				behavior: 'instant',
			});

			upperScroll = false;
		});
	}

	$: messageFeed, scrollChatBottom();

	$: chatId = messageFeed[0].conversationId;

	$: senderName = otherUserName!;

	$: {
		const _ = messageFeed;

		browser && handleDebounce();
	}

	function handleDebounce() {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		for (let i = messageFeed.length - 1; i >= 0; i--) {
			let message = messageFeed[i];

			if (message.senderId != currentUserID) {
				if (message.read) break; // we found a prev read message, we can stop now

				message.read = true;

				unreadMessages.add({
					conversationId: message.conversationId,
					timeSent: message.timeSent,
					content: message.content,
				});
			}
		}

		if (!unreadMessages.size) return;

		debounceTimer = setTimeout(markMessagesAsRead, DEBOUNCE_MS);

		async function markMessagesAsRead() {
			if (unreadMessages.size > 0) {
				const messagesSetAsArray = Array.from(unreadMessages);

				const result = await fetch(`/api/chats/${messagesSetAsArray[0].conversationId}/read`, {
					method: 'PATCH',
					body: JSON.stringify(messagesSetAsArray),
				});

				if (!result.ok && totalRetries < MAX_RETRIES) {
					const message = await result.json();

					// just a delay
					await new Promise((resolve) => setTimeout(resolve, 1000));

					totalRetries++;

					await markMessagesAsRead();

					return;
				}

				if (totalRetries == MAX_RETRIES) {
					totalRetries = 0;
					return;
				}

				totalRetries = 0;
				unreadMessages.clear();
				debounceTimer = null;
			}
		}
	}

	async function getMoreMessages() {
		const lastMessage = messageFeed[0];

		const response = await fetch(`/api/chats/${lastMessage.conversationId}/${lastMessage.id}/more`);

		if (!response.ok && totalRetries < MAX_RETRIES) {
			const message = await response.json();

			// just a delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			totalRetries++;

			await getMoreMessages();

			return;
		}

		if (totalRetries == MAX_RETRIES) {
			// reached here if we failed too many times
			totalRetries = 0;

			toastStore.trigger({
				message: 'Failed to load previous messages, please wait then try again!',
				classes: 'bg-maristred text-slate-50 p-5 mt-2 rounded border-2 spacing',
			});

			return;
		}

		totalRetries = 0;
		const earlierMessages = (await response.json()).messages as MessageWithoutID[];

		upperScroll = true;

		prevLocation = feedElem.scrollHeight;
		messageFeed = [...earlierMessages, ...messageFeed];

		if (earlierMessages.length < -MESSAGE_CHUNK_AMOUNT && !reachedBeginningIds.includes(chatId))
			reachedBeginningIds.push(chatId);
	}
</script>

<div class=" p-4 overflow-y-auto h-full">
	{#if isLoading}
		<p class="text-slate-50 text-center">Loading...</p>
	{/if}

	<section bind:this={feedElem} class="w-full max-h-[82vh] overflow-y-auto space-y-4">
		{#each messageFeed as chat}
			<MessageRow
				{senderName}
				message={chat.content}
				isSentFromCurrentUser={currentUserID == chat.senderId}
			/>
		{/each}
	</section>
</div>
