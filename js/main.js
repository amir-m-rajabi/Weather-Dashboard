import { renderHeader } from "../components/header.js";

import { renderOverview } from "../components/overview.js";

import { renderWeeklyForecast } from "../components/weekly_forecast.js";

import { renderPopularCities } from "../components/popular_cities.js";

const headerRoot = document.querySelector('.header')

const overviewRoot = document.querySelector('.dashboard_city-overview')

const weeklyForecastRoot = document.querySelector('.dashboard_weekly-forecast')

const popularCitiesRoot = document.querySelector('.dashboard_popular-cities')

headerRoot.innerHTML = renderHeader()

overviewRoot.innerHTML = renderOverview()

weeklyForecastRoot.innerHTML = renderWeeklyForecast()

popularCitiesRoot.innerHTML = renderPopularCities()

