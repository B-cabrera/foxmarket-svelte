<script lang="ts">
	export let showAuthedButtons = false;

	// gives /login route if showAuthedButtons is false
	$: getLink = (originalLink: string) => {
		return showAuthedButtons ? originalLink : '/login';
	};
</script>

<!--increasing gap if logged in b/c of # of buttons-->
<div class={`flex ${showAuthedButtons ? 'gap-6' : 'gap-4'} pl-4 text-maristgrey items-center`}>
	<!--TODO: build out login and sign in pages-->

	{#if showAuthedButtons}
		<!--items button-->
		<a href="/items" class="btn hover:text-slate-200">My Items</a>

		<!--chat button-->
		<a href="/chats">
			<i class="material-symbols-outlined icon hover:text-slate-200">chat_bubble</i>
		</a>
	{:else}
		<!--sign up and login button-->
		<a href="/signup" class="btn alternate hover:opacity-60">Sign Up</a>
		<a href="/login" class="btn hover:text-slate-200">Login</a>
	{/if}

	<!--profile button-->
	<a href={getLink('/profile')}>
		<i class="material-symbols-outlined icon hover:text-slate-200">person</i>
	</a>

	<!--favorites button-->
	<a href={getLink('/favorites')}>
		<i class="material-symbols-outlined icon hover:text-slate-200">favorite</i>
	</a>

	<!--settings button-->
	<a href={getLink('/settings')}>
		<i class="material-symbols-outlined icon hover:text-slate-200">settings</i>
	</a>
</div>
