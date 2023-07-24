<script lang="ts">
	import { onMount } from 'svelte';
	import type { TableData } from '../../lib/interface';

	interface Column {
		column_name: string;
		column_default: string | null;
		data_type: string;
		is_nullable: string;
		character_maximum_length: number | null;
		is_generated: string;
		related_to?: RelatedColumn[];
	}

	interface RelatedColumn {
		table_name: string;
		column_name: string;
	}

	interface Data {
		tableName: string[];
	}

	let selectedTableName = '';
	let tableNames: string[] = [];
	let tableData: TableData | null = null;

	const fetchData = async () => {
		try {
			const response = await fetch(`/json/${selectedTableName}.json`);
			if (!response.ok) {
				throw new Error(`Failed to fetch ${selectedTableName}.json`);
			}
			tableData = await response.json();
		} catch (error) {
			console.error(error);
		}
	};

	const fetchTableNames = async () => {
		try {
			const response = await fetch('/json/data.json');
			if (!response.ok) {
				throw new Error('Failed to fetch data.json');
			}
			const data: Data = await response.json();
			tableNames = data.tableName;
		} catch (error) {
			console.error(error);
		}
	};

	onMount(() => {
		fetchTableNames();
		fetchData();
	});

	const handleTableSelect = () => {
		fetchData();
	};
</script>

<div class="home__form-container">
	<div class="home__title">
		<h2 class="home__tabletext">Table:</h2>
		<select id="home__listselect" bind:value={selectedTableName} on:change={handleTableSelect}>
			<option value="">Select a table</option>
			{#each tableNames as tableName}
				<option value={tableName}>{tableName}</option>
			{/each}
		</select>
	</div>
	{#if tableData}
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
					</tr>
				</thead>
				<tbody>
					{#each Object.values(tableData.columns) as column}
						<tr>
							<td>
								<div><button class="colbtn">{column.column_name}</button></div>
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
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p>No data available</p>
	{/if}

	<button class="home__button">Gen</button>
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
