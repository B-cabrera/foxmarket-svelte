<script lang="ts">
	export let showAuthedButtons = false;

	// gives /login route if showAuthedButtons is false
	$: getLink = (originalLink: string) => {
		return showAuthedButtons ? originalLink : '/login';
	};
</script>

<!--increasing gap if logged in b/c of # of buttons-->
<div class="flex justify-between pl-4 text-maristgrey items-center w-3/12">
	<!--TODO: build out login and sign in pages-->

	{#if showAuthedButtons}
		<!--items button-->
		<a href="/items" class="btn hover:text-slate-200">My Items</a>

		<!--chat button-->
		<a href="/chats">
			<i class="material-symbols-outlined icon reg_symbol hover:text-slate-200">chat_bubble</i>
		</a>

		<!--profile button-->
		<a href={getLink('/profile')}>
			<i class="material-symbols-outlined icon reg_symbol hover:text-slate-200">person</i>
		</a>

		<!--favorites button-->
		<a href={getLink('/favorites')}>
			<i class="material-symbols-outlined icon reg_symbol hover:text-slate-200">favorite</i>
		</a>

		<!--settings button-->
		<a href={getLink('/settings')}>
			<i class="material-symbols-outlined icon reg_symbol hover:text-slate-200">settings</i>
		</a>
	{:else}
		<!--sign up and login button-->
		<a href="/signup" class="btn alternate hover:opacity-60 w-5/12">Sign Up</a>
		<a href="/login" class="btn hover:text-slate-200 w-5/12">Login</a>
	{/if}
</div>
