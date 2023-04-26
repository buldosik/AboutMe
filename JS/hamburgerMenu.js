const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    // toggle class on hamburger
    hamburger.classList.toggle("active");
    // toggle class on menu
    menu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.
addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
}))