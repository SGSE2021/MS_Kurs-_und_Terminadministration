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
	const classes = useStyles();

	const [title, setTitle] = React.useState("");
	const [start, setStart] = React.useState(
		new Date("2014-08-18 21:11"),
	);
	const [end, setEnd] = React.useState(
		new Date("2014-08-18 21:11"),
	);
	const [repeat, setRepeat] = React.useState("");
	const [place, setPlace] = React.useState();
	const [description, setDescription] = React.useState("");
	const [persons, setPersons] = React.useState("");

	const handleStartChange = (date) => {
		setStart(date);
		console.log(date);
	};
	const handleEndChange = (date) => {
		setEnd(date);
	};

	const [age, setAge] = React.useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handleCreateAppointment = async (e) => {
		e.preventDefault();
		const { data } = await axios.post(
			"http://localhost:8080/api/appointments",
			{ title, start, end, repeat, place, description, persons },
		);
		console.log(data);
		// TODO: send post request to backend with course data
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
						value={repeat}
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
				<Button type="submit">Kurs erstellen</Button>
			</form>
		</>
	);
};

export default CreateAppointmentScreen;
