<script lang="ts">
	export let buyerList: { username: string; id: string }[];
</script>

<div class="flex flex-col items-center gap-10 bg-maristred w-1/2 text-slate-50 h-max border p-5">
	<div>
		<h1 class="text-2xl text-center font-bold">
			Ready to Sell? Please choose the buyer from the choices below:
		</h1>
		<h1 class="text-center">(Buyers are chosen from your current conversations)</h1>
	</div>

	<form action="" class="flex justify-center w-full gap-4">
		<select name="buyer" class="w-1/3  text-center bg-maristgrey" required>
			<option selected disabled value="">Buyer</option>
			{#each buyerList as buyer}
				<option value={buyer}>{buyer.username}</option>
			{/each}
		</select>

		<button class="btn">Sell!</button>
	</form>
</div>
