import {Button, TextField} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";

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
	const [start, setStart] = React.useState(Date.now());
	const [end, setEnd] = React.useState(Date.now());
	const [repetition, setRepetition] = React.useState("");
	const [place, setPlace] = React.useState(null);
	const [description, setDescription] = React.useState("");
	const [persons, setPersons] = React.useState("");


	useEffect(() => {
		const fetchData = async () => {
			const {data: appointmentFromApi} = await axios.get(`http://localhost:8080/api/appointments/${id}`);
			setTitle(appointmentFromApi[0].title);
			setStart(appointmentFromApi[0].start);
			setEnd(appointmentFromApi[0].end);
			setRepetition(appointmentFromApi[0].repetition);
			setPlace(appointmentFromApi[0].place);
			setDescription(appointmentFromApi[0].description);
			setPersons(appointmentFromApi[0].persons);
		};
		fetchData().then().catch();
	}, []);

	//TODO:Laden des Termins anzeigen
	//if (!querySuccess) return <p>Loading Termin #{id}...</p>;

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
			"http://localhost:8080/api/appointments",
			{ id, title, start, end, repetition, place, description, persons },
		);
		console.log(data);
		history.push("/appointments");
	};

	return (
		<>
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
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Wiederholen </InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={repetition}
						onChange={handleChange}
						label="Wiederholen"
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>Täglich</MenuItem>
						<MenuItem value={20}>Wöchentlich</MenuItem>
						<MenuItem value={30}>Monatlich</MenuItem>
					</Select>
				</FormControl>
				<TextField
					id="standard-full-width"
					label="Ort"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
					value={place}
					onChange={(e) => setPlace(e.target.value)}
				/>
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
				<TextField
					id="standard-full-width"
					label="Personen"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
					value={persons}
					onChange={(e) => setPersons(e.target.value)}
				/>

				<Link to="/appointments">
					<Button>Abbrechen</Button>
				</Link>
				<Button type="submit">Termin ändern</Button>
			</form>
		</>
	);
};

export default EditAppointment;
