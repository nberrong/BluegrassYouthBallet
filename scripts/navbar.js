const primaryNav = document.querySelector(".topnav__links");
const navButton = document.querySelector(".topnav__button");

navButton.addEventListener("click", () => {
    const isOpened = navButton.getAttribute("aria-expanded");
   
    if (isOpened === "false") {
        navButton.setAttribute("aria-expanded", "true");
        primaryNav.setAttribute("data-visible", "true");
    } else {
        navButton.setAttribute("aria-expanded", "false");
        primaryNav.setAttribute("data-visible", "false");
    }
})