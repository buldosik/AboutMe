// Get the height of the fixed menu bar
const menuHeight = document.querySelector(".nav-menu").offsetHeight;
const section1 = document.querySelector("#section1");
// Add event listeners to the menu links
const menuLinks = document.querySelectorAll(".nav-link");
menuLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        // Prevent the default link behavior
        e.preventDefault();

        // Get the target section
        const target = document.querySelector(this.getAttribute("href"));

        // Calculate the target scroll position
        const scrollPosition = target.offsetTop - menuHeight;

        // Scroll to the target position
        window.scrollTo({
            top: scrollPosition,
            behavior: "smooth"
        });
    });
});
