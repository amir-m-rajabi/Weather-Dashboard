import { renderHeader } from "../components/header.js";

import { renderOverView } from "../components/over_view.js";


const headerRoot = document.querySelector('.header')

const overViewRoot = document.querySelector('.dashboard_city-overview')



headerRoot.innerHTML = renderHeader()

overViewRoot.innerHTML = renderOverView()

