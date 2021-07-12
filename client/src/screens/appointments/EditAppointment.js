import {Button, TextField} from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
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
		width: "10vw",
	}
}));

const EditAppointment = ({ id }) => {
	let history = useHistory();
	const classes = useStyles();

	const [title, setTitle] = React.useState("");
	const [start, setStart] = React.useState(new Date(Date.now()));
	const [end, setEnd] = React.useState(new Date(Date.now()));
	const [repetition, setRepetition] = React.useState("");
	const [place, setPlace] = React.useState(0);
	const [places, setPlaces] = React.useState([]);
	const [description, setDescription] = React.useState("");
	const [persons, setPersons] = React.useState([]);
	const [personsArray, setPersonsArray] = React.useState([]);


	useEffect(() => {
		const fetchData = async () => {
			const {data: appointmentFromApi} = await axios.get(`https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/appointments/${id}`);
			setTitle(appointmentFromApi[0].title);
			setStart(appointmentFromApi[0].start);
			setEnd(appointmentFromApi[0].end);
			setRepetition(appointmentFromApi[0].repetition);
			setPlace(appointmentFromApi[0].place);
			setDescription(appointmentFromApi[0].description);
			setPersons(appointmentFromApi[0].persons.split(','));
		};
		const fetchPlaces = async () => {
			const {data: placesFromApi} = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/booking-api/rooms/");
			console.log(placesFromApi);
			setPlaces(placesFromApi);
		};
		const fetchPersons = async () => {
			const {data: lecturersFromApi} = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/lecturers");
			let personsFromApi = lecturersFromApi.map((item) => {
				if(item.title === "") return {id: item.id, name: item.firstname + " " + item.lastname}
				else return {id: item.id, name: item.title + " " + item.firstname + " " + item.lastname};
			});
			setPersonsArray(personsFromApi);
		};
		fetchPlaces().then().catch(() => console.log("error getting data from API"));
		fetchPersons().then().catch(() => console.log("error getting data from API"));
		fetchData().then().catch();
	}, [id]);

	const handleStartChange = (date) => {
		setStart(date);
		//TODO: Remove log
		console.log(date);
	};
	const handleEndChange = (date) => {
		setEnd(date);
	};

	const handleChange = (event) => {
		setRepetition(event.target.value);
	};

	const handleCreateAppointment = async (e) => {
		e.preventDefault();
		const { data } = await axios.put(
			"https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/appointments",
			{ id, title, start, end, repetition, place, description, persons },
		);
		console.log(data);
		history.push("/appointments");
	};

	return (
		<>
			<Helmet>
				<title>Termin bearbeiten</title>
			</Helmet>
			<p>Termin bearbeiten</p>
			<form
				className={classes.root}
				autoComplete="off"
				onSubmit={(e) => handleCreateAppointment(e)}
			>
				<TextField
					id="standard-full-width"
					label="Titel"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<p className={classes.text}>Beginn:</p>
					<KeyboardDateTimePicker
						variant="inline"
						ampm={false}
						format="yyyy/MM/dd HH:mm"
						margin="normal"
						id="date-picker-inline"
						label="Start"
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
						label="Ende"
						value={end}
						onChange={handleEndChange}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
				</MuiPickersUtilsProvider>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Wiederholen </InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={repetition}
						onChange={handleChange}
						label="Wiederholen"
					>
						<MenuItem value={0}><em>Nie</em></MenuItem>
						<MenuItem value={1}>Täglich</MenuItem>
						<MenuItem value={2}>Wöchentlich</MenuItem>
						<MenuItem value={3}>Monatlich</MenuItem>
					</Select>
				</FormControl>
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
				<Link to="/appointments">
					<Button>Abbrechen</Button>
				</Link>
				<div><Button type="submit">Termin ändern</Button></div>
			</form>
		</>
	);
};

export default EditAppointment;
