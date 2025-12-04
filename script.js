const apiKey = "fbe0e03d78f5b5d2fa86439c18e02abf";

// Local SVG folder
const ICON_PATH = "assets/svg/";

// CLICK search
document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) getWeather(city);
});

// PRESS ENTER to search
document.getElementById("city-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = document.getElementById("city-input").value.trim();
        if (city) getWeather(city);
    }
});

// ---- FETCH WEATHER ----
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            showError(data.message || "City not found");
            return;
        }

        showWeather(data);

    } catch (err) {
        console.error(err);
        showError("Network error");
    }
}

// ---- DISPLAY WEATHER ----
function showWeather(data) {

    const weatherBox = document.querySelector(".weather-result");
    const errorMsg   = document.getElementById("error-msg");
    const iconEl     = document.getElementById("icon");

    // Hide error
    errorMsg.classList.add("hidden");

    // Basic text
    document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    document.getElementById("desc").textContent = data.weather[0].description;

    // Icon code (example: "01d")
    const code = data.weather[0].icon;

    // Map → SVG
    const fileName = iconMap[code] || "unknown.svg";
    const localPath = `${ICON_PATH}${fileName}`;

    // Try local SVG
    iconEl.src = localPath;

    // If SVG missing → fallback PNG
    iconEl.onerror = () => {
        iconEl.src = `https://openweathermap.org/img/wn/${code}@2x.png`;
        iconEl.onerror = null;
    };

    // Show weather
    weatherBox.classList.remove("hidden");
}

// ---- SHOW ERROR ----
function showError(msg) {
    document.querySelector(".weather-result").classList.add("hidden");
    const errorMsg = document.getElementById("error-msg");
    errorMsg.textContent = msg;
    errorMsg.classList.remove("hidden");
}

// ---- ICON MAPPING ----
const iconMap = {
    "01d": "clear-day.svg",
    "01n": "clear-night.svg",

    "02d": "few-clouds.svg",
    "02n": "few-clouds.svg",

    "03d": "clouds.svg",
    "03n": "clouds.svg",
    "04d": "clouds.svg",
    "04n": "clouds.svg",

    "09d": "drizzle.svg",
    "09n": "drizzle.svg",

    "10d": "rain.svg",
    "10n": "rain.svg",

    "11d": "thunder.svg",
    "11n": "thunder.svg",

    "13d": "snow.svg",
    "13n": "snow.svg",

    "50d": "mist.svg",
    "50n": "mist.svg"
};
