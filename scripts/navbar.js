const primaryNav = document.querySelector('.topnav__links');
const navButton = document.querySelector('.topnav__button');
const list = document.querySelector('nav .topnav__menu ul');
const links = list.querySelectorAll('a');

let accordion = document.querySelectorAll('.submenu-button');

for (let i = 0; i < accordion.length; i++) {
	const accordionOpen = accordion[i].getAttribute('aria-expanded');
	const submenu = accordion[i].nextElementSibling;

	if (accordionOpen === 'false') {
		accordion[i].addEventListener('click', function () {
			accordion[i].setAttribute('aria-expanded', 'true');
			submenu.setAttribute('data-visible', 'true');
		});
	} else {
		accordion[i].setAttribute('aria-expanded', 'false');
		submenu.setAttribute('data-visible', 'false');
	}
}

list.addEventListener('click', handleClick);

navButton.addEventListener('click', () => {
	const isOpened = navButton.getAttribute('aria-expanded');

	if (isOpened === 'false') {
		navButton.setAttribute('aria-expanded', 'true');
		primaryNav.setAttribute('data-visible', 'true');
	} else {
		navButton.setAttribute('aria-expanded', 'false');
		primaryNav.setAttribute('data-visible', 'false');
	}
});

function handleClick(e) {
	if (e.target.matches('a')) {
		links.forEach((link) => link.classList.remove('active'));
		e.target.classList.add('active');
		primaryNav.setAttribute('data-visible', 'false');
		navButton.setAttribute('aria-expanded', 'false');
	}
}
