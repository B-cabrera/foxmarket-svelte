<script lang="ts">
	import { onMount } from 'svelte';

	export let sellerUsername: string;
	export let sellerId: string;
	export let userId: string;
	export let itemId: string;
	export let closeFunc: () => void;

	let message = 'Hello! I am interested in this item. Is it still available?';
	let isLoading = false;

	async function startChat() {
		isLoading = true;

		const response = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({
				buyerId: userId,
				sellerId,
				itemId,
				message,
			}),
		});

		isLoading = false;
		closeFunc();
	}

	onMount(() => {
		document.getElementById('messageInput')?.addEventListener('keydown', (event) => {
			if (event.code === 'Enter' && !event.shiftKey) {
				event.preventDefault();
			}
		});
	});
</script>

<div class="bg-maristred w-1/2 text-slate-50 h-max border p-5">
	<form class="flex flex-col items-center gap-5" on:submit={startChat}>
		<h1 class="text-xl font-bold">Start a chat with {sellerUsername}!</h1>
		<h2 class="text-md text-center">
			We have filled in a nice starting message for you! But you can always change it and add your
			own greeting.
		</h2>

		<textarea
			name="message"
			id="messageInput"
			class="input focus:border-slate-950 pl-2 resize-none !h-1/2 text-md"
			rows="3"
			placeholder="Your message here!"
			maxlength="100"
			bind:value={message}
			required
		/>

		<button class="btn bg-maristgrey text-slate-950 border-slate-950" disabled={isLoading}
			>{isLoading ? 'Starting...' : 'Start Chat'}</button
		>
	</form>
</div>
