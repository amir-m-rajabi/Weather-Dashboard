export function renderGlobe() {

    return `
            <div id="globe-map"></div>
    `;

}


import * as maplibregl from "https://unpkg.com/maplibre-gl@6.19.0/dist/maplibre-gl.mjs";

export function initGlobe() {

    const map = new maplibregl.Map({

        container: "globe-map",

        style: "https://tiles.openfreemap.org/styles/liberty",

        center: [35,40],

        zoom: 2.5,

        attributionControl: false

    });


    map.addControl(
      new maplibregl.NavigationControl({
        showZoom: true,
        showCompass: false
      }),
      "top-right"
    );

    return map;
}