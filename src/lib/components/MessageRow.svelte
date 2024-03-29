<script lang="ts">
	import MessageBubble from './MessageBubble.svelte';

	export let senderName: string;
	export let message: string;
	export let isSentFromCurrentUser: boolean;
	let messageType: 'sender' | 'reciever';

	$: messageType = isSentFromCurrentUser ? 'sender' : 'reciever';
</script>

<div class={`grid ${isSentFromCurrentUser ? 'grid-cols-[1fr_400px]' : 'grid-cols-[400px_1fr]'}`}>
	{#if isSentFromCurrentUser}
		<div />
		<MessageBubble {senderName} {message} {messageType} />
	{:else}
		<MessageBubble {senderName} {message} {messageType} />
		<div />
	{/if}
</div>
