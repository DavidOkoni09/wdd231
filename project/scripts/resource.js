
async function getCompanyInfo() {
    const response = await fetch("data/companies.json");
    const data = await response.json();
    displayCompany(data);
}

getCompanyInfo();

const displayCompany = (companies) => {
    companies.forEach((company) => {
        const companyDisplay = document.querySelector("#company-list");

        const card = document.createElement("section");
        const image = document.createElement("img");
        const name = document.createElement("h3");
        const address = document.createElement("p")
        const website = document.createElement("a");

        image.setAttribute("src", company.logo);
        image.setAttribute("alt", `${company.name} logo`);
        image.setAttribute("loading", "lazy");
        image.setAttribute('width', '100');
        image.setAttribute('height', '100');
        name.textContent = `${company.name}`;
        address.textContent = `${company.location}`;
        website.setAttribute("href", company.website);
        website.textContent = `${company.name}`;



        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(website);

        companyDisplay.appendChild(card);

    });
}