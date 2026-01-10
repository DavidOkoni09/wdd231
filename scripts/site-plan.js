const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").innerHTML = `Last Modified: ${lastModified}`;

const navbutton = document.querySelector("#btn");
const nav = document.querySelector("#nav");

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