<script lang="ts">
	import type { MessageWithoutID } from '../../routes/+layout.server';
	import MessageRow from './MessageRow.svelte';

	export let messageFeed: MessageWithoutID[];
	export let otherUserName: string | undefined;
	export let currentUserID: string;

	let feedElem: HTMLElement;

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
