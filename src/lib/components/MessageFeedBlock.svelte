<script lang="ts">
	import { browser } from '$app/environment';
	import type { MessageWithoutID } from '../../routes/+layout.server';
	import MessageRow from './MessageRow.svelte';

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

	function scrollChatBottom(): void {
		if (!feedElem) return;

		requestAnimationFrame(() => {
			// Scroll to the bottom
			feedElem.scrollTo({
				top: feedElem.scrollHeight,
				behavior: 'instant',
			});
		});
	}

	$: messageFeed, scrollChatBottom();

	$: senderName = otherUserName!;

	$: {
		const _ = messageFeed;

		browser && handleDebounce();
	}

	function handleDebounce() {
		console.log('here');

		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		messageFeed.forEach((message) => {
			if (message.senderId != currentUserID && !message.read) {
				message.read = true;

				unreadMessages.add({
					conversationId: message.conversationId,
					timeSent: message.timeSent,
					content: message.content,
				});
			}
		});

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

				unreadMessages.clear();
				debounceTimer = null;
			}
		}
	}
</script>

<div class=" p-4 overflow-y-auto h-full">
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
