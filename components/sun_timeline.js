export function renderSunTimeline(){
    return `
    
        <div class="sun-timeline_box">
          <div class="sun-chart">
                        <svg class="sun-chart-svg" viewBox="0 0 450 220">

              <!-- Filled Daylight Area -->
              <path class="sun-progress-area" d="" />

              <!-- Background Sun Arc -->
              <path
                class="sun-track"
                d="M 40 190
                   A 160 160 0 0 1 360 190"
              />

              <!-- Progress Sun Arc -->
              <path
                class="sun-progress"
                d="M 40 190
                   A 160 160 0 0 1 360 190"
              />

              <!-- Horizon Line -->
              <line class="sun-horizon" x1="20" y1="190" x2="380" y2="190" />

              <!-- Sun Indicator -->
              <circle class="sun-indicator" cx="40" cy="190" r="9" />

              <text
                class="sun-clock"
                x="200"
                y="10"
                text-anchor="middle"
            >
                08:35 PM
            </text>
            </svg>
          </div>

          <div class="sun-times">
            <div class="sun-time sunrise">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-sunrise preview-icon sunrise"
              >
                <path d="M12 2v8" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m8 6 4-4 4 4" />
                <path d="M16 18a4 4 0 0 0-8 0" />
              </svg>

              <p class="sun-time-label">Sunrise</p>
              <p class="sun-time-value">05:30 AM</p>
            </div>

            <div class="sun-time sunset">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-sunset preview-icon sunset"
              >
                <path d="M12 10V2" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m16 6-4 4-4-4" />
                <path d="M16 18a4 4 0 0 0-8 0" />
              </svg>

              <p class="sun-time-label">Sunset</p>
              <p class="sun-time-value">06:55 PM</p>
            </div>
          </div>
        </div>
    
    `
}


function formatTime(totalMinutes) {

    const hours = Math.floor(totalMinutes / 60);

    const minutes = totalMinutes % 60;

    const period = hours >= 12 ? 'PM' : 'AM';

    const displayHours = hours % 12 || 12;

    return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}


function getCurrentCityTime(timeZone) {

    const timeParts = new Intl.DateTimeFormat('en-GB', {

        timeZone: timeZone,

        hour: '2-digit',

        minute: '2-digit',

        hourCycle: 'h23'

    }).formatToParts(new Date());


    const hours = Number(
        timeParts.find(part => part.type === 'hour').value
    );

    const minutes = Number(
        timeParts.find(part => part.type === 'minute').value
    );


    return hours * 60 + minutes;
}

// Temporary time configuration

const cityTimeZone = 'Asia/Tehran';

const sunriseTime = 5 * 60 + 30;
const sunsetTime = 18 * 60 + 55;

export function initSunTimeline() {

    // Initial update
    updateSunTimeline();

    // Update every second
    setInterval(updateSunTimeline, 1000);

}

function updateSunTimeline() {

    // Select SVG elements
    const sunTrack = document.querySelector('.sun-track');
    const sunProgress = document.querySelector('.sun-progress');
    const sunProgressArea = document.querySelector('.sun-progress-area');
    const sunIndicator = document.querySelector('.sun-indicator');
    const sunClock = document.querySelector('.sun-clock');

    const sunriseElement = document.querySelector('.sunrise .sun-time-value');
    const sunsetElement = document.querySelector('.sunset .sun-time-value');


    // Get current city time
    const currentTime = getCurrentCityTime(cityTimeZone);


    // Display sunrise and sunset times
    sunriseElement.textContent = formatTime(sunriseTime);
    sunsetElement.textContent = formatTime(sunsetTime);

    // Display current time
    sunClock.textContent = formatTime(currentTime);


    // Get the total length of the sun arc
    const totalLength = sunTrack.getTotalLength();


    // Calculate sun progress
    const progress = (currentTime - sunriseTime) /
                     (sunsetTime - sunriseTime);


    // Keep progress between 0 and 1
    const safeProgress = Math.min(1, Math.max(0, progress));


    // Calculate the current distance on the arc
    const currentDistance = totalLength * safeProgress;


    // Get the current sun position
    const sunPosition = sunTrack.getPointAtLength(currentDistance);


    // Move clock above the sun
    sunClock.setAttribute('x', sunPosition.x);
    sunClock.setAttribute('y', sunPosition.y - 20);


    // Move the sun indicator
    sunIndicator.setAttribute('cx', sunPosition.x);
    sunIndicator.setAttribute('cy', sunPosition.y);


    // Draw the passed sun arc
    sunProgress.style.strokeDasharray = `${currentDistance} ${totalLength}`;


    // Fill the passed daylight area
    if (safeProgress === 0) {

        sunProgressArea.setAttribute('d', '');

    } else {

        // Change daylight area color based on sun progress
        if (safeProgress <= 0.5) {
            sunProgressArea.style.fill = '#bac432ce';
        } else {
            sunProgressArea.style.fill = '#c47b32ce';
        }

        sunProgressArea.setAttribute(
            'd',
            `
                M 40 190
                A 160 160 0 0 1 ${sunPosition.x} ${sunPosition.y}
                L ${sunPosition.x} 190
                L 40 190
                Z
            `
        );

    }

}
