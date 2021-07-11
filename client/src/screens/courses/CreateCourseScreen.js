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
	const [subject, setSubject] = React.useState("");
	const [subjects, setSubjects] = React.useState([]);
	const [start, setStart] = React.useState(Date.now());
	const [end, setEnd] = React.useState(Date.now());
	const [repetition, setRepetition] = React.useState("");
	const [times, setTimes] = React.useState(1);
	const [place, setPlace] = React.useState("");
	const [places, setPlaces] = React.useState([]);
	const [description, setDescription] = React.useState("");
	const [docent, setDocent] = React.useState("");
	const [docents, setDocents] = React.useState([]);

	useEffect(() => {
		const fetchSubjects = async () => {
			const {data: subjectsFromApi} = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/studycourses");
			console.log(subjectsFromApi);
			setSubjects(subjectsFromApi);
		};
		const fetchPlaces = async () => {
			const {data: placesFromApi} = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/studycourses");
			console.log(placesFromApi);
			setPlaces(placesFromApi);
		};
		const fetchPersons = async () => {
			const {data: personsFromApi} = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/lecturers");
			console.log(personsFromApi);
			setDocents(personsFromApi);
		};
		fetchSubjects().then().catch(() => console.log("error getting data from API"));
		fetchPlaces().then().catch(() => console.log("error getting data from API"));
		fetchPersons().then().catch(() => console.log("error getting data from API"));
	}, []);

	const handleStartChange = (date) => {
		setStart(date);
		// TODO: Remove log
		console.log(date);
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
		const { data } = await axios.post(
			"https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses",
			{ name, subject, start, end, repetition, times, place, description, docent },
		);
		// TODO: Remove log
		console.log(data);
		history.push("/courses");
	};

	return (
		<>
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
						<MenuItem value="">
							<em>None</em>
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
						<MenuItem value={0}><em>None</em></MenuItem>
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
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{places.map((place) => (
							<MenuItem key={place.id} value={place.id}>
								{place.name}
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
						value={docent}
						onChange={(e) => setDocent(e.target.value)}
						label="Dozenten"
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{docents.map((docent) => (
							<MenuItem key={docent.id} value={docent.id}>
								{docent.firstname} {docent.lastname}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Link to="/courses">
					<Button>Abbrechen</Button>
				</Link>
				<Button type="submit">Kurs anlegen</Button>
			</form>
		</>
	);
};

export default CreateAppointmentScreen;
