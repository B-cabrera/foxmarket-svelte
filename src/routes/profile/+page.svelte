<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { username } = data;
</script>

<div class="w-full flex justify-center h-[calc(100vh-56px)]">
	<div class="flex flex-col w-2/3">
		<div class="mt-10 w-full">
			<h1 class="text-2xl text-slate-50 tracking-wider rounded border w-min p-4">{username}</h1>
		</div>
	</div>
</div>
