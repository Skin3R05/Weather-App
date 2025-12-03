const apiKey = "fbe0e03d78f5b5d2fa86439c18e02abf";

document.getElementById("search-btn").addEventListener("click", function () {
    const city = document.getElementById("city-input").value;
    if (city === "") return;

    getWeather(city);
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            showError(data.message || "Something went wrong");
            return;
        }

        showWeather(data);

    } catch (error) {
        console.log("Error:", error);
        showError("Network error");
    }
}

function showWeather(data) {
    document.getElementById("error-msg").classList.add("hidden");

    document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("desc").textContent = data.weather[0].description;

    document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.querySelector(".weather-result").classList.remove("hidden");
}

function showError() {
    document.querySelector(".weather-result").classList.add("hidden");
    document.getElementById("error-msg").classList.remove("hidden");
}


