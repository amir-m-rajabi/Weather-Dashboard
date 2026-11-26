const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast";

function getCurrentWeekdayIndex(timezone) {

    const weekday = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        timeZone: timezone
    }).format(new Date());

    const weekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    return weekdays.indexOf(weekday);
}

export async function getWeather(latitude, longitude,timezone) {

    const weekdayIndex = getCurrentWeekdayIndex(timezone);

    const params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration",
        timezone: timezone,
        past_days: weekdayIndex,
        forecast_days: 7 - weekdayIndex
    });

    const response = await fetch(`${WEATHER_BASE_URL}?${params}`);

    if (!response.ok) {
        throw new Error(`Weather request failed: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function getCurrentWeather(latitude, longitude, timezone) {

    const params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current: "temperature_2m,weather_code",
        timezone: timezone
    });

    const response = await fetch(`${WEATHER_BASE_URL}?${params}`);

    if (!response.ok) {
        throw new Error(`Weather request failed: ${response.status}`);
    }

    const data = await response.json();

    return data;
}