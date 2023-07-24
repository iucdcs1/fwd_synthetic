<!-- column generation parameters page -->

<script lang="ts">
	import { goto } from '$app/navigation';
	import { generators, type GeneratorInfo } from '$lib/generators';
	import type { Column, TableData } from '$lib/interface';
	import { appState } from '$lib/state';
	import type { Fetched } from './interfaces';

	export let data: Fetched;

	let selected_table_name: undefined | string;
	let selected_table: undefined | TableData;
	const column_name = data.slug;
	let column: undefined | Column;
	let matchedGenerators: undefined | GeneratorInfo[];

	let selectedGeneratorName = '';
	let selectedGenerator: GeneratorInfo | undefined;
	const handleSelectedGeneratorChange = () => {
		selectedGenerator = generators.find((g) => g.name == selectedGeneratorName);
		inputValues = {};
	};

	const lambda = () => {
		selected_table_name = $appState.selected_table;
		selected_table = $appState.tables.find((t) => t.table_name == selected_table_name);
		if (selected_table == null) return;

		if (!(column_name in selected_table.columns)) return;
		column = selected_table.columns[column_name];
		matchedGenerators = generators.filter((g) => {
			return g.types.includes(column!.data_type);
		});

		selectedGeneratorName = column.generator !== undefined ? column.generator.name : '';
		selectedGenerator = generators.find((g) => g.name == selectedGeneratorName);
	};
	lambda();

	interface InputValuesDOMMap {
		[key: string]: HTMLInputElement;
	}

	interface InputValuesMap {
		[key: string]: string;
	}

	let inputValues: InputValuesDOMMap = {};

	const gatherData = () => {
		// get the values
		const enteredValues: InputValuesMap = {};
		for (const argName in inputValues) {
			if (inputValues[argName] !== null) {
				enteredValues[argName] = inputValues[argName].value;
			}
		}

		// update app state
		appState.update((currentState) => {
			// update locally
			column = {
				...column!,
				generator:
					selectedGeneratorName != ''
						? { name: selectedGeneratorName, params: enteredValues }
						: undefined
			};
			let columns = selected_table!.columns;
			columns[column_name] = column;
			selected_table = { ...selected_table!, columns: columns };

			// find the table index in the storage
			let tables = currentState.tables;
			const index = tables.findIndex((t) => t.table_name == selected_table_name);

			// update the table
			tables[index] = selected_table;

			return { ...currentState, tables: tables };
		});

		// navigate back
		goto(`/explore?dbLink=${encodeURIComponent($appState.dbLink)}`);
	};

	const isBrowser = typeof window !== 'undefined';
</script>

<div class="details__form-container">
	{#if isBrowser}
		{#if selected_table !== null}
			{#if column !== undefined}
				<div class="home__title">
					<h2 class="home__tabletext">Generator:</h2>
					<select
						id="home__listselect"
						bind:value={selectedGeneratorName}
						on:change={handleSelectedGeneratorChange}
					>
						<option value="">Unselected</option>
						{#if matchedGenerators !== undefined}
							{#each matchedGenerators as g}
								<option value={g.name}>{g.name}</option>
							{/each}
						{/if}
					</select>
				</div>
				{#if selectedGenerator !== undefined}
					{#each selectedGenerator.args as arg}
						<div class="input-container">
							<label class="input-label" for="{arg.name}{arg.type}Input">{arg.name}</label>
							<input
								bind:this={inputValues[arg.name]}
								class="input-field"
								value={selectedGenerator.name == column.generator?.name
									? column.generator.params[arg.name]
									: ''}
								type={arg.type}
								id="{arg.name}{arg.type}Input"
								name="{arg.name}{arg.type}Input"
								min="0"
								step="1"
							/>
						</div>
					{/each}
				{/if}
				<button class="ok-button" on:click={gatherData}>Ok</button>
			{:else}
				<p>Invalid column</p>
			{/if}
		{:else}
			<p>Invalid table</p>
		{/if}
	{:else}
		<p>Loading...</p>
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

	.input-container {
		display: flex;
		align-items: center;
	}

	.input-label {
		flex: 0 0 auto;
		text-align: right;
		margin-right: 10px;
	}

	.input-field {
		flex: 1;
	}

	.ok-button {
		width: 100px;
		height: 30px;
		margin-left: 10px;
		padding: 8px 16px;
	}
</style>
