const { google } = require('googleapis');
const keys = require('../keys.json');

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
	'https://www.googleapis.com/auth/spreadsheets',
]);

client.authorize(function (err, tokens) {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('Connected!');
		getSchedSheet(client);
	}
});

async function getSchedSheet(client) {
	// get data from spreadsheet
	const sheetsAPI = google.sheets({ version: 'v4', auth: client });
	const options = {
		spreadsheetId: '18_lJ-94FCqvVl1DiHL2Abw3TgyrD3nV9uOLrpdGVdZY',
		range: 'Main',
	};
	let scheduleData = await sheetsAPI.spreadsheets.values.get(options);

	scheduleData = scheduleData.data.values;

	console.log(scheduleData);
}
