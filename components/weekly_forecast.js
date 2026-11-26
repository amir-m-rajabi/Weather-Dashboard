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

function getWeatherIcon(weatherCode) {

    const weatherIcons = {
        0: "clear-day.svg",

        1: "clear-day.svg",
        2: "partly-cloudy-day.svg",
        3: "overcast.svg",

        45: "fog.svg",
        48: "fog.svg",

        51: "drizzle.svg",
        53: "drizzle.svg",
        55: "drizzle.svg",

        56: "sleet.svg",
        57: "sleet.svg",

        61: "rain.svg",
        63: "rain.svg",
        65: "rain.svg",

        66: "sleet.svg",
        67: "sleet.svg",

        71: "snow.svg",
        73: "snow.svg",
        75: "snow.svg",
        77: "snow.svg",

        80: "rain.svg",
        81: "rain.svg",
        82: "rain.svg",

        85: "snow.svg",
        86: "snow.svg",

        95: "thunderstorms.svg",
        96: "thunderstorms-day-rain.svg",
        99: "thunderstorms-day-rain.svg"
    };

    return weatherIcons[weatherCode] || "clear-day.svg";
}