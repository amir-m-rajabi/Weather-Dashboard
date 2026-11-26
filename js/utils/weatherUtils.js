export function getWeatherIcon(weatherCode) {

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