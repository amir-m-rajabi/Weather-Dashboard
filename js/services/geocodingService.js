const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

const REVERSE_GEOCODING_BASE_URL = "https://nominatim.openstreetmap.org/reverse";

export async function searchCities(query, language = "en") {

    // Clean search query
    const searchQuery = query.trim();

    // Check empty or short queries
    if (searchQuery.length < 2) {
        return [];
    }


    // Create URL parameters
    const params = new URLSearchParams({
        name: searchQuery,
        count: 10,
        language: language,
        format: "json"
    });


    // Send request to Geocoding API
    const response = await fetch(
        `${GEOCODING_BASE_URL}?${params}`
    );


    // Check response status
    if (!response.ok) {
        throw new Error(`Geocoding request failed: ${response.status}`);
    }


    // Convert response to JSON
    const data = await response.json();


    // Check if any city was found
    if (!data.results) {
        return [];
    }


    // Extract required city information
    const cities = data.results.map(location => {

        return {
            id: location.id,
            name: location.name,
            country: location.country,
            countryCode: location.country_code,
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: location.timezone,
            admin1: location.admin1
        };

    });

    return cities;

}

export async function reverseGeocode(latitude, longitude, language = "en") {

    const params = new URLSearchParams({
        lat: latitude,
        lon: longitude,
        format: "jsonv2",
        addressdetails: 1,
        "accept-language": language
    });

    const response = await fetch(
        `${REVERSE_GEOCODING_BASE_URL}?${params}`
    );

    if (!response.ok) {
        throw new Error(`Reverse geocoding failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.address) {
        return null;
    }

    const address = data.address;

    const cityName =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.hamlet;

    if (!cityName) {
        return null;
    }

    return {
        id: `${data.osm_type}-${data.osm_id}`,
        name: cityName,
        country: address.country,
        countryCode: address.country_code,
        latitude: Number(latitude),
        longitude: Number(longitude),
        timezone: null,
        admin1: address.state
    };
}