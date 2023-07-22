<script lang="ts">
	import type { TableData } from '$lib/interface';
	import type { FetchResult, FetchError } from './interfaces';
	export let data: FetchResult | FetchError;

	let selectedTableName = '';
	let tableData: TableData | undefined;
	const handleTableSelect = () => {
		if ('dbLink' in data) {
			tableData = data.tables.find((value, index, obj) => value.table_name == selectedTableName);
		}
	};
</script>

<!-- TODO: requires to rename all the home__ entries -->
<div class="home__form-container">
	{#if 'dbLink' in data}
		<div class="home__title">
			<h2 class="home__tabletext">Table:</h2>
			<select id="home__listselect" bind:value={selectedTableName} on:change={handleTableSelect}>
				<option value="">Select a table</option>
				{#each data.tables as table}
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
			<p>No table</p>
		{/if}
		<button class="home__button">Gen</button>
	{:else}
		<p>{data.err}</p>
		<p>{data.detail}</p>
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
