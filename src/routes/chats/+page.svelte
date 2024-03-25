<script lang="ts">
	import MessageInput from '$lib/components/MessageInput.svelte';
	import MessageFeedBlock from '$lib/components/MessageFeedBlock.svelte';

	let currentMessage = '';

	// TEMP SAMPLE MESSAGE DATA, STRUCTURE CAN CHANGE
	let messageFeed = [
		{
			isCurrentUser: true,
			name: 'Jane',
			message: 'HEY.',
		},
		{
			isCurrentUser: false,
			name: 'Michael',
			message: 'yo',
		},
		{
			isCurrentUser: true,
			name: 'Jane',
			message: 'how are you',
		},
		{
			isCurrentUser: false,
			name: 'Michael',
			message: 'good',
		},
		{
			isCurrentUser: true,
			name: 'Jane',
			message: 'nice',
		},
		{
			isCurrentUser: false,
			name: 'Michael',
			message: 'yep',
		},
		{
			isCurrentUser: true,
			name: 'Jane',
			message: 'i needa go',
		},
		{
			isCurrentUser: false,
			name: 'Michael',
			message: 'okay bye',
		},
		{
			isCurrentUser: true,
			name: 'Michael',
			message: 'say less',
		},
	];
</script>

<div class="h-[calc(100vh-56px)] w-full grid grid-cols-[200px_1fr]">
	<div class="border bg-maristred p-8">Chats Here</div>
	<div class="border">
		<div class="h-full grid grid-rows-[1fr_auto]">
			<MessageFeedBlock {messageFeed} />
			<MessageInput {currentMessage} />
		</div>
	</div>
</div>
