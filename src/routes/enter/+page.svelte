<script lang="ts">
	import { goto } from '$app/navigation';

	let dbLink = '';

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		await goto(`/explore?dbLink=${encodeURIComponent(dbLink)}`);
	};
</script>

<div class="form-container2">
	<h2 class="h2_body">Enter DB URL (link)</h2>
	<form>
		<input type="text" id="dblink" bind:value={dbLink} placeholder="postgres://..." required />
		<input type="submit" value="Proceed" on:click={handleSubmit} />
	</form>
</div>
