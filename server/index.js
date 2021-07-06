const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const port = process.env.PORT || 8080;
const baseUrl = "/api";
const createUrl = (path = "") => `${baseUrl}/${path}`;
const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user:'root',
	password: 'geheim',
	database:'kursterminadministration',
	connectionLimit: 5
});

app.use(cors());

async function queryDB(query) {
	let conn;
	try {
		conn = await pool.getConnection();
		return await conn.query(query);
	} catch (err) {
		throw err;
	} finally {
		if (conn) await conn.end();
	}
}

app.get(createUrl(), function (req, res) {
	res.send("Hello World");
});

app.get(createUrl("appointments"), function (req, res) {
	queryDB("SELECT * FROM termin")
		.then(queryResult => res.status(200).json(queryResult))
		.catch(error => res.status(400));
});

app.get(createUrl("appointments/:id"), function (req, res) {
	const {
		params: { id },
	} = req;
	queryDB(`SELECT * FROM termin WHERE id = ${id}`)
		.then(queryResult => res.status(200).json(queryResult))
		.catch(error => res.status(400).end());
});

app.post(createUrl("appointments"), jsonParser, function (req, res) {
	//console.log(req.body);
	const title = (typeof req.body.title !== 'undefined') ? `'${req.body.title}'` : 'NULL',
		start = (typeof req.body.start !== 'undefined') ? `'${req.body.start}'` : 'NULL',
		end = (typeof req.body.end !== 'undefined') ? `'${req.body.end}'` : 'NULL',
		repeat = (typeof req.body.repeat !== 'undefined') ? `'${req.body.repeat}'` : 'NULL',
		place = (typeof req.body.place !== 'undefined') ? `'${req.body.place}'` : 'NULL',
		description = (typeof req.body.description !== 'undefined') ? `'${req.body.description}'` : 'NULL',
		persons = (typeof req.body.persons !== 'undefined') ? `'${req.body.persons}'` : 'NULL';
	queryDB(`INSERT termin (titel, beginn, ende, wiederholung, ort, beschreibung, personen) ` +
		`VALUES (${title}, ${start}, ${end}, ${repeat}, ${place}, ${description}, ${persons})`)
		.then(queryResult => res.status(200).json(queryResult))
		.catch(error => {
			//console.log(error);
			res.status(400).end();});
});

app.put(createUrl("appointments"), jsonParser, function (req, res) {
	//console.log(req.body);
	const id = req.body.id,
		title = (typeof req.body.title !== 'undefined') ? `'${req.body.title}'` : 'NULL',
		start = (typeof req.body.start !== 'undefined') ? `'${req.body.start}'` : 'NULL',
		end = (typeof req.body.end !== 'undefined') ? `'${req.body.end}'` : 'NULL',
		repeat = (typeof req.body.repeat !== 'undefined') ? `'${req.body.repeat}'` : 'NULL',
		place = (typeof req.body.place !== 'undefined') ? `'${req.body.place}'` : 'NULL',
		description = (typeof req.body.description !== 'undefined') ? `'${req.body.description}'` : 'NULL',
		persons = (typeof req.body.persons !== 'undefined') ? `'${req.body.persons}'` : 'NULL';
	queryDB(`UPDATE termin SET titel = ${title}, beginn = ${start}, ende = ${end}, ` +
		`wiederholung = ${repeat}, ort = ${place}, beschreibung = ${description}, personen = ${persons} ` +
		`WHERE id = ${id}`)
		.then(queryResult => res.status(200).json(queryResult))
		.catch(error => {
			//console.log(error);
			res.status(400).end();});
});

app.delete(createUrl("appointments/:id"), function (req, res) {
	const {
		params: { id },
	} = req;

	queryDB(`DELETE FROM termin WHERE id = ${id}`)
		.then(queryResult => res.status(204).end())
		.catch(error => res.status(400).end());
});

app.get(createUrl("courses"), function (req, res) {
	queryDB("SELECT * FROM kurs")
		.then(queryResult => res.status(200).json(queryResult))
		.catch(error => res.status(400));
});

app.get(createUrl("courses/:id"), function (req, res) {
	const {
		params: { id },
	} = req;
	queryDB(`SELECT * FROM kurs WHERE id = ${id}`)
		.then(queryResult => res.status(200).json(queryResult))
		.catch(error => res.status(400).end());
});

app.post(createUrl("courses"), jsonParser, function (req, res) {
	//console.log(req.body);
	const name = (typeof req.body.name !== 'undefined') ? `'${req.body.name}'` : 'NULL',
		subject = (typeof req.body.subject !== 'undefined') ? `'${req.body.subject}'` : 'NULL',
		start = (typeof req.body.start !== 'undefined') ? `'${req.body.start}'` : 'NULL',
		end = (typeof req.body.end !== 'undefined') ? `'${req.body.end}'` : 'NULL',
		repeat = (typeof req.body.repeat !== 'undefined') ? `'${req.body.repeat}'` : 'NULL',
		times = (typeof req.body.times !== 'undefined') ? `'${req.body.times}'` : 'NULL',
		place = (typeof req.body.place !== 'undefined') ? `'${req.body.place}'` : 'NULL',
		description = (typeof req.body.description !== 'undefined') ? `'${req.body.description}'` : 'NULL',
		docents = (typeof req.body.docents !== 'undefined') ? `'${req.body.docents}'` : 'NULL';
	queryDB(`INSERT kurs (name, studiengang, beginn, ende, wiederholung, anzahl, ort, beschreibung, dozenten) ` +
		`VALUES (${name}, ${subject}, ${start}, ${end}, ${repeat}, ${times}, ${place}, ${description}, ${docents})`)
		.then(queryResult => res.status(200).json(queryResult))
		.catch(error => {
			//console.log(error);
			res.status(400).end();});
});

app.put(createUrl("courses"), jsonParser, function (req, res) {
	//console.log(req.body);
	const id = req.body.id,
		name = (typeof req.body.name !== 'undefined') ? `'${req.body.name}'` : 'NULL',
		subject = (typeof req.body.subject !== 'undefined') ? `'${req.body.subject}'` : 'NULL',
		start = (typeof req.body.start !== 'undefined') ? `'${req.body.start}'` : 'NULL',
		end = (typeof req.body.end !== 'undefined') ? `'${req.body.end}'` : 'NULL',
		repeat = (typeof req.body.repeat !== 'undefined') ? `'${req.body.repeat}'` : 'NULL',
		times = (typeof req.body.times !== 'undefined') ? `'${req.body.times}'` : 'NULL',
		place = (typeof req.body.place !== 'undefined') ? `'${req.body.place}'` : 'NULL',
		description = (typeof req.body.description !== 'undefined') ? `'${req.body.description}'` : 'NULL',
		docents = (typeof req.body.docents !== 'undefined') ? `'${req.body.docents}'` : 'NULL';
	queryDB(`UPDATE kurs SET name = ${name}, studiengang = ${subject}, beginn = ${start}, ende = ${end}, ` +
		`wiederholung = ${repeat}, anzahl = ${times}, ort = ${place}, beschreibung = ${description}, dozenten = ${docents} ` +
		`WHERE id = ${id}`)
		.then(queryResult => res.status(200).json(queryResult))
		.catch(error => {
			//console.log(error);
			res.status(400).end();});
});

app.delete(createUrl("courses/:id"), function (req, res) {
	const {
		params: { id },
	} = req;

	queryDB(`DELETE FROM kurs WHERE id = ${id}`)
		.then(queryResult => res.status(204).end())
		.catch(error => res.status(400).end());
});

console.log(`listening on port ${port}`);
app.listen(port);


