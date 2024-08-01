'use strict';

import config from './config.js';

let getSchButton = document.querySelector('.get-schedule-btn');

getSchButton.addEventListener('click', function () {
	getSchedule().then((schedule) => {
		let division = 'prepro';
		let fullSchedule = formatSchedule(schedule);

		// code for level selection goes here

		let filteredSchedule = filterDivision(fullSchedule, division);
		buildTable(filteredSchedule);
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

function filterDivision(sch, division) {
	let filtered = [];

	for (let i = 0; i < sch.length; i++) {
		if (sch[i].division === division) {
			filtered.push(sch[i]);
		}
	}

	return filtered;
}

function buildTable(data) {
	const table = document.querySelector('table');
	const tbodyEl = document.getElementById('schedule-data-table');
	const captionContainer = document.getElementById('caption-wrapper');
	let caption = table.createCaption();
	caption.textContent = data[1].level;

	for (let i = 0; i < data.length; i++) {
		tbodyEl.innerHTML += `<tr>
						<td data-cell="day" class="day-cell">${data[i].day.substring(0, 3)}</td> 
						<td data-cell="time" class="time-cell">${data[i].start} —\n${data[i].end}</td>
						<td data-cell="type" class="type-cell">${data[i].type}</td>
						<td data-cell="studio" class="studio-cell">${data[i].studio}</td>
						<td data-cell="instructor" class="instructor-cell">${data[i].instructor}</td>
				   </tr>
		`;
		tbodyEl.insertRow(0);
	}
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
