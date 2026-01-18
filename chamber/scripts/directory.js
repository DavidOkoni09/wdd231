const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").innerHTML = `Last Modified: ${lastModified}`;

const navbutton = document.querySelector("#btn");
const nav = document.querySelector("#nav");
const cards = document.querySelector("#biz-container")
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

gridbutton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});



navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    nav.classList.toggle("show");
    const isHam = navbutton.textContent === "\u2630";

    if (isHam) {
        navbutton.textContent = "\u2715";
        navbutton.setAttribute("aria-expanded", "true");
    } else {
        navbutton.textContent = "\u2630";
        navbutton.setAttribute("aria-expanded", "false");
    }
})

async function getCompany() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    displayCompany(data.companies);
}

function displayCompany(companies) {
    companies.forEach(company => {
        const card = document.createElement("div");
        card.classList.add("card")

        const name = document.createElement("p");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const mail = document.createElement("p");
        const image = document.createElement("img");
        const level = document.createElement("p");

        name.textContent = `${company.company_name}`
        address.textContent = `${company.company_address}`

        level.textContent = `${company.membership_level.level_1}`
        phone.innerHTML = `${company.number}`
        mail.textContent = `${company.email}`

        image.setAttribute('src', company.image);
        image.setAttribute('alt', `Image of ${company.company_name} logo`)
        image.setAttribute('loading', 'lazy')
        image.setAttribute('width', '150')
        image.setAttribute('height', 'auto')

        card.appendChild(image)
        card.appendChild(name)
        card.appendChild(address)
        card.appendChild(phone)
        card.appendChild(mail)

        cards.appendChild(card)
    })
}

getCompany();
