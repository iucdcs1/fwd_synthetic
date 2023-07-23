<!-- column generation parameters page -->

<script lang="ts">
	import { generators, type GeneratorInfo } from '$lib/generators';
	import type { Column, TableData } from '$lib/interface';
	import { appState } from '$lib/state';
	import type { Fetched } from './interfaces';

	let selectedGenerator = '';
	const handleSelectedGeneratorChange = () => {};
	export let data: Fetched;

	let selected_table_name: undefined | string;
	let selected_table: undefined | TableData;
	const column_name = data.slug;
	let column: undefined | Column;
	let matchedGenerators: undefined | GeneratorInfo[];

	const lambda = () => {
		selected_table_name = $appState.selected_table;
		selected_table = $appState.tables.find((t) => t.table_name == selected_table_name);
		if (selected_table == null) return;

		if (!(column_name in selected_table.columns)) return;
		column = selected_table.columns[column_name];
		matchedGenerators = generators.filter((g) => {
			console.log(g.types, column!.data_type);
			return g.types.includes(column!.data_type);
		});
	};
	lambda();
</script>

<div class="details__form-container">
	{#if selected_table !== null}
		{#if column !== undefined}
			<div class="home__title">
				<h2 class="home__tabletext">Generator:</h2>
				<select
					id="home__listselect"
					bind:value={selectedGenerator}
					on:change={handleSelectedGeneratorChange}
				>
					<option value="">Select a generator</option>
					{#if matchedGenerators !== undefined}
						{#each matchedGenerators as g}
							<option value={g.name}>{g.name}</option>
						{/each}
					{/if}
				</select>
			</div>
		{:else}
			<p>Invalid column</p>
		{/if}
	{:else}
		<p>Invalid table</p>
	{/if}
</div>

<style>
	.details__form-container {
		background: #fff;
		border-radius: 10px;
		box-shadow: 0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22);
		width: 800px;
		padding: 40px;
		height: 200px;
		max-width: 100%;
		position: relative;
		box-sizing: border-box;
		text-align: center;
		display: flex;
		flex-direction: column;
	}
</style>
