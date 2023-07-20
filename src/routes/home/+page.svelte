<script lang="ts">
    import { onMount } from 'svelte';

    interface Data {
        tableName: string[];
    }

    onMount(async () => {
        try {
            const response = await fetch('/json/data.json');
            if (!response.ok) {
                throw new Error('Failed to fetch data.json');
            }
            const data: Data = await response.json();

            const tableData = data.tableName;
            const selectList = document.getElementById('home__listselect') as HTMLSelectElement;

            tableData.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.text = item;
                selectList.appendChild(option);
            });
        } catch (error) {
            console.error(error);
        }
    });
</script>

<div class="home__form-container">
    <div class="home__title">
        <h2 class="home__tabletext">Table:</h2>
        <select id="home__listselect"></select>
    </div>
    <input type="move" value="Gen" class="home__button">
</div>