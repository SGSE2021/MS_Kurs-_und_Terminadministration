const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const port = process.env.PORT || 8080;
const baseUrl = "/api";
const createUrl = (path = "") => `${baseUrl}/${path}`;
const mariadb = require('mariadb');
const DATABASE_DNS = process.env.DATABASE_DNS !== undefined ? process.env.DATABASE_DNS : 'localhost';
const DATABASE_USER = process.env.DATABASE_USER !== undefined ? process.env.DATABASE_USER : 'root';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD !== undefined ? process.env.DATABASE_PASSWORD : 'geheim';
const DATABASE_ADMIN_PW = process.env.DATABASE_ADMIN_PW !== undefined ? process.env.DATABASE_ADMIN_PW : 'geheim';
const DATABASE_NAME = process.env.DATABASE_NAME !== undefined ? process.env.DATABASE_NAME : 'kursterminadministration';
const DATABASE_PORT = process.env.DATABASE_PORT !== undefined ? process.env.DATABASE_PORT : '3306';

const pool = mariadb.createPool({
	host: DATABASE_DNS,
	port: DATABASE_PORT,
	user:DATABASE_USER,
	password: DATABASE_PASSWORD,
	database:DATABASE_NAME,
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


queryDB("SELECT * FROM course")
	.then()
	.catch(() => {
		console.log("Table course not found, trying to create it");
		queryDB("CREATE TABLE COURSE (\n" +
			"id INT PRIMARY KEY AUTO_INCREMENT, \n" +
			"name VARCHAR(50) NOT NULL,\n" +
			"subject INT NOT NULL,\n" +
			"start DATETIME NOT NULL,\n" +
			"end DATETIME NOT NULL,\n" +
			"repetition VARCHAR(50),\n" +
			"times INT,\n" +
			"place INT,\n" +
			"description TEXT,\n" +
			"docents TEXT); ")
			.then(() => console.log("Created table course successfully"))
			.catch(() => console.log("Couldn't create table course"))
	});

queryDB("SELECT * FROM appointment")
	.then()
	.catch(() => {
		console.log("Table appointment not found, trying to create it");
		queryDB("CREATE TABLE APPOINTMENT (\n" +
			"id INT PRIMARY KEY AUTO_INCREMENT, \n" +
			"title VARCHAR(50) NOT NULL,\n" +
			"start DATETIME NOT NULL,\n" +
			"end DATETIME NOT NULL,\n" +
			"repetition VARCHAR(50),\n" +
			"place INT,\n" +
			"description TEXT,\n" +
			"persons TEXT")
			.then(() => console.log("Created table appointment successfully"))
			.catch(() => console.log("Couldn't create table appointment"))
	});



app.get(createUrl(), function (req, res) {
	res.send("Hello World");
});

app.get(createUrl("appointments"), function (req, res) {
	queryDB("SELECT * FROM appointment")
		.then(queryResult => res.status(200).json(queryResult).end())
		.catch(error => res.status(400).end());
});

app.get(createUrl("appointments/:id"), function (req, res) {
	const {
		params: { id },
	} = req;
	queryDB(`SELECT * FROM appointment WHERE id = ${id}`)
		.then(queryResult => res.status(200).json(queryResult).end())
		.catch(error => {
			console.log(error);
			res.status(400).end();});
});

app.post(createUrl("appointments"), jsonParser, function (req, res) {
	console.log(req.body);

	const title = (typeof req.body.title !== 'undefined') ? `'${req.body.title}'` : 'NULL',
		start = (typeof req.body.start !== 'undefined') ? `'${req.body.start}`.replace("T", " ").slice(0,-5) + `'` : 'NULL',
		end = (typeof req.body.end !== 'undefined') ? `'${req.body.end}`.replace("T", " ").slice(0,-5) + `'` : 'NULL',
		repetition = (typeof req.body.repetition !== 'undefined') ? `'${req.body.repetition}'` : 'NULL',
		place = (typeof req.body.place !== 'undefined') ? `'${req.body.place}'` : 'NULL',
		description = (typeof req.body.description !== 'undefined') ? `'${req.body.description}'` : 'NULL',
		persons = (typeof req.body.persons !== 'undefined') ? `'${req.body.persons}'` : 'NULL';
	queryDB(`INSERT appointment (title, start, end, repetition, place, description, persons) ` +
		`VALUES (${title}, ${start}, ${end}, ${repetition}, ${place}, ${description}, ${persons})`)
		.then(queryResult => res.status(200).json(queryResult).end())
		.catch(error => {
			console.log(error);
			res.status(400).end();});
});

app.put(createUrl("appointments"), jsonParser, function (req, res) {
	//console.log(req.body);

	const id = req.body.id,
		title = (typeof req.body.title !== 'undefined') ? `'${req.body.title}'` : 'NULL',
		start = (typeof req.body.start !== 'undefined') ? `'${req.body.start}'`.replace("T", " ").slice(0,-5) + `'` : 'NULL',
		end = (typeof req.body.end !== 'undefined') ? `'${req.body.end}'`.replace("T", " ").slice(0,-5) + `'` : 'NULL',
		repetition = (typeof req.body.repetition !== 'undefined') ? `'${req.body.repetition}'` : 'NULL',
		place = (typeof req.body.place !== 'undefined') ? `'${req.body.place}'` : 'NULL',
		description = (typeof req.body.description !== 'undefined') ? `'${req.body.description}'` : 'NULL',
		persons = (typeof req.body.persons !== 'undefined') ? `'${req.body.persons}'` : 'NULL';

	queryDB(`UPDATE appointment SET title = ${title}, start = ${start}, end = ${end}, ` +
		`repetition = ${repetition}, place = ${place}, description = ${description}, persons = ${persons} ` +
		`WHERE id = ${id}`)
		.then(queryResult => res.status(200).json(queryResult).end())
		.catch(error => {
			//console.log(error);
			res.status(400).end();});
});

app.delete(createUrl("appointments/:id"), function (req, res) {
	const {
		params: { id },
	} = req;

	queryDB(`DELETE FROM appointment WHERE id = ${id}`)
		.then(queryResult => res.status(204).end())
		.catch(error => res.status(400).end());
});

app.get(createUrl("courses"), function (req, res) {
	queryDB("SELECT * FROM course")
		.then(queryResult => res.status(200).json(queryResult).end())
		.catch(error => res.status(400).end());
});

app.get(createUrl("courses/:id"), function (req, res) {
	//console.log(req);

	const {
		params: { id },
	} = req;
	queryDB(`SELECT * FROM course WHERE id = ${id}`)
		.then(queryResult => res.status(200).json(queryResult).end())
		.catch(error => res.status(400).end());
});

app.post(createUrl("courses"), jsonParser, function (req, res) {
	console.log(req.body);
	const name = (typeof req.body.name !== 'undefined') ? `'${req.body.name}'` : 'NULL',
		subject = (typeof req.body.subject !== 'undefined') ? `'${req.body.subject}'` : 'NULL',
		start = (typeof req.body.start !== 'undefined') ? `'${req.body.start}'`.replace("T", " ").slice(0,-5) + `'` : 'NULL',
		end = (typeof req.body.end !== 'undefined') ? `'${req.body.end}'`.replace("T", " ").slice(0,-5) + `'` : 'NULL',
		repetition = (typeof req.body.repetition !== 'undefined') ? `'${req.body.repetition}'` : 'NULL',
		times = (typeof req.body.times !== 'undefined') ? `'${req.body.times}'` : 'NULL',
		place = (typeof req.body.place !== 'undefined') ? `'${req.body.place}'` : 'NULL',
		description = (typeof req.body.description !== 'undefined') ? `'${req.body.description}'` : 'NULL',
		docents = (typeof req.body.docents !== 'undefined') ? `'${req.body.docents}'` : 'NULL';

	queryDB(`INSERT course (name, subject, start, end, repetition, times, place, description, docents) ` +
		`VALUES (${name}, ${subject}, ${start}, ${end}, ${repetition}, ${times}, ${place}, ${description}, ${docents})`)
		.then(queryResult => res.status(200).json(queryResult).end())
		.catch(error => {
			console.log(error);
			res.status(400).end();});
});

app.put(createUrl("courses"), jsonParser, function (req, res) {
	//console.log(req.body);
	const id = req.body.id,
		name = (typeof req.body.name !== 'undefined') ? `'${req.body.name}'` : 'NULL',
		subject = (typeof req.body.subject !== 'undefined') ? `'${req.body.subject}'` : 'NULL',
		start = (typeof req.body.start !== 'undefined') ? `'${req.body.start}'`.replace("T", " ").slice(0,-5) + `'` : 'NULL',
		end = (typeof req.body.end !== 'undefined') ? `'${req.body.end}'`.replace("T", " ").slice(0,-5) + `'` : 'NULL',
		repetition = (typeof req.body.repetition !== 'undefined') ? `'${req.body.repetition}'` : 'NULL',
		times = (typeof req.body.times !== 'undefined') ? `'${req.body.times}'` : 'NULL',
		place = (typeof req.body.place !== 'undefined') ? `'${req.body.place}'` : 'NULL',
		description = (typeof req.body.description !== 'undefined') ? `'${req.body.description}'` : 'NULL',
		docents = (typeof req.body.docents !== 'undefined') ? `'${req.body.docents}'` : 'NULL';

	queryDB(`UPDATE course SET name = ${name}, subject = ${subject}, start = ${start}, end = ${end}, ` +
		`repetition = ${repetition}, times = ${times}, place = ${place}, description = ${description}, docents = ${docents} ` +
		`WHERE id = ${id}`)
		.then(queryResult => res.status(200).json(queryResult).end())
		.catch(error => {
			console.log(error);
			res.status(400).end();});
});

app.delete(createUrl("courses/:id"), function (req, res) {
	const {
		params: { id },
	} = req;

	queryDB(`DELETE FROM course WHERE id = ${id}`)
		.then(queryResult => res.status(204).end())
		.catch(error => res.status(400).end());
});


/// internal API
app.get(createUrl("findAppointments"), function (req, res) {
	const query = req.query;
	const key = Object.keys(query)[0];
	const value = query[key];
	queryDB(`SELECT * FROM appointment WHERE ${key} = '${value}'`)
		.then(queryResult => res.status(200).json(queryResult).end())
		.catch(error => res.status(400).end());
});

app.get(createUrl("findCourses"), function (req, res) {
	const query = req.query;
	const key = Object.keys(query)[0];
	const value = query[key];
	queryDB(`SELECT * FROM course WHERE ${key} = '${value}'`)
		.then(queryResult => res.status(200).json(queryResult).end())
		.catch(error => res.status(400).end());
});

console.log(`listening on port ${port}`);
app.listen(port);


