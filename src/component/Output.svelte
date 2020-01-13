<script>
    import formatHighlight from "json-format-highlight";
    import Map from './Map.svelte';
    import Clipboard from './Clipboard.svelte';

    export let response = {}
    let codeRef;

    //help from https://github.com/ftonato/svelte-debugger/blob/master/Debugger.svelte
    const colorOptions = {
        keyColor: "#484848",
        numberColor: "#37b3ff",
        stringColor: "#f25050",
        trueColor: "#1d6864",
        falseColor: "#f66578",
        nullColor: "cornflowerblue"
    };

    $: isGeoJSON = typeof (response) === "object" && 'features' in response && response.features.length;
    //reset view when response/isGeoJSON is updated
    $: view = isGeoJSON ? "map" : "json";

    $: getFormatted = () => {
        //todo - truncate larger response
        return formatHighlight(JSON.stringify(response, null, 2), colorOptions);
    }

    function changeView(value) {
        view = value;
    }
</script>

<div class="output">
    {#if isGeoJSON}
        <div class="view-toggle">
            <button class="{view === 'json' ? 'active' : '' }" on:click={()=> changeView('json')}>JSON</button>
            <button class="{view === 'map' ? 'active' : '' }" on:click={()=> changeView('map')}>Map</button>
        </div>
    {/if}

    {#if view === 'map'}
        <Map {response}/>
    {:else}
    <pre>
        <code bind:this={codeRef}>
            {@html getFormatted()}
        </code>
    </pre>
    {/if}
    <Clipboard element={codeRef}/>
</div>

<style>
    .output {
        height: 400px;
        flex: 1 1 340px;
        min-width: 340px;
        overflow: auto;
        background: #ebebeb;
        display: flex;
        flex-direction: column;
    }

    .view-toggle {
        position: sticky;
        top: 0;
        width: 100%;
        background: #d8d8d8;
        height: 2.2em;
        z-index: 500;
    }

    button {
        background: inherit;
        text-align: left;
        box-sizing: order-box;
        color: rgb(114, 114, 114);
        border: none;
        border-bottom: .3em solid transparent;
        border-radius: 0;
        font-family: monospace;
        font-size: 1em;
        font-weight: 500;
        padding: .5em .5em .3em .5em;
    }

    .active {
        border-bottom: 3px solid #0071bc;
    }

    pre {
        padding: 1em;
        overflow-y: auto;
        overflow-x: hidden;
    }

    pre code {
        font-size: 0.9em;
        line-height: 0.2em;
    }
</style>