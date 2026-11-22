import { renderHeader } from "../components/header.js";

import { renderOverViewBox } from "../components/over_view.js";

import { renderWeeklyForecastBox } from "../components/weekly_forecast.js";

const headerRoot = document.querySelector('.header')

const overViewRoot = document.querySelector('.dashboard_city-overview')

const weeklyForecastRoot = document.querySelector('.dashboard_weekly-forecast')

headerRoot.innerHTML = renderHeader()

overViewRoot.innerHTML = renderOverViewBox()

weeklyForecastRoot.innerHTML = renderWeeklyForecastBox()

