const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const port = process.env.PORT || 8080;
const baseUrl = "/api";
const createUrl = (path = "") => `${baseUrl}/${path}`;

app.use(cors());

let entries = [
	{
		persons: [6, 6],
		titel: "Informationsveranstaltung",
		repeat: "wöchentlich",
		start: Date.parse("10 Apr 2021 18:00:00 GMT"),
		description: "Dies ist ein Testtermin",
		end: Date.parse("10 Apr 2021 18:00:00 GMT"),
		id: 0,
		place: "Raum 7",
	},
	{
		persons: [12, 12],
		titel: "Testtermin",
		repeat: "wöchentlich",
		start: Date.parse("05 Jul 2021 16:00:00 GMT"),
		description: "Dies ist ein Testtermin von Benjamin",
		end: Date.parse("05 Jul 2021 18:00:00 GMT"),
		id: 1,
		place: "Raum 1",
	},
];

app.get(createUrl(), function (req, res) {
	res.send("Hello World");
});

app.get(createUrl("appointments"), function (req, res) {
	//TODO: fetch entries from db and return them instead of dummy data
	res.status(200).json({ entries: entries });
});

app.get(createUrl("appointments/:id"), function (req, res) {
	const {
		params: { id },
	} = req;

	res
		.status(200)
		.json({ appointment: entries.filter((e) => e.id === Number(id))[0] });
});

app.post(createUrl("appointments"), jsonParser, function (req, res) {
	console.log(req.body);
	const title = req.body.title;
	// TODO: do sth with title and others
	// ...
	res.status(201).end();
});

app.delete(createUrl("appointments/:id"), function (req, res) {
	const {
		params: { id },
	} = req;

	entries = entries.filter((e) => e.id !== Number(id));

	res.status(204).end();
});

console.log(`listening on port ${port}`);
app.listen(port);
