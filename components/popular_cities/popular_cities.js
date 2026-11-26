export function renderPopularCities(cities) {

    return `
        <div class="popular_cities_box">

            ${cities.map(city => `
                
                <div class="popular_citie_item" data-city-id="${city.id}">

                    <div class="popular_city_info">
                        <p class="popular_city_name">${city.name}</p>
                        <p class="popular_city_time">--:--</p>
                    </div>

                    <img
                        class="popular_city_icon"
                        src="./assets/icon/icon-sun.svg"
                        alt=""
                    />

                    <p class="popular_city_temperature">--°</p>

                </div>

            `).join("")}

        </div>
    `;
}