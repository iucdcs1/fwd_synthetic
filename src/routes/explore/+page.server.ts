import { Client } from 'pg';
import type { FetchError } from './interfaces';
import type { AppState, Column, TableData } from '$lib/interface';

export async function load({ url }): Promise<AppState | FetchError> {
	const dbLink = url.searchParams.get('dbLink');
	console.log('Connecting to the database:', dbLink);

	if (dbLink === null)
		return {
			err: 'dbLink param is not provided',
			detail: ''
		};

	const client = new Client({
		connectionString: dbLink
	});

	try {
		await client.connect();

		const res = await client.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_type = 'BASE TABLE';
        `);
		const tableNames = res.rows.map((row) => row.table_name);

		const args: AppState = {
			dbLink: dbLink,
			tables: [],
			selected_table: ''
		};

		for (const tableName of tableNames) {
			// Fetch column information for each table
			const tableData: TableData = {
				table_name: tableName,
				columns: {}
			};

			const columnsRes = await client.query(
				`
                SELECT column_name, column_default, data_type, is_nullable,
                character_maximum_length, is_generated
                FROM information_schema.columns
                WHERE table_name = $1;
            `,
				[tableName]
			);

			const columnRows = columnsRes.rows;
			for (const columnRow of columnRows) {
				const column: Column = {
					column_name: columnRow.column_name,
					column_default: columnRow.column_default,
					data_type: columnRow.data_type,
					is_nullable: columnRow.is_nullable,
					character_maximum_length: columnRow.character_maximum_length,
					is_generated: columnRow.is_generated,
					generator: undefined
				};

				tableData.columns[columnRow.column_name] = column;
			}

			args.tables.push(tableData);
		}

		console.log(dbLink, '>> successfully fetched');

		await client.end();
		return args;
	} catch (error) {
		console.error('Error retrieving table info:', error);
		await client.end();
		return {
			err: 'Error retrieving information about tables',
			detail: `${error}`
		};
	}
}
