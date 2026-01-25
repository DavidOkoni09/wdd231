document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;


const hamburger = document.getElementById("hamburger");
const navigation = document.getElementById("navigation");
const grid = document.getElementById("grid");
const list = document.getElementById("list");
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');
const forecastContainer = document.querySelector("#forecast")

const API_KEY = "539ffbcbb35ccff2cd169fd7a0f419bb"
const lon = '8.34';
const lat = '4.97';



hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navigation.classList.toggle("open");
});

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data);
}

function displayResults(data) {
    // 1. Current Weather (from the first object in the list)
    const current = data.list[0];
    currentTemp.innerHTML = `${Math.round(current.main.temp)}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${current.weather[0].icon}.png`;
    let desc = current.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.toUpperCase();

    // 2. Three-Day Forecast
    // The API gives data in 3-hour chunks. We filter to get one reading per day (at 12:00 PM).
    const threeDayForecast = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    forecastContainer.innerHTML = ""; // Clear placeholder content

    threeDayForecast.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-day');
        forecastItem.innerHTML = `
            <span>${dayName}:</span>
            <strong>${Math.round(day.main.temp)}&deg;C</strong>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

async function getCompanyInfo() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayCompany(data.companies);
}

getCompanyInfo();
getWeather();

const displayCompany = (companies) => {
    const cardBox = document.querySelector(".box");

    const filteredMembers = companies.filter(company =>
        company.membership_level === "silver" || company.membership_level === "gold"
    );

    const spotlights = filteredMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    spotlights.forEach((company) => {
        const card = document.createElement("section");
        const image = document.createElement("img");
        const title = document.createElement("h2");
        const address = document.createElement("p")
        const website = document.createElement("a");
        const phone = document.createElement("p");

        image.setAttribute("src", company.image);
        image.setAttribute("alt", `${company.company_name} logo`);
        image.setAttribute("loading", "lazy");
        image.setAttribute('width', '80');
        image.setAttribute('height', '80');
        title.textContent = `${company.company_name}`;
        address.textContent = `${company.company_address}`;
        website.setAttribute("href", company.website);
        website.textContent = "Visit Website";
        phone.textContent = `${company.number}`;


        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(website);
        card.appendChild(phone);

        cardBox.appendChild(card);

    });       
}