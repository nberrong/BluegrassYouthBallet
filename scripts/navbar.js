const navButton = document.querySelector(".topnav__button");

navButton.addEventListener("click", () => {
    const isOpened = navButton.getAttribute("aria-expanded");
   
    if (isOpened === "false") {
        navButton.setAttribute("aria-expanded", "true");
    } else {
        navButton.setAttribute("aria-expanded", "false");
    }
})