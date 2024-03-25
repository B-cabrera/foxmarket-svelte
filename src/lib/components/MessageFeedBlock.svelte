<script lang="ts">
	import MessageRow from './MessageRow.svelte';

	export let messageFeed: {
		isCurrentUser: boolean;
		name: string;
		message: string;
	}[];
</script>

<div class=" p-4 overflow-y-auto h-full">
	<section class="w-full max-h-[82vh] overflow-y-auto space-y-4">
		{#each messageFeed as chat}
			<MessageRow
				senderName={chat.name}
				message={chat.message}
				isSentFromCurrentUser={chat.isCurrentUser}
			/>
		{/each}
	</section>
</div>
