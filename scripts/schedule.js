'use strict';

import config from './config.js';

const selectLevelsButton = document.getElementById('select-levels-btn');
const getSchButton = document.getElementById('get-schedule-btn');
const clearSchedulesButton = document.getElementById('clear-sch-btn');

const checkboxes = document.querySelectorAll('input[type=checkbox]');

selectLevelsButton.addEventListener('click', function () {
	openSelectMenu();
});

clearSchedulesButton.addEventListener('click', function () {
	clearSchedules();
	uncheckAll();
});

getSchButton.addEventListener('click', function () {
	getSchedule().then((schedule) => {
		const selectMenu = document.getElementById('level-checkboxes');
		selectMenu.style.display = 'flex';
		let fullSchedule = formatSchedule(schedule);
		levelSelection(fullSchedule);
	});
});

// required API call - Google Sheets API
function getSchedule() {
	return fetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${config.SHEET_ID}/values/${config.SHEET_NAME}?key=${config.API_KEY}`
	)
		.then((response) => response.json())
		.then((data) => {
			return data.values;
		});
}

function openSelectMenu() {
	let menu = document.getElementById('level-select-menu');
	let openButtonDiv = document.getElementById('open-selectmenu-wrapper');

	clearSchedules();
	menu.style.display = 'block';

	openButtonDiv.style.display = 'none';
}

function closeSelectMenu() {
	let menu = document.getElementById('level-select-menu');
	let openButtonDiv = document.getElementById('open-selectmenu-wrapper');

	menu.style.display = 'none';

	openButtonDiv.style.display = 'flex';
}

function levelSelection(sch) {
	let parentCBs = document.querySelectorAll('.parent-checkbox');

	[...parentCBs].forEach((parentCB) => {
		if (parentCB.checked) {
			filterSchByDivision(sch, parentCB.value);
		} else {
			let checkboxChildren = document.querySelectorAll(
				`[name^="${parentCB.name}-"]`
			);
			if (checkboxChildren.length > 0) {
				checkboxChildren.forEach((childCB) => {
					if (childCB.checked) {
						filterSchByLevel(sch, childCB.value);
					}
				});
			}
		}
	});
}

// checkbox parent/child code begins here

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener('change', (event) =>
		checkboxStatusCheck(event.target)
	);
});

function checkboxStatusCheck(activeBox) {
	let children = document.querySelectorAll(`[name^=${activeBox.name}]`);
	children.forEach((child) => {
		child.checked = activeBox.checked;
		child.indeterminate = false;
	});
	checkIndeterminate();
}

function checkIndeterminate() {
	[...checkboxes].forEach((checkbox) => {
		let checkboxChildren = document.querySelectorAll(
			`[name^="${checkbox.name}-"]`
		);
		if (checkboxChildren.length === 0) return;
		let uncheckedChildren = [...checkboxChildren].filter(
			(child) => !child.checked
		);
		checkbox.indeterminate =
			uncheckedChildren.length > 0 &&
			uncheckedChildren.length < checkboxChildren.length;
		checkbox.checked = uncheckedChildren.length === 0;
	});
}

//schedule display functions begin here
function formatSchedule(sch) {
	let keys = sch[0];
	//remove keys from main array
	let scheduleArray = sch.slice(1, sch.length);

	let formattedSchedule = [],
		data = scheduleArray,
		cols = keys,
		l = cols.length;

	for (let i = 0; i < data.length; i++) {
		let d = data[i],
			o = {};
		for (let j = 0; j < l; j++) o[cols[j]] = d[j];
		formattedSchedule.push(o);
	}
	return formattedSchedule;
}

function filterSchByDivision(sch, division) {
	let filtered = [];

	closeSelectMenu();

	for (let i = 0; i < sch.length; i++) {
		if (sch[i].division !== division) {
			continue;
		}

		if (filtered.length === 0) {
			filtered.push(sch[i]);
		} else {
			if (sch[i].level === sch[i - 1].level) {
				filtered.push(sch[i]);
			} else {
				buildTable(filtered);
				filtered = [];
				filtered.push(sch[i]);
			}
		}
	}
	if (filtered.length > 0) {
		buildTable(filtered);
	}
}

function filterSchByLevel(sch, level) {
	let filtered = [];

	closeSelectMenu();

	for (let i = 0; i < sch.length; i++) {
		if (sch[i].level !== level) {
			continue;
		}

		if (filtered.length === 0) {
			filtered.push(sch[i]);
		} else {
			if (sch[i].level === sch[i - 1].level) {
				filtered.push(sch[i]);
			} else {
				buildTable(filtered);
				filtered = [];
				filtered.push(sch[i]);
			}
		}
	}
	if (filtered.length > 0) {
		buildTable(filtered);
	}
}

function buildTable(data) {
	const schContainer = document.getElementById('schedules-container');
	const tableDiv = document.createElement('div');
	const newTable = document.createElement('table');
	const newTbody = document.createElement('tbody');

	newTable.appendChild(newTbody);
	tableDiv.className = 'table-wrap';

	let caption = newTable.createCaption();
	caption.textContent = data[0].level;

	for (let i = 0; i < data.length; i++) {
		newTbody.innerHTML += `<tr>
						<td data-cell="day" class="day-cell">${data[i].day.substring(0, 3)}</td> 
						<td data-cell="time" class="time-cell">${data[i].start} —\n${data[i].end}</td>
						<td data-cell="type" class="type-cell">${data[i].type}</td>
						<td data-cell="studio" class="studio-cell">${data[i].studio}</td>
						<td data-cell="instructor" class="instructor-cell">${data[i].instructor}</td>
				   </tr>
		`;
		newTbody.insertRow(0);
	}
	tableDiv.appendChild(newTable);
	schContainer.appendChild(tableDiv);

	AddTableARIA();
}

function uncheckAll() {
	checkboxes.forEach((checkbox) => {
		checkbox.checked = false;
		checkbox.indeterminate = false;
	});
}

function clearSchedules() {
	document.getElementById('schedules-container').innerHTML = '';
}

// Function to add table ARIA from https://adrianroselli.com/2018/05/functions-to-add-aria-to-tables-and-lists.html
function AddTableARIA() {
	try {
		var allTables = document.querySelectorAll('table');
		for (var i = 0; i < allTables.length; i++) {
			allTables[i].setAttribute('role', 'table');
		}
		var allCaptions = document.querySelectorAll('caption');
		for (var i = 0; i < allCaptions.length; i++) {
			allCaptions[i].setAttribute('role', 'caption');
		}
		var allRowGroups = document.querySelectorAll('thead, tbody, tfoot');
		for (var i = 0; i < allRowGroups.length; i++) {
			allRowGroups[i].setAttribute('role', 'rowgroup');
		}
		var allRows = document.querySelectorAll('tr');
		for (var i = 0; i < allRows.length; i++) {
			allRows[i].setAttribute('role', 'row');
		}
		var allCells = document.querySelectorAll('td');
		for (var i = 0; i < allCells.length; i++) {
			allCells[i].setAttribute('role', 'cell');
		}
		var allHeaders = document.querySelectorAll('th');
		for (var i = 0; i < allHeaders.length; i++) {
			allHeaders[i].setAttribute('role', 'columnheader');
		}
		// this accounts for scoped row headers
		var allRowHeaders = document.querySelectorAll('th[scope=row]');
		for (var i = 0; i < allRowHeaders.length; i++) {
			allRowHeaders[i].setAttribute('role', 'rowheader');
		}
	} catch (e) {
		console.log('AddTableARIA(): ' + e);
	}
}
