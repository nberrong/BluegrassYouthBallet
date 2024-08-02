'use strict';

import config from './config.js';

let getSchButton = document.querySelector('.get-schedule-btn');

getSchButton.addEventListener('click', function () {
	getSchedule().then((schedule) => {
		let division = 'prepro';
		let fullSchedule = formatSchedule(schedule);

		// code for level selection goes here

		filterSchedule(fullSchedule, division);
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

function filterSchedule(sch, division) {
	let filtered = [];
	let currentLevel = sch[0].level;

	for (let i = 0; i < sch.length; i++) {
		if (sch[i].division === division) {
			if (sch[i].level === currentLevel) {
				filtered.push(sch[i]);
			} else {
				buildTable(filtered);
				console.log(filtered);
				filtered = [];
				filtered.push(sch[i]);
				currentLevel = sch[i].level;
			}
		}
	}
	if (filtered.length !== 0) {
		buildTable(filtered);
	}
}

function buildTable(data) {
	const schContainer = document.getElementById('schedules-container');
	const newTable = document.createElement('table');
	const newTbody = document.createElement('tbody');
	newTable.appendChild(newTbody);

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
	schContainer.appendChild(newTable);
	AddTableARIA();
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
