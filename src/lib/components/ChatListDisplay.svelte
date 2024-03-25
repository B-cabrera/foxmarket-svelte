<script lang="ts">
	import type { ChatInformation } from '../../routes/chats/+page.server';

	export let chatList: ChatInformation[];
	export let activeChatIndex: number = 0;
</script>

{#each chatList as chat, i}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		role="button"
		tabindex="0"
		class={`flex h-[10%] bg-maristred w-full border-slate-50 text-slate-50 ${
			activeChatIndex == i && '!bg-slate-700'
		} border hover:opacity-80 cursor-pointer items-center justify-around`}
		on:click={() => (activeChatIndex = i)}
	>
		<img src={chat.item.imageUrl} alt="" class="aspect-square max-w-[20%]" />
		<div>
			<h1 class="font-bold">{chat.item.listingTitle}</h1>
			<p>{chat.seller ? chat.seller.username : chat.buyer?.username}</p>
		</div>
	</div>
{/each}
