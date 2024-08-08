'use strict';

import config from './config.js';

const selectLevelsButton = document.getElementById('select-levels-btn');

const clearSchedulesButton = document.getElementById('clear-sch-btn');

getFullSchedule().then((schedule) => {
	const fullSchedule = formatSchedule(schedule);

	generateCheckboxes(fullSchedule);

	selectLevelsButton.addEventListener('click', function () {
		openSelectMenu();
	});

	const getSchButton = document.getElementById('get-schedule-btn');
	getSchButton.addEventListener('click', () => outputSchedules(fullSchedule));
});

function generateCheckboxes(sch) {
	// checkbox container - append to this as each level generated
	const checkboxesEl = document.getElementById('checkboxes-container');

	const checkboxListEl = document.createElement('ul');
	checkboxListEl.id = 'level-checkboxes';

	let currentDivision = sch[0].division;
	let currentLevel = sch[0].level;

	let schForSubmenu = [];

	for (let i = 0; i < sch.length; i++) {
		if (
			i === 0 ||
			(sch[i].division === currentDivision && sch[i].level === currentLevel)
		) {
			if (i === 0) {
				schForSubmenu.push(sch[i]);
			} else {
				continue;
			}
		} else if (
			sch[i].division === currentDivision &&
			sch[i].level !== currentLevel &&
			i !== sch.length - 1
		) {
			schForSubmenu.push(sch[i]);
			currentLevel = sch[i].level;
		} else {
			let divisionNameLC = sch[i - 1].division;

			const parentCheckboxEl = document.createElement('li');
			parentCheckboxEl.className = 'parent-cb';

			// level li (checkbox and label) and child ul go into here
			const cbLevelGroupingEl = document.createElement('div');
			cbLevelGroupingEl.className = 'division-group';

			parentCheckboxEl.innerHTML = `
            <input
                type="checkbox"
                name="${sch[i - 1].division}"
                id="${sch[i - 1].division}"
                class="parent-checkbox dynamic-cb"
                value="${sch[i - 1].division}"
          />
          <label class="level-label" for="${sch[i - 1].division}">${
				sch[i - 1].division
			}</label>`;
			cbLevelGroupingEl.appendChild(parentCheckboxEl);
			generateChildCheckboxMenu(schForSubmenu, cbLevelGroupingEl);
			checkboxListEl.appendChild(cbLevelGroupingEl);

			currentDivision = sch[i].division;
			currentLevel = sch[i].level;
			schForSubmenu.push(sch[i]);

			checkboxesEl.appendChild(checkboxListEl);
		}
	}

	function generateChildCheckboxMenu(sch, group) {
		const childCheckboxList = document.createElement('ul');
		childCheckboxList.className = '.children-checkboxes';

		for (let i = 0; i < sch.length; i++) {
			childCheckboxList.innerHTML += `
              <li class="child-cb">  
							<input
                type="checkbox"
                name="${sch[i].CBname}"
                id="${sch[i].CBname}"
                class="child-checkbox dynamic-cb"
                value="${sch[i].level}"
              />
              <label class="level-label" for="${sch[i].CBname}">${sch[i].level}</label>
							</li>
        `;
		}
		group.appendChild(childCheckboxList);
		schForSubmenu = [];
	}

	let checkboxes = document.querySelectorAll('.dynamic-cb');

	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener('change', (event) => {
			checkboxStatusCheck(event.target);
		});
	});

	clearSchedulesButton.addEventListener('click', function () {
		clearSchedules();
		uncheckAll();
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
				`[name^="${checkbox.name}_"]`
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

	function uncheckAll() {
		checkboxes.forEach((checkbox) => {
			checkbox.checked = false;
			checkbox.indeterminate = false;
		});
	}
}

// required API call - Google Sheets API
function getFullSchedule() {
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

function outputSchedules(sch) {
	let parentCBs = document.querySelectorAll('.parent-checkbox');

	[...parentCBs].forEach((parentCB) => {
		if (parentCB.checked) {
			filterSchByDivision(sch, parentCB.value);
		} else {
			let checkboxChildren = document.querySelectorAll(
				`[name^="${parentCB.name}_"]`
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

	let tableHead = newTbody.insertRow(0);
	tableHead.outerHTML = `<th colspan="5">${data[0].comment}</th>`;

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
