<script>
    import {
        createEventDispatcher
    } from 'svelte';
    import JSON5 from 'json5'

    import argumentSchema from '../schema.js'

    const dispatch = createEventDispatcher();

    export let value = '';
    export let loading = false;
    let query;
    let invalid;

    //when code is changed, check if object is invalid 
    $: {
        checkInvalid(value);
    }

    function checkInvalid(value) {
        //convert to object
        try {
            query = JSON5.parse(value)
        } catch (error) {
            invalid = error.message;
            return;
        }

        //schema check
        const valid = argumentSchema(query)
        if (!valid) {
            const error = argumentSchema.errors[0];
            invalid = `${error.dataPath} ${error.message}`
        } else {
            invalid = null;
        }

    }
</script>



<form class="input">
    <textarea placeholder="add query here" bind:value spellcheck="false"></textarea>
    <div class="toggles">
        {#if invalid}
        <p class="error">{invalid}</p>
        {:else if loading}
        <p class="loading">loading...</p>
        {:else}
        <button on:click|preventDefault={()=> dispatch('message', query)}>Run Query</button>
        {/if}
    </div>
</form>

<style>
    .input {
        min-height: 400px;
        display: flex;
        flex-direction: column;
        flex: 1 1 340px;
        min-width: 340px;
    }

    .toggles {
        padding: 0px 5px;
    }

    .loading{
        color: rgb(61, 96, 136);
        font-weight: 1000;
    }

    .error{
        color: indianred;
        font-weight: 1000;
    }

    button {
        padding: 0.1em 0.25em;
        margin-top: .4em;
        background-color: #0071bc;
        border: 0;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-family: "Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
        font-size: 1.1em;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        text-decoration: none;
    }

    textarea {
        flex: 1;
        margin: 0;
        border: none;
        resize: none;
        overflow: auto;
        background: #272822;
        color: #f8f8f2;
        font-family: "Roboto Mono Web", "Bitstream Vera Sans Mono", "Consolas",
            "Courier", monospace;
        padding: 1.2em;
        min-width: 100%;
    }
</style>