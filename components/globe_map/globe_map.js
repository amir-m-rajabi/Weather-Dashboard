import { reverseGeocode } from "../../js/services/geocodingService.js";
import { getTimezone } from "../../js/services/weatherService.js";

let globeMap = null;
let selectedMarker = null;

export function renderGlobe() {

    return `
            <div id="globe-map"></div>
    `;

}


import * as maplibregl from "https://unpkg.com/maplibre-gl@6.19.0/dist/maplibre-gl.mjs";


export function initGlobe(onCitySelect) {

    const map = new maplibregl.Map({

        container: "globe-map",

        style: "https://tiles.openfreemap.org/styles/liberty",

        center: [35,40],

        zoom: 2.5,

        attributionControl: false

    });

    globeMap = map;


    map.addControl(
      new maplibregl.NavigationControl({
        showZoom: true,
        showCompass: false
      }),
      "top-right"
    );

    let selectedMarker = null;

    map.on("click", async event => {

    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;

    try {
    
        const city = await reverseGeocode(latitude, longitude);
    
        if (!city) {
            console.log("No city found at this location.");
            return;
        }
      
        city.timezone = await getTimezone(latitude, longitude);
        onCitySelect(city);

        
            if (selectedMarker) {
                selectedMarker.remove();
            }

            selectedMarker = new maplibregl.Marker({
                color: "#216e89"
            })
                .setLngLat([longitude, latitude])
                .addTo(map);
        
      
        // console.log("Selected location:", city);
      
    } catch (error) {
    
        console.error("Map selection error:", error);
    
    }

  });

    return map;
}

export function updateGlobeLocation(latitude, longitude) {

    if (!globeMap) return;

    if (!selectedMarker) {

        selectedMarker = new maplibregl.Marker({
            color: "#216e89"
        });

    }

    selectedMarker
        .setLngLat([longitude, latitude])
        .addTo(globeMap);

    globeMap.flyTo({
        center: [longitude, latitude],
        duration: 1200
    });

}