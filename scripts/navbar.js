"use strict";

const primaryNav = document.querySelector(".topnav__links");
const mobileNavButton = document.querySelector(".topnav__button");
const list = document.querySelector("nav .topnav__menu ul");

let mobileAccordion = document.querySelectorAll(".submenu-button");

for (let i = 0; i < mobileAccordion.length; i++) {
  mobileAccordion[i].addEventListener("click", function () {
    const accordionOpen = mobileAccordion[i].getAttribute("aria-expanded");
    const submenu = mobileAccordion[i].nextElementSibling;

    if (accordionOpen === "false") {
      mobileAccordion[i].setAttribute("aria-expanded", "true");
      submenu.setAttribute("data-visible-mobile", "true");
    } else {
      mobileAccordion[i].setAttribute("aria-expanded", "false");
      submenu.setAttribute("data-visible-mobile", "false");
    }
  });
}

mobileNavButton.addEventListener("click", () => {
  const isOpened = mobileNavButton.getAttribute("aria-expanded");

  if (isOpened === "false") {
    mobileNavButton.setAttribute("aria-expanded", "true");
    primaryNav.setAttribute("data-visible-mobile", "true");
  } else {
    mobileNavButton.setAttribute("aria-expanded", "false");
    primaryNav.setAttribute("data-visible-mobile", "false");
  }
});

list.addEventListener("click", function handleClick(e) {
  if (e.target.matches("a")) {
    /*links.forEach((link) => link.classList.remove("active"));*/
    /*e.target.classList.add("active");*/
    primaryNav.setAttribute("data-visible-mobile", "false");
    mobileNavButton.setAttribute("aria-expanded", "false");
  }
});
