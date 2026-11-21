
export function renderOverView(){
    return `

        <div class="city_overview_box">
          <div class="overview_cityImage_box">
            <p class="overview_cityName">tehran</p>
            <div class="overview_cityTemperature_box">
              <p class="overview_NumberTemperature">17°</p>
              <img
                calss="overview_temperatureIcon"
                src="./assets/icon/icon-sun.svg"
                alt=""
              />
            </div>
            <p class="overview_cityTime">11:45 A.M</p>
          </div>

          <div class="overview_cityInformation_box">
            <div class="cityInfomationDataBox">
              <div class="cityTitleInfomationBox">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-droplet preview-icon"
                >
                  <path
                    d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"
                  />
                </svg>
                <p class="cityTitleInfomation">humidity :</p>
              </div>
              <p class="cityDataInformation">68%</p>
            </div>

            <div class="cityInfomationDataBox">
              <div class="cityTitleInfomationBox">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-wind preview-icon"
                >
                  <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
                  <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
                  <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
                </svg>
                <p class="cityTitleInfomation">wind :</p>
              </div>
              <p class="cityDataInformation">12 km/h</p>
            </div>

            <div class="cityInfomationDataBox">
              <div class="cityTitleInfomationBox">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-sun preview-icon"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
                <p class="cityTitleInfomation">UV index :</p>
              </div>
              <p class="cityDataInformation">4 m</p>
            </div>

            <div class="cityInfomationDataBox">
              <div class="cityTitleInfomationBox">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-gauge preview-icon"
                >
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
                <p class="cityTitleInfomation">pressure :</p>
              </div>
              <p class="cityDataInformation">68%</p>
            </div>
          </div>
        </div>

    `
}