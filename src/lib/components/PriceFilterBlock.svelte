<script lang="ts">
	export let min = '';
	export let max = '';

	$: noNegatives(min, max);

	const noNegatives = (minn: string, maxx: string) => {
		const minNumber = parseInt(minn);
		const maxNumber = parseInt(maxx);

		if (isNaN(minNumber)) min = '';
		if (isNaN(maxNumber)) max = '';

		if (minNumber <= 0) min = '';
		if (maxNumber <= 0) max = '';

		if (minNumber > 1000000) min = '1000000';
		if (maxNumber > 1000000) max = '1000000';
	};
</script>

<div class="flex justify-around py-5 gap-3 text-center">
	<div class="relative flex">
		<input
			bind:value={min}
			type="number"
			min="1"
			max="1000000"
			class="pl-5 input font-bold text-center placeholder:opacity-30 placeholder:font-thin text-sm"
			placeholder="Min"
		/>
		<span class="absolute top-1 left-2">$</span>
	</div>

	<div class="relative flex">
		<input
			bind:value={max}
			type="number"
			min="1"
			max="1000000"
			class="pl-5 input font-bold text-center placeholder:opacity-30 placeholder:font-thin text-sm"
			placeholder="Max"
		/>
		<span class="absolute top-1 left-2">$</span>
	</div>
</div>
