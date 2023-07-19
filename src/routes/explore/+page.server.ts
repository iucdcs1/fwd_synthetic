import { Client } from 'pg';
import type { FetchResult, FetchError } from "./interfaces";
import type { ColumnInfo } from "../interfaces";

export async function load({ url }): Promise<FetchResult | FetchError> {
    const dbLink = url.searchParams.get('dbLink');
    console.log('Connecting to the database:', dbLink);

    if (dbLink === null) return {
        err: 'dbLink param is required',
        detail: '',
    };

    const client = new Client({
        connectionString: dbLink
    });
    let error;

    try {
        await client.connect();

        const res = await client.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_type = 'BASE TABLE';
        `);
        const tableNames = res.rows.map((row) => row.table_name);

        const args: FetchResult = {
            dbLink: dbLink,
            tables: []
        };

        for (const tableName of tableNames) {
            const columnsRes = await client.query({
                text: `
                    SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                    AND table_name = $1;
                `,
                values: [tableName]
            });
            const columns: ColumnInfo[] = columnsRes.rows.map((row) => {
                const column: ColumnInfo = {
                    name: row.column_name,
                    type: row.data_type,
                    primaryKey: false,
                    foreignKey: false,
                };
                return column;
            });

            const keysRes = await client.query({
                text: `
                    SELECT column_name, constraint_type
                    FROM information_schema.table_constraints tc
                    JOIN information_schema.constraint_column_usage ccu
                    USING (constraint_schema, constraint_name)
                    WHERE tc.table_schema = 'public'
                    AND tc.table_name = $1;
                `,
                values: [tableName]
            });

            for (const keyRow of keysRes.rows) {
                const column = columns.find((col) => col.name === keyRow.column_name);
                if (column) {
                    if (keyRow.constraint_type === 'PRIMARY KEY') {
                        column.primaryKey = true;
                    } else if (keyRow.constraint_type === 'FOREIGN KEY') {
                        column.foreignKey = true;
                    }
                }
            }

            args.tables.push({ name: tableName, columns: columns });
        }

        console.log(dbLink, '>> successfully fetched');

        return args;

    } catch (error) {
        console.error('Error retrieving table info:', error);
    } finally {
        await client.end();
    }

    return {
        err: 'Error retrieving information about tables',
        detail: `${error}`,
    };
}
