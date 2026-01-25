const icon = document.querySelector("#weather-icon");
const weather = document.querySelector("figcaption");
const temp = document.querySelector("#current-temp");


const API_KEY = "539ffbcbb35ccff2cd169fd7a0f419bb"
const lat = "49.75";
const myLong = "6.63";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${myLong}&appid=${API_KEY}&units=imperial`

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error)
    }
}

apiFetch();