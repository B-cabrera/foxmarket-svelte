<script lang="ts">
	import MessageRow from './MessageRow.svelte';

	export let messageFeed: {
		id: string;
		conversationId: string;
		timeSent: Date;
		senderId: string;
		receiverId: string;
		content: string;
	}[];
	export let otherUserName: string | undefined;
	export let currentUserID: string;

	$: senderName = otherUserName!;
</script>

<div class=" p-4 overflow-y-auto h-full">
	<section class="w-full max-h-[82vh] overflow-y-auto space-y-4">
		{#each messageFeed as chat}
			<MessageRow
				{senderName}
				message={chat.content}
				isSentFromCurrentUser={currentUserID == chat.senderId}
			/>
		{/each}
	</section>
</div>
