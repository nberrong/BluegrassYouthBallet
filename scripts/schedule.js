'use strict';

import config from './config.js';

const selectLevelsButton = document.getElementById('select-levels-btn');
const getSchButton = document.getElementById('get-schedule-btn');
const clearSchedulesButton = document.getElementById('clear-sch-btn');

let checkboxes = document.querySelectorAll('.dynamic-cb');

getFullSchedule().then((schedule) => {
	const fullSchedule = formatSchedule(schedule);

	generateCheckboxes(fullSchedule);

	let checkboxes = document.querySelectorAll('.dynamic-cb');

	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener('change', (event) => {
			checkboxStatusCheck(event.target);
		});
	});

	selectLevelsButton.addEventListener('click', function () {
		openSelectMenu();
	});

	getSchButton.addEventListener('click', () => outputSchedules(fullSchedule));

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

	function uncheckAll() {
		checkboxes.forEach((checkbox) => {
			checkbox.checked = false;
			checkbox.indeterminate = false;
		});
	}
});

function generateCheckboxes(sch) {
	// checkbox generation code here
	let checkboxesEl = document.getElementById('checkboxes-container');
	checkboxesEl.innerHTML = `<ul id="level-checkboxes">
					<div class="division_group">
						<li class="parent-cb">
							<input
								type="checkbox"
								name="prepro"
								id="prepro"
								class="parent-checkbox dynamic-cb"
								value="Pre-Professional"
							/>
							<label class="level-label" for="prepro">Pre-Professional</label>
							<ul>
								<li class="child-cb">
									<input
										type="checkbox"
										name="prepro-A"
										id="prepro-A"
										class="child-checkbox dynamic-cb"
										value="Pre-Professional A"
									/>
									<label class="level-label" for="prepro-A"
										>Pre-Professional A</label
									>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="prepro-B"
										id="prepro-B"
										class="child-checkbox dynamic-cb"
										value="Pre-Professional B"
									/>
									<label class="level-label" for="prepro-B"
										>Pre-Professional B</label
									>
								</li>
							</ul>
						</li>
					</div>

					<div class="division_group">
						<li class="parent-cb">
							<input
								type="checkbox"
								name="advanced"
								id="advanced"
								class="parent-checkbox dynamic-cb"
								value="Advanced"
							/>
							<label class="level-label" for="advanced">Advanced</label>
							<ul>
								<li class="child-cb">
									<input
										type="checkbox"
										name="advanced-A"
										id="advanced-A"
										class="child-checkbox dynamic-cb"
										value="Advanced A"
									/>
									<label class="level-label" for="advanced-A">Advanced A</label>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="advanced-B"
										id="advanced-B"
										class="child-checkbox dynamic-cb"
										value="Advanced B"
									/>
									<label class="level-label" for="advanced-B">Advanced B</label>
								</li>
							</ul>
						</li>
					</div>

					<div class="division_group">
						<li class="parent-cb">
							<input
								type="checkbox"
								name="int"
								id="int"
								class="parent-checkbox dynamic-cb"
								value="Intermediate"
							/>
							<label class="level-label" for="int">Intermediate</label>
							<ul>
								<li class="child-cb">
									<input
										type="checkbox"
										name="int-A1"
										id="int-A1"
										class="child-checkbox dynamic-cb"
										value="Intermediate A1"
									/>
									<label class="level-label" for="int-A1"
										>Intermediate A1</label
									>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="int-A2"
										id="int-A2"
										class="child-checkbox dynamic-cb"
										value="Intermediate A2"
									/>
									<label class="level-label" for="int-A2"
										>Intermediate A2</label
									>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="int-B"
										id="int-B"
										class="child-checkbox dynamic-cb"
										value="Intermediate B"
									/>
									<label class="level-label" for="int-B">Intermediate B</label>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="int-C"
										id="int-C"
										class="child-checkbox dynamic-cb"
										value="Intermediate C"
									/>
									<label class="level-label" for="int-C">Intermediate C</label>
								</li>
							</ul>
						</li>
					</div>

					<div class="division_group">
						<li class="parent-cb">
							<input
								type="checkbox"
								name="elem"
								id="elem"
								class="parent-checkbox dynamic-cb"
								value="Elementary"
							/>
							<label class="level-label" for="elem">Elementary</label>
							<ul>
								<li class="child-cb">
									<input
										type="checkbox"
										name="elem-A1"
										id="elem-A1"
										class="child-checkbox dynamic-cb"
										value="Elementary A1"
									/>
									<label class="level-label" for="elem-A1">Elementary A1</label>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="elem-A2"
										id="elem-A2"
										class="child-checkbox dynamic-cb"
										value="Elementary A2"
									/>
									<label class="level-label" for="elem-A2">Elementary A2</label>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="elem-A3"
										id="elem-A3"
										class="child-checkbox dynamic-cb"
										value="Elementary A3"
									/>
									<label class="level-label" for="elem-A3">Elementary A3</label>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="elem-A4"
										id="elem-A4"
										class="child-checkbox dynamic-cb"
										value="Elementary A4"
									/>
									<label class="level-label" for="elem-A4">Elementary A4</label>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="elem-B1"
										id="elem-B1"
										class="child-checkbox dynamic-cb"
										value="Elementary B1"
									/>
									<label class="level-label" for="elem-B1">Elementary B1</label>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="elem-B2"
										id="elem-B2"
										class="child-checkbox dynamic-cb"
										value="Elementary B2"
									/>
									<label class="level-label" for="elem-B2">Elementary B2</label>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="elem-B3"
										id="elem-B3"
										class="child-checkbox dynamic-cb"
										value="Elementary B3"
									/>
									<label class="level-label" for="elem-B3">Elementary B3</label>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="elem-C1"
										id="elem-C1"
										class="child-checkbox dynamic-cb"
										value="Elementary C1"
									/>
									<label class="level-label" for="elem-B1">Elementary C1</label>
								</li>
								<li class="child-cb">
									<input
										type="checkbox"
										name="elem-C2"
										id="elem-C2"
										class="child-checkbox dynamic-cb"
										value="Elementary C2"
									/>
									<label class="level-label" for="elem-C2">Elementary C2</label>
								</li>
							</ul>
						</li>
					</div>
				</ul>`;
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
