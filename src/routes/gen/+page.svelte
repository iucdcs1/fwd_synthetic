<script lang="ts">
	import { appState } from '$lib/state';
	import { goto } from '$app/navigation';
	import type { Column, GeneratorMetadata } from '$lib/interface';
	import axios from 'axios';

	let amount: number = 1;
	let loading = false;

	async function generateData(
		dblink: string,
		table: string,
		amount: number,
		columnsGenerators: { [key: string]: GeneratorMetadata }
	): Promise<void> {
		// TODO: use normal server
		await axios.post('http://127.0.0.1:8000/generate', columnsGenerators, {
			params: {
				dblink,
				table,
				amount
			},
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		});
	}

	function extractGenerators(having: { [key: string]: Column }): {
		[key: string]: GeneratorMetadata;
	} {
		const result: { [key: string]: GeneratorMetadata } = {};

		for (const columnKey in having) {
			const column = having[columnKey];
			if (column.generator !== undefined) {
				result[columnKey] = column.generator;
			}
		}

		return result;
	}

	function explore() {
		goto('/explore/');
	}

	async function generate() {
		// collect args for generation
		const columnsGenerators: { [key: string]: GeneratorMetadata } = extractGenerators(
			$appState.tables.find((t) => t.table_name == $appState.selected_table)!.columns
		);

		// generate // TODO: handle exception
		loading = true;
		await generateData($appState.dbLink, $appState.selected_table, amount, columnsGenerators);
		loading = false;

		// TODO: goto result
	}
</script>

<div class="gen__form-container">
	{#if loading}
		<p>Generating...</p>
	{:else}
		<form class="gen__form">
			<h2>Amount:</h2>
			<input
				type="text"
				id="amount"
				name="amount"
				placeholder="Amount"
				bind:value={amount}
				required
			/>
		</form>
		<input type="submit" value="Confirm" on:click={generate} />
		<input type="submit" value="Cancel" on:click={explore} />
	{/if}
</div>
