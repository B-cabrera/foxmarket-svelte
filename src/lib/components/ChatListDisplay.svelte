<script lang="ts">
	import type { ChatInformation } from '../../routes/chats/+page.server';

	export let chatMap: Map<string, ChatInformation>;
	export let activeChatId: string;
</script>

{#each chatMap.entries() as [conversationId, chat]}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		role="button"
		tabindex="0"
		class={`flex h-[10%] bg-maristred w-full border-slate-50 text-slate-50 ${
			activeChatId == conversationId && '!bg-slate-700'
		} border hover:opacity-80 cursor-pointer items-center justify-around`}
		on:click={() => {
			activeChatId = conversationId;
			genuineRead = false;
		}}
	>
		<img src={chat.item.imageUrl} alt="" class="aspect-square max-w-[20%]" />
		<div>
			<h1 class="font-bold">{chat.item.listingTitle}</h1>
			<p>{chat.seller ? chat.seller.username : chat.buyer?.username}</p>
		</div>
		<div>
			{#if chat.Message[chat.Message.length - 1].senderId != currentUserID && !chat.Message[chat.Message.length - 1].read && genuineRead}
				<span class="material-symbols-outlined"> mark_unread_chat_alt </span>
			{/if}
		</div>
	</div>
{/each}
