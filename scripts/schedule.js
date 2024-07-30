'use strict';

const { google } = require('googleapis');
const keys = require('../keys.json');

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
	'https://www.googleapis.com/auth/spreadsheets',
]);

let fullSchedule;

client.authorize(function (err, tokens) {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('Connected!');
		getSchedData(client);
	}
});

async function getSchedData(client) {
	// get data from spreadsheet
	const sheetsAPI = google.sheets({ version: 'v4', auth: client });
	const options = {
		spreadsheetId: '18_lJ-94FCqvVl1DiHL2Abw3TgyrD3nV9uOLrpdGVdZY',
		range: 'Main',
	};
	let scheduleData = await sheetsAPI.spreadsheets.values.get(options);

	scheduleData = scheduleData.data.values;

	//create JSON object from schedule array

	//get keys from spreadsheet header
	let keys = scheduleData[0];
	//remove keys from main array
	let scheduleArray = scheduleData.slice(1, scheduleData.length);

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

console.log(fullSchedule);

// function filterByLevel(item) {
//	if (item.level === 'Pre-Professional A') {
//		return true;
//	} else {
//		return false;
//	}
// }

// const scheduleByLevel = fullSchedule.filter(filterByLevel);

// console.log(scheduleByLevel);
