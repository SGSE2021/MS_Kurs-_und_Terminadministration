import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
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
		width: "10vw",
	}
}));

const CreateAppointmentScreen = () => {
	let history = useHistory();
	const classes = useStyles();

	const [title, setTitle] = React.useState("");
	const [start, setStart] = React.useState(Date.now());
	const [end, setEnd] = React.useState(Date.now());
	const [repetition, setRepetition] = React.useState("");
	const [place, setPlace] = React.useState(null);
	const [description, setDescription] = React.useState("");
	const [persons, setPersons] = React.useState("");

	const handleStartChange = (date) => {
		setStart(date);
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
		const { data } = await axios.post(
			"https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/appointments",
			{ title, start, end, repetition, place, description, persons },
		);
		console.log(data);
		history.push("/appointments");
	};

	return (
		<>
			<p>Termin erstellen</p>
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
				<Button type="submit">Termin anlegen</Button>
			</form>
		</>
	);
};

export default CreateAppointmentScreen;
