<script lang="ts">
    import { onMount } from 'svelte';

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

    interface TableData {
        table_name: string;
        columns: {
            [key: string]: Column;
        };
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
        <h3 class="home__tablename">{tableData.table_name}</h3>
        <div class="home__table">
        <table>
            <thead>
            <tr>
                {#each Object.keys(tableData.columns) as columnName}
                    <th>{columnName}</th>
                {/each}
            </tr>
            </thead>
            <tbody>
            <tr>
                {#each Object.values(tableData.columns) as column}
                    <td>
                        <div>{column.column_name}</div>
                        <div>{column.column_default}</div>
                        <div>{column.data_type}</div>
                        <div>{column.is_nullable}</div>
                        <div>{column.character_maximum_length}</div>
                        <div>{column.is_generated}</div>
                        {#if column.related_to}
                            <ul>
                                {#each column.related_to as relatedColumn}
                                    <li>{relatedColumn.table_name} - {relatedColumn.column_name}</li>
                                {/each}
                            </ul>
                        {/if}
                    </td>
                {/each}
            </tr>
            </tbody>
        </table>
    </div>
    {:else}
        <p>No data available</p>
    {/if}
    
    <button class="home__button">Gen</button>
</div>