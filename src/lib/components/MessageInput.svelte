<script lang="ts">
	import { onMount } from 'svelte';

	export let currentMessage: string;
	export let sendMessage: () => void;

	onMount(() => {
		document.getElementById('messageInput')?.addEventListener('keydown', (event) => {
			if (event.code === 'Enter' && !event.shiftKey) {
				sendMessage();

				event.preventDefault();
			}
		});
	});
</script>

<div class="p-2">
	<div class="flex justify-center grid-cols-[1fr_auto]">
		<textarea
			id="messageInput"
			bind:value={currentMessage}
			class="input pl-2 tracking-wider font-bold resize-none pb-0 pt-[2px]"
			placeholder="Write a message..."
			rows="1"
		/>
		<button
			class="btn py-2 bg-maristred text-slate-50 font-bold hover:opacity-70 w-1/6"
			on:click={sendMessage}>Send</button
		>
	</div>
</div>
