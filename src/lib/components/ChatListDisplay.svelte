<script lang="ts">
	import type { ChatInformation } from '../../routes/chats/+page.server';

	export let chatMap: Map<string, ChatInformation>;
	export let activeChatId: string;
	export let currentUserID: string;

	$: sortedEntries = Array.from(chatMap.entries()).sort((a, b) => {
		const aHasUnread =
			a[1].Message[a[1].Message.length - 1].senderId != currentUserID
				? !a[1].Message[a[1].Message.length - 1].read
				: false;
		const bHasUnread =
			b[1].Message[b[1].Message.length - 1].senderId != currentUserID
				? !b[1].Message[b[1].Message.length - 1].read
				: false;

		const aMostRecentText = new Date(a[1].Message[a[1].Message.length - 1].timeSent).getTime();

		const bMostRecentText = new Date(b[1].Message[b[1].Message.length - 1].timeSent).getTime();

		return Number(bHasUnread) - Number(aHasUnread) || bMostRecentText - aMostRecentText;
	});

	$: genuineRead = true;
</script>

{#each sortedEntries as [conversationId, chat]}
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
