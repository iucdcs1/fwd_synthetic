<script lang="ts">
    let selectedTableName = '';
</script>

<div class="filter__select-container">
    <div id="filter__static-div">
        <h3 id="filter__static-header">Type:</h3>
        <select id="filter__listselect" bind:value={selectedTableName}>
            <option value="">Select a type</option>
            <option>RegExp</option>
            <option>Type</option>
        </select>
    </div>
    <div id="filter__dynamic-div">
        <h3 id="filter__dynamic-header">{selectedTableName}</h3>
        {#if selectedTableName === "RegExp"}
            <input type="text" id="filter__form" name="RegExp" placeholder="RegExp" required>
        {:else}
            {#if selectedTableName === "Type"}
                <select id="filter__dynamic-listselect">
                    <option value="">Select a type</option>
                    <option>hui</option>
                    <option>penis</option>
                    <option>ZaLupA</option>
                </select>
            {/if}
        {/if}
    </div>
    <div id="filter__confirm-button">
        {#if selectedTableName !== ""}
            <input type="submit" value="Confirm">
        {/if}
    </div>
</div>
