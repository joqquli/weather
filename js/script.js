const apiKey = '96155cd0990498e754a79bc3a8cb1908';  // Muista vaihtaa oma avain tähän
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const iconBaseURL = 'https://openweathermap.org/img/wn/';

const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const windElement = document.getElementById('wind');
const weatherIconElement = document.getElementById('weather-icon');
const humidityElement = document.getElementById('humidity'); // Uusi elementti kosteudelle
const sunriseElement = document.getElementById('sunrise'); // Uusi elementti auringonnousulle
const sunsetElement = document.getElementById('sunset'); // Uusi elementti auringonlaskulle
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');

// Funktio muuntaa UNIX-ajan normaaliksi kellonajaksi
function convertUnixTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
}

// Hakee säätiedot syötetyn kaupungin perusteella
function getWeatherByCity(city) {
    const url = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric&lang=fi`;

    axios.get(url)
        .then((response) => {
            const weatherData = response.data;
            const locationName = weatherData.name;
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const windSpeed = weatherData.wind.speed;
            const humidity = weatherData.main.humidity; // Hakee kosteuden
            const sunrise = convertUnixTime(weatherData.sys.sunrise); // Muuntaa auringonnousuajan
            const sunset = convertUnixTime(weatherData.sys.sunset); // Muuntaa auringonlaskuajan

            // Näytetään tiedot
            locationElement.textContent = `Paikkakunta: ${locationName}`;
            temperatureElement.textContent = `Lämpötila: ${temperature}°C`;
            descriptionElement.textContent = `Kuvaus: ${description}`;
            windElement.textContent = `Tuulen nopeus: ${windSpeed} m/s`;
            humidityElement.textContent = `Kosteus: ${humidity}%`;
            sunriseElement.textContent = `Auringonnousu: ${sunrise}`;
            sunsetElement.textContent = `Auringonlasku: ${sunset}`;

            const iconCode = weatherData.weather[0].icon;
            weatherIconElement.src = `${iconBaseURL}${iconCode}@2x.png`;
            weatherIconElement.style.display = 'block'; // Näytetään kuvake, kun data on haettu
        })
        .catch((error) => {
            locationElement.textContent = 'Paikkakuntaa ei löytynyt.';
        });
}

// Lomakkeen lähetys tapahtuma
cityForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        getWeatherByCity(city);
    }
});
