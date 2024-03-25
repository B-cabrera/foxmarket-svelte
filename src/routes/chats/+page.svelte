<script lang="ts">
	import MessageInput from '$lib/components/MessageInput.svelte';
	import MessageFeedBlock from '$lib/components/MessageFeedBlock.svelte';
	import TwoButtonToggle from '$lib/components/TwoButtonToggle.svelte';

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

	let isBuyingActive = true;
</script>

<div class="h-[calc(100vh-56px)] w-full grid grid-cols-[250px_1fr]">
	<div class="flex flex-col items-center border p-8 pt-0">
		<TwoButtonToggle bind:isLeftActive={isBuyingActive} />
	</div>
	<div class="border">
		<div class="h-full grid grid-rows-[1fr_auto]">
			<MessageFeedBlock {messageFeed} />
			<MessageInput {currentMessage} />
		</div>
	</div>
</div>
