<script lang="ts">
	export let currentMessage: string;
</script>

<div class="p-2">
	<div class="flex justify-center grid-cols-[1fr_auto]">
		<textarea
			bind:value={currentMessage}
			class="input pl-2 tracking-wider font-bold resize-none pb-0 pt-[2px]"
			placeholder="Write a message..."
			rows="1"
		/>
		<button class="btn py-2 bg-maristred text-slate-50 font-bold hover:opacity-70 w-1/6"
			>Send</button
		>
	</div>
</div>
