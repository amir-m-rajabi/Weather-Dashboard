import { renderHeader } from "../components/header/header.js";
import { renderOverview } from "../components/overview/overview.js";
import { renderWeeklyForecast } from "../components/weekly_forecast/weekly_forecast.js";
import { renderPopularCities } from "../components/popular_cities/popular_cities.js";
import { renderGlobe, initGlobe } from "../components/globe_map/globe_map.js";
import { renderSunTimeline, initSunTimeline } from "../components/sun_timeline/sun_timeline.js";
import { searchCities } from "./services/geocodingService.js";
import { appState } from "./state/appState.js";
import { getWeather, getCurrentWeather } from "../js/services/weatherService.js";
import { getWeatherIcon } from "../js/utils/weatherUtils.js";


let currentCities = [];

const popularCities = [
    {
        id: "tokyo",
        name: "Tokyo",
        country: "Japan",
        latitude: 35.6762,
        longitude: 139.6503,
        timezone: "Asia/Tokyo"
    },
    {
        id: "new-york",
        name: "New York",
        country: "United States",
        latitude: 40.7128,
        longitude: -74.0060,
        timezone: "America/New_York"
    },
    {
        id: "london",
        name: "London",
        country: "United Kingdom",
        latitude: 51.5072,
        longitude: -0.1276,
        timezone: "Europe/London"
    },
    {
        id: "beijing",
        name: "Beijing",
        country: "China",
        latitude: 39.9042,
        longitude: 116.4074,
        timezone: "Asia/Shanghai"
    }
];

const headerRoot = document.querySelector('.header');
const overviewRoot = document.querySelector('.dashboard_city-overview');
const weeklyForecastRoot = document.querySelector('.dashboard_weekly-forecast');
const popularCitiesRoot = document.querySelector('.dashboard_popular-cities');
const globeRoot = document.querySelector('.dashboard_globe-map');
const sunTimelineRoot = document.querySelector('.dashboard_sun-timeline')

headerRoot.innerHTML = renderHeader()
overviewRoot.innerHTML = renderOverview()
popularCitiesRoot.innerHTML = renderPopularCities(popularCities)
globeRoot.innerHTML = renderGlobe();
sunTimelineRoot.innerHTML = renderSunTimeline()

initGlobe();
initSunTimeline();
initPopularCitiesClock();

const searchInput = document.querySelector("#search_input");
const searchButton = document.querySelector(".search_btn");
const searchResults = document.querySelector('.search_results')


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

    loadWeather(city)

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

async function loadWeather(city) {

    try {
        const weatherData = await getWeather(
            city.latitude,
            city.longitude,
            city.timezone
        );

        appState.weatherData = weatherData

        weeklyForecastRoot.innerHTML = renderWeeklyForecast(
            appState.weatherData
        );

        console.log("Weather Data:", weatherData);

    } catch (error) {
        console.error("Weather request failed:", error);
    }
}

function updatePopularCitiesTime() {
    const cityCards = popularCitiesRoot.querySelectorAll(".popular_citie_item");

    cityCards.forEach(card => {
        const cityId = card.dataset.cityId;

        const city = popularCities.find(city => city.id === cityId);

        if (!city) return;

        const localTime = new Intl.DateTimeFormat("en-GB", {
            timeZone: city.timezone,
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23"
        }).format(new Date());

        card.querySelector(".popular_city_time").textContent = localTime;
    });
}

function initPopularCitiesClock() {
    updatePopularCitiesTime();

    setInterval(updatePopularCitiesTime, 1000);
}

async function loadPopularCitiesWeather() {

    try {

        const weatherResults = await Promise.all(
            popularCities.map(city => {
                return getCurrentWeather(
                    city.latitude,
                    city.longitude,
                    city.timezone
                );
            })
        );

        popularCities.forEach((city, index) => {

            const card = popularCitiesRoot.querySelector(
                `[data-city-id="${city.id}"]`
            );

            const temperature = weatherResults[index].current.temperature_2m;
            const weatherCode = weatherResults[index].current.weather_code;

            card.querySelector(".popular_city_temperature").textContent =
                `${Math.round(temperature)}°`;

            card.querySelector(".popular_city_icon").src =
                `./assets/icon/weather/${getWeatherIcon(weatherCode)}`;
        
            });

    } catch (error) {
        console.error("Popular cities weather request failed:", error);
    }
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

popularCitiesRoot.addEventListener("click", event => {

    const selectedCard = event.target.closest(".popular_citie_item");

    if (!selectedCard) return;

    const cityId = selectedCard.dataset.cityId;

    const selectedCity = popularCities.find(city => 
        city.id === cityId
    );

    if (!selectedCity) return;

    selectCity(selectedCity);

});

loadWeather(appState.selectedCity);
loadPopularCitiesWeather();
