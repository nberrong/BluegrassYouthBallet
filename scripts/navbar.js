const primaryNav = document.querySelector('.topnav__links');
const navButton = document.querySelector('.topnav__button');
const list = document.querySelector('nav .topnav__menu ul');
const links = list.querySelectorAll('a');

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
	}
}
