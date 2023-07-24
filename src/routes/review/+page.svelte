<script lang="ts">
    import { onMount } from 'svelte';
  
    // Define an array of buttons with their IDs and content
    const buttons = [
      { id: "Button1", content: "This is the content for Button 1." },
      { id: "Button2", content: "This is the content for Button 2." },
      { id: "Button3", content: "This is the content for Button 3." }
    ];
  
    let selectedButton: string | null = null;
  
    // Listen for changes to the URL parameters
    onMount(() => {
      const params = new URLSearchParams(window.location.search);
      selectedButton = params.get('button');
    });

    async function replacingback(buttonId: string) {
    // Assuming '../review' is the base URL, append the buttonId as a URL parameter
    window.location.replace(`../pagehome?button=${buttonId}`);
  }
  </script>

<div class="review">
    {#each buttons as button}
      {#if selectedButton === button.id}
        <p class="review__text">{button.content}</p>
      {/if}
    {/each}
  
    <button class="review__back" on:click={() => replacingback('Back')}>Back</button>
  </div>
