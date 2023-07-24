<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { appState } from '$lib/state';

	let dbLink = '';

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		// Get the current state from the appState store
		const currentState = $appState;

		// Create a new state object with the updated dbLink
		const newState = {
			...currentState,
			dbLink: dbLink
		};

		// Update the appState store with the new state
		appState.set(newState);

		await goto(`/explore?dbLink=${encodeURIComponent(dbLink)}`);
	};
</script>

<div class="form-container2">
	<h2 class="h2_body">Enter DB URL (link)</h2>
	<!-- TODO: beautify the way loading indicator looks -->
	{#if $navigating}
		navigating to explorer
	{:else}
		<form>
			<input type="text" id="dblink" bind:value={dbLink} placeholder="postgres://..." required />
			<input type="submit" value="Proceed" on:click={handleSubmit} />
		</form>
	{/if}
</div>
