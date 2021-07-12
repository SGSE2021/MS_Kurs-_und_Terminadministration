import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, {useEffect} from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDateTimePicker,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {Helmet} from "react-helmet";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		width: "80vw",
		marginLeft: "180px",
		border: "1px solid black",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "60ch",
	},
	text: {
		"font-size": "calc(5px + 2vmin)",
		marginLeft: "10px",
		marginRight: "50px",
		color: "black",
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
}));

const CreateAppointmentScreen = () => {
	let history = useHistory();
	const classes = useStyles();

	const [name, setName] = React.useState("");
	const [subject, setSubject] = React.useState(0);
	const [subjects, setSubjects] = React.useState([]);
	const [start, setStart] = React.useState(new Date(Date.now()));
	const [end, setEnd] = React.useState(new Date(Date.now()));
	const [repetition, setRepetition] = React.useState("");
	const [times, setTimes] = React.useState(1);
	const [place, setPlace] = React.useState(0);
	const [places, setPlaces] = React.useState([]);
	const [description, setDescription] = React.useState("");
	const [docents, setDocents] = React.useState([]);
	const [lecturers, setLecturers] = React.useState([]);
	const [persons, setPersons] = React.useState([]);
	const [personsArray, setPersonsArray] = React.useState([]);

	useEffect(() => {
		const fetchSubjects = async () => {
			const {data: subjectsFromApi} = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/studycourses");
			setSubjects(subjectsFromApi);
		};
		const fetchPlaces = async () => {
			const {data: placesFromApi} = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/booking-api/rooms/");
			setPlaces(placesFromApi);
		};
		const fetchLecturers = async () => {
			const {data: lecturersFromApi} = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/lecturers");
			let persons = lecturersFromApi.map((item) => {
				if(item.title === "") return {id: item.id, name: item.firstname + " " + item.lastname}
				else return {id: item.id, name: item.title + " " + item.firstname + " " + item.lastname};
			});
			setLecturers(persons);
		};
		const fetchStudents = async () => {
			const {data: studentsFromApi} = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/students");
			let students = studentsFromApi.map((item) => {
				if(item.title === "") return {id: item.id, name: item.firstname + " " + item.lastname}
				else return {id: item.id, name: item.title + " " + item.firstname + " " + item.lastname};
			});
			setPersonsArray(students);
		};
		fetchSubjects().then().catch(() => console.log("error getting data from API"));
		fetchPlaces().then().catch(() => console.log("error getting data from API"));
		fetchLecturers().then().catch(() => console.log("error getting data from API"));
		fetchStudents().then().catch(() => console.log("error getting data from API"));
	}, []);

	const handleStartChange = (date) => {
		setStart(date);
	};
	const handleEndChange = (date) => {
		setEnd(date);
	};

	const handleTimesChange = (number) => {
		if (number < 0) {
			number = 0;
		}
		setTimes(number);
	};

	const handleCreateCourse = async (e) => {
		e.preventDefault();
		await axios.post(
			"https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses",
			{ name, subject, start, end, repetition, times, place, description, docents, persons },
		);
		history.push("/courses");
	};

	return (
		<>
			<Helmet>
				<title>Kurs anlegen</title>
			</Helmet>
			<p>Kurs anlegen</p>
			<form
				className={classes.root}
				autoComplete="off"
				onSubmit={(e) => handleCreateCourse(e)}
			>
				<TextField
					id="standard-full-width"
					label="Name"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<FormControl variant="outlined"
							 style={{ margin: 12, textAlign: "left" }}
							 fullWidth
							 margin="normal">
					<InputLabel id="demo-simple-select-outlined-label">Studiengang </InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						label="Studiengang"
					>
						<MenuItem value={0}>
							<em>Keins</em>
						</MenuItem>
						{subjects.map((subject) => (
							<MenuItem key={subject.id} value={subject.id}>
								{subject.degree} {subject.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<p className={classes.text}>Beginn:</p>
					<KeyboardDateTimePicker
						variant="inline"
						ampm={false}
						format="yyyy/MM/dd HH:mm"
						margin="normal"
						id="date-picker-inline"
						label="Date picker inline"
						value={start}
						onChange={handleStartChange}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
					<p className={classes.text}>Ende:</p>
					<KeyboardDateTimePicker
						variant="inline"
						ampm={false}
						format="yyyy/MM/dd HH:mm"
						margin="normal"
						id="date-picker-inline"
						label="Date picker inline"
						value={end}
						onChange={handleEndChange}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
				</MuiPickersUtilsProvider>
				<FormControl variant="outlined"
							 style={{ margin: 12, textAlign: "left", minWidth: "200px" }}
							 margin="normal">
					<InputLabel id="demo-simple-select-outlined-label">Wiederholen </InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={repetition}
						onChange={(e) => setRepetition(e.target.value)}
						label="Wiederholen"
					>
						<MenuItem value={0}><em>Nie</em></MenuItem>
						<MenuItem value={1}>Täglich</MenuItem>
						<MenuItem value={2}>Wöchentlich</MenuItem>
						<MenuItem value={3}>Monatlich</MenuItem>
					</Select>
				</FormControl>
				<TextField
					id="outlined-number"
					label="Anzahl"
					type="number"
					variant="outlined"
					style={{ margin: 12 }}
					margin="normal"
					value={times}
					onChange={(e) => handleTimesChange(e.target.value)}
				/>
				<FormControl variant="outlined"
							 style={{ margin: 12, textAlign: "left" }}
							 fullWidth
							 margin="normal">
					<InputLabel id="demo-simple-select-outlined-label">Ort </InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={place}
						onChange={(e) => setPlace(e.target.value)}
						label="Ort"
					>
						<MenuItem value={0}>
							<em>Keiner</em>
						</MenuItem>
						{places.map((placesItem) => (
							<MenuItem key={placesItem.id} value={placesItem.id}>
								{placesItem.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					id="standard-full-width"
					label="Beschreibung"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
					multiline
					rows={5}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<FormControl variant="outlined"
							 style={{ margin: 12, textAlign: "left" }}
							 fullWidth
							 margin="normal">
					<InputLabel id="demo-simple-select-outlined-label">Dozenten </InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						multiple
						value={docents}
						onChange={(e) => setDocents(e.target.value)}
						label="Dozenten"
					>
						{lecturers.map((docent) => (
							<MenuItem key={docent.id} value={docent.id}>
								{docent.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl variant="outlined"
							 style={{ margin: 12, textAlign: "left" }}
							 fullWidth
							 margin="normal">
					<InputLabel id="demo-simple-select-outlined-label">Personen </InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						multiple
						value={persons}
						onChange={(e) => setPersons(e.target.value)}
						label="Personen"
					>
						{personsArray.map((person) => (
							<MenuItem key={person.id} value={person.id}>
								{person.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Link to="/courses">
					<Button>Abbrechen</Button>
				</Link>
				<div><Button type="submit">Kurs anlegen</Button></div>
			</form>
		</>
	);
};

export default CreateAppointmentScreen;
