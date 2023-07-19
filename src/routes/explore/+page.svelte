<script lang="ts">
	import { onMount } from 'svelte';
	import type { Args } from './interfaces';

	export let data: Args;

	onMount(async () => {
		console.log('Connecting to the database using:', data.dbLink);
	});
</script>

<div class="explore-container">
	<h2 class="h2_body">Exploring Database</h2>
	<p>Connecting to the database using: {data.dbLink}</p>
</div>

<style>
	.explore-container {
		margin: 20px;
	}
</style>
