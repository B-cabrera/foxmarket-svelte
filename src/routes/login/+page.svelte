<script>
	import logo from '$lib/images/foxmarketlogo.png';
</script>

<div class="flex flex-col justify-center items-center pt-20">
	<img src={logo} class="w-1/2" alt="FoxMarket Logo" />
</div>

<form action="" class="flex flex-col items-center mt-20 gap-8">
	<input type="text" class="input w-1/2 !h-10 pl-4" placeholder="Username" />
	<input type="password" class="input w-1/2 !h-10 pl-4" placeholder="Password" />

	<button class="w-[20%] py-2 bg-maristred text-xl font-bold text-slate-50 hover:opacity-70"
		>Login</button
	>
</form>
