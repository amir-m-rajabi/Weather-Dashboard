import { renderHeader } from "../components/header.js";
import { renderOverview } from "../components/overview.js";
import { renderWeeklyForecast } from "../components/weekly_forecast.js";
import { renderPopularCities } from "../components/popular_cities.js";
import { renderGlobe, initGlobe } from "../components/globe_map.js";
import { renderSunTimeline, initSunTimeline } from "../components/sun_timeline.js";
import { searchCities } from "./services/geocodingService.js";
import { appState } from "./state/appState.js"

const headerRoot = document.querySelector('.header');
const overviewRoot = document.querySelector('.dashboard_city-overview');
const weeklyForecastRoot = document.querySelector('.dashboard_weekly-forecast');
const popularCitiesRoot = document.querySelector('.dashboard_popular-cities');
const globeRoot = document.querySelector('.dashboard_globe-map');
const sunTimelineRoot = document.querySelector('.dashboard_sun-timeline')

headerRoot.innerHTML = renderHeader()
overviewRoot.innerHTML = renderOverview()
weeklyForecastRoot.innerHTML = renderWeeklyForecast()
popularCitiesRoot.innerHTML = renderPopularCities()
globeRoot.innerHTML = renderGlobe();
sunTimelineRoot.innerHTML = renderSunTimeline()


initGlobe();
initSunTimeline()

const searchInput = document.querySelector("#search_input");
const searchButton = document.querySelector(".search_btn");
const searchResults = document.querySelector('.search_results')

let currentCities = [];

async function handleCitySearch() {
    const query = searchInput.value.trim();

    if (!query) return;

    const language = /[\u0600-\u06FF]/.test(query) ? "fa" : "en";

    try {
        const cities = await searchCities(query, language);

        currentCities = getUniqueCities(cities);

        if (currentCities.length === 0) {
            console.log("No city found");
            return;
        }

        const uniqueCountries = getUniqueCountries(currentCities);

        if (uniqueCountries.length === 1) {
            console.log("Only one country found");
            searchResults.style.display = "none";
            selectCity(currentCities[0]);
            searchInput.value = ''

        } else {
            console.log("Multiple countries found");
            renderCityOptions(currentCities);
        }

        console.log(uniqueCountries);

    } catch (error) {
        console.error("City search failed:", error);
    }
}

function getUniqueCountries(cities) {
    return [...new Set(
        cities.map(city => city.countryCode)
    )];
}
function getUniqueCities(cities) {
    return cities.filter((city, index, self) =>
        index === self.findIndex(item =>
            item.countryCode === city.countryCode &&
            item.name.toLowerCase() === city.name.toLowerCase()
        )
    );
}

function selectCity(city) {
    appState.selectedCity = city;

    console.log("Selected city:", appState.selectedCity);
    searchInput.value = "";
}

function renderCityOptions(cities) {
    searchResults.innerHTML = cities.map((city, index) => `
        <div class="search_result" data-index="${index}">
            <span class="search_result-city">${city.name}</span>
            <span class="search_result-country">${city.country}</span>
        </div>
    `).join("");

    searchResults.style.display = "flex";
}

searchResults.addEventListener("click", event => {

    const selectedOption = event.target.closest(".search_result");

    if (!selectedOption) return;

    const cityIndex = Number(selectedOption.dataset.index);

    const selectedCity = currentCities[cityIndex];

    selectCity(selectedCity);

    searchResults.style.display = "none";

});

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        handleCitySearch();
    }
});

searchButton.addEventListener("click", handleCitySearch);
