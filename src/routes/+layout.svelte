<script>
	import '../app.css';
	import logo from '$lib/images/foxmarketlogo.png';
</script>

<nav class="flex h-14 items-center">
	<a href="/">
		<img src={logo} alt="The FoxMarket Logo" class="w-[250px] px-4 py-2" />
	</a>
	<div class="flex w-3/5 items-center">
		<i class="material-symbols-outlined text-maristgrey absolute px-2"> search </i>
		<input type="search" class="input pl-10 tracking-wider" placeholder="Search" />
	</div>
</nav>

<slot />
