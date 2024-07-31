'use strict';

import config from './config.js';

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

getSchedule().then((schedule) => {
	let level = 'Pre-Professional A';
	let fullSchedule = formatSchedule(schedule);
	console.log(fullSchedule);
	let filteredSchedule = filterLevel(fullSchedule, level);
	buildTable(filteredSchedule);
});

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

function filterLevel(sch, level) {
	let filtered = [];

	for (let i = 0; i < sch.length; i++) {
		if (sch[i].level === level) {
			filtered.push(sch[i]);
		}
	}

	return filtered;
}

function buildTable(data) {
	let tbodyEl = document.getElementById('schedule-data-table');
	let rowEl = document.createElement('tr');

	for (let i = 0; i < data.length; i++) {
		rowEl.className = 'class-row';
		tbodyEl.innerHTML += `<tr>
						<td id="day-cell">${data[i].day}</td>
						<td id="type-cell">${data[i].type}</td>
						<td id="start-cell">${data[i].start}</td>
						<td id="end-cell">${data[i].end}</td>
						<td id="studio-cell">${data[i].studio}</td>
						<td id="instructor-cell">${data[i].instructor}</td>
				   </tr>
		`;
		tbodyEl.insertRow(-1);
	}
}
