<script>
    import {
        onMount
    } from 'svelte';

    export let response;
    let container;
    let map;
    let layer;

    onMount(() => {
        map = L.map(container, {

        }).setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(map);

    })

    $: {
        if (map) {
            //remove previous layer
            if (layer) map.removeLayer(layer)

            layer = L.geoJSON(response, {
                onEachFeature: (feature, layer) => {
                    const table = Object.keys(feature.properties).map(function (key) {
                        return `<p><b>${key}</b>: ${feature.properties[key]}</p>`;
                    }).join("");
                    layer.bindPopup(table);
                }
            }).addTo(map)

            const group = new L.featureGroup([layer]);
            map.fitBounds(group.getBounds())
        }
    }
</script>


<div id="map" bind:this={container}></div>


<style>
    #map {
        width: 100%;
        height: 100%;
    }

    :global(.leaflet-popup-content) {
        overflow: auto;
        max-height: 200px;
    }

    :global(.leaflet-popup-content p) {
        margin: 2px 0 !important;
    }
</style>