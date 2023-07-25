<!-- aka Items collection list page -->

<script lang="ts">
	import { appState } from '$lib/state';
	import type { TableData, AppState, Column } from '$lib/interface';
	import type { FetchError } from './interfaces';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	export let data: AppState | FetchError;

	const isBrowser = typeof window !== 'undefined';
	if ('dbLink' in data && isBrowser) {
		// Update the selected_table value in the appState
		appState.update((currentState) => {
			let updatedTables: TableData[] = [];

			if (!('dbLink' in data)) throw 'sus';

			// Remove redundant tables
			const newDataTables = data.tables.map((table) => table.table_name);
			const existingDataTables = currentState.tables.map((table) => table.table_name);
			const removedTables = existingDataTables.filter((item) => !newDataTables.includes(item)); // existingDataTables - newDataTables
			updatedTables.push(
				...currentState.tables.filter((table) => !removedTables.includes(table.table_name))
			);

			// Add new tables that are not in appState
			const newTables = data.tables.filter(
				(table) => !existingDataTables.includes(table.table_name)
			);
			updatedTables.push(...newTables);

			// Update existing tables
			for (const table of currentState.tables) {
				const newTable = data.tables.find((t) => t.table_name === table.table_name);
				if (newTable) {
					// Remove redundant columns
					const newColumns = Object.keys(newTable.columns);
					const existingColumns = Object.keys(table.columns);
					const removedColumns = Object.keys(table.columns).filter(
						(col) => !newColumns.includes(col)
					);

					const updatedColumns = Object.entries(table.columns)
						.filter(([colName]) => !removedColumns.includes(colName))
						.reduce<{ [key: string]: Column }>((acc, [colName, column]) => {
							const newColumn = newTable.columns[colName];
							if (newColumn) {
								// Rewrite everything except for generator
								const updatedColumn = {
									...column,
									column_default: newColumn.column_default,
									data_type: newColumn.data_type,
									is_nullable: newColumn.is_nullable,
									character_maximum_length: newColumn.character_maximum_length,
									is_generated: newColumn.is_generated,
									related_to: newColumn.related_to
								};
								acc[colName] = updatedColumn;
							}
							return acc;
						}, {});

					// Add columns that are not present
					for (const colName of newColumns) {
						if (!existingColumns.includes(colName)) {
							updatedColumns[colName] = newTable.columns[colName];
						}
					}

					const updatedTable = {
						...table,
						columns: updatedColumns
					};

					// replace table
					let index = updatedTables.findIndex((t) => t.table_name == updatedTable.table_name);
					updatedTables[index] = updatedTable;
				}
			}

			return { ...currentState, tables: updatedTables };
		});
	}

	let tableData: TableData | undefined;
	let selectedTableName = '';
	const unsubscribe = appState.subscribe((currentState) => {
		selectedTableName = currentState.selected_table;
		tableData = $appState.tables.find((value, index, obj) => value.table_name == selectedTableName);
	});
	onDestroy(() => {
		unsubscribe();
	});

	const handleTableSelect = () => {
		tableData = $appState.tables.find((value, index, obj) => value.table_name == selectedTableName);
		appState.update((currentState) => ({ ...currentState, selected_table: selectedTableName }));
	};

	const gotoDetails = (column_name: string) => {
		goto('/details/' + column_name);
	};

	const gen = () => {
		goto('/gen/');
	};
</script>

<!-- TODO: requires to rename all the home__ entries -->
<div class="home__form-container">
	{#if isBrowser}
		{#if 'dbLink' in data || data.err === 'dbLink param is not provided'}
			<div class="home__title">
				<h2 class="home__tabletext">Table:</h2>
				<select id="home__listselect" bind:value={selectedTableName} on:change={handleTableSelect}>
					<option value="">Select a table</option>
					{#each $appState.tables as table}
						<option value={table.table_name}>{table.table_name}</option>
					{/each}
				</select>
			</div>
			{#if tableData !== undefined}
				<h3 class="home__tablename">{tableData?.table_name}</h3>
				<div class="home__table">
					<table>
						<thead>
							<tr>
								<!-- Add a new static column for the fields -->
								<th>column_name</th>
								<th>column_default</th>
								<th>data_type</th>
								<th>is_nullable</th>
								<th>character_maximum_length</th>
								<th>is_generated</th>
								<th>is_gen_chosen</th>
							</tr>
						</thead>
						<tbody>
							{#each Object.values(tableData.columns) as column}
								<tr>
									<td>
										<div>
											<button class="colbtn" on:click={() => gotoDetails(column.column_name)}
												>{column.column_name}</button
											>
										</div>
									</td>
									<td>
										<div>{column.column_default}</div>
									</td>
									<td>
										<div>{column.data_type}</div>
									</td>
									<td>
										<div>{column.is_nullable}</div>
									</td>
									<td>
										<div>{column.character_maximum_length}</div>
									</td>
									<td>
										<div>{column.is_generated}</div>
										{#if column.related_to}
											{#each column.related_to as relatedColumn}
												<ul>
													<li>{relatedColumn.table_name} - {relatedColumn.column_name}</li>
												</ul>
											{/each}
										{/if}
									</td>
									<td>
										<div>{column.generator !== undefined}</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<p>No table</p>
			{/if}
			<button class="home__button" on:click={gen}>Gen</button>
		{:else}
			<p>{data.err}</p>
			<p>{data.detail}</p>
		{/if}
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
	.colbtn {
		cursor: pointer;
		border: 0;
		border-radius: 4px;
		font-weight: 600;
		margin: 0 10px;
		width: 200px;
		height: 30px;
		box-shadow: 0 0 5px #ff5e62;
		transition: 0.4s;
		color: #000000;
		background-color: rgba(255, 255, 255, 1);
		border: 1px solid #ff5e62;
	}
</style>
