const navbutton = document.querySelector("#ham-btn");
const nav = document.querySelector("#nav-bar");

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    nav.classList.toggle("show");
})