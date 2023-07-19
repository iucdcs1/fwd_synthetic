import { Client } from 'pg';
import type { FetchResult, FetchError } from "./interfaces";

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

        // TODO: apply developed scripts here to populate the TableInfo datatype, if needed datatype can be extended

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
                    SELECT column_name
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                    AND table_name = $1;
                `,
                values: [tableName]
            });
            const columns = columnsRes.rows.map((row) => row.column_name);
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
