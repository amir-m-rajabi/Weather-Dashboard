import { getWeatherIcon } from "../../js/utils/weatherUtils.js";

export function renderWeeklyForecast(weatherData) {

    const { time, temperature_2m_max, temperature_2m_min, weather_code } = weatherData.daily;

    // Get today's date from the API response
    const today = weatherData.current.time.slice(0, 10);

    // Generate weekly forecast items
    const forecastItems = time.map((date, index) => {

    // Get the weekday name
    const weekday = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        timeZone: "UTC"
    }).format(new Date(`${date}T00:00:00Z`))
    
    // Format the date
    const [, month, day] = date.split("-")
    
    // Check if this date is today
    const isToday = date === today
    
    const icon = getWeatherIcon(weather_code[index]);

        return `
            <div class="weekly-forecast_item ${isToday ? "is-today" : ""}">

                <div class="weekly-forecast_day_box">
                    <p class="weekly-forecast_day">${weekday.toLowerCase()}</p>

                    <span class="weekly-forecast_border"></span>

                    <span class="weekly-forecast_date">${month} / ${day}</span>
                </div>

                <img
                    class="weekly-forecast_icon"
                    src="./assets/icon/weather/${icon}"
                    alt=""
                />

                <div class="weekly-forecast_temperatures">
                    <p class="weekly-forecast_temperature_high">
                        ${Math.round(temperature_2m_max[index])}°
                    </p>

                    <p class="weekly-forecast_temperature_low">
                        ${Math.round(temperature_2m_min[index])}°
                    </p>
                </div>

            </div>
        `;
    }).join("");

    return `
        <div class="weekly-forecast_box">
            ${forecastItems}
        </div>
    `;
}