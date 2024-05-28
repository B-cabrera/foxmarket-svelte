<script lang="ts">
	export let senderName: string;
	export let message: string;
	export let messageType: 'sender' | 'reciever';
</script>

<div
	class={`border rounded p-4 ${
		messageType == 'sender'
			? 'bg-maristred text-slate-50 rounded-br-none'
			: 'bg-maristgrey text-slate-900 rounded-bl-none'
	}`}
>
	{#if messageType == 'reciever'}
		<p class="font-bold">{senderName}</p>
	{/if}

	<p>{message}</p>
</div>
