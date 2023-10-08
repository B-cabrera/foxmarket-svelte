<script>
	import '../app.css';
	import logo from '$lib/images/foxmarketlogo.png';
</script>

<nav class="flex h-14 items-center">
	<a href="/">
		<img src={logo} alt="The FoxMarket Logo" class="w-[250px] px-4 py-2" />
	</a>
</nav>

<slot />
