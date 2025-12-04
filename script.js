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
    changeBackground(code);


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

// Backgrounds regarding live Weather cast

const bgMap = {
    "01d": "linear-gradient(to bottom, #f9d423, #ff4e50)",      // sunny day
    "01n": "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)", // clear night

    "02d": "linear-gradient(to bottom, #a1c4fd, #c2e9fb)",       // few clouds day
    "02n": "linear-gradient(to bottom, #434343, #000000)",       // few clouds night

    "03d": "linear-gradient(to bottom, #d7d2cc, #304352)",       // scattered clouds
    "03n": "linear-gradient(to bottom, #232526, #414345)",

    "04d": "linear-gradient(to bottom, #757f9a, #d7dde8)",       // broken clouds
    "04n": "linear-gradient(to bottom, #232526, #414345)",

    "09d": "linear-gradient(to bottom, #4b79a1, #283e51)",       // drizzle
    "09n": "linear-gradient(to bottom, #2c3e50, #4ca1af)",

    "10d": "linear-gradient(to bottom, #005c97, #363795)",       // rain
    "10n": "linear-gradient(to bottom, #232526, #414345)",

    "11d": "linear-gradient(to bottom, #373b44, #4286f4)",       // thunderstorm
    "11n": "linear-gradient(to bottom, #141e30, #243b55)",

    "13d": "linear-gradient(to bottom, #e6dada, #274046)",       // snow
    "13n": "linear-gradient(to bottom, #000428, #004e92)",

    "50d": "linear-gradient(to bottom, #757f9a, #d7dde8)",       // mist
    "50n": "linear-gradient(to bottom, #3e5151, #decba4)"
};

function changeBackground(code) {
    const gradient = bgMap[code] || "linear-gradient(to bottom, #6db3f2, #1e69de)";
    document.body.style.background = gradient;
    document.body.style.transition = "background 0.6s ease";
}
