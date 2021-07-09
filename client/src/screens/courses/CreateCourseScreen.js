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

	const [name, setName] = React.useState("");
	const [subject, setSubject] = React.useState("");
	const [start, setStart] = React.useState(Date.now());
	const [end, setEnd] = React.useState(Date.now());
	const [repetition, setRepetition] = React.useState("");
	const [times, setTimes] = React.useState(0);
	const [place, setPlace] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [docents, setDocents] = React.useState("");

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

	const handleCreateCourse = async (e) => {
		e.preventDefault();
		const { data } = await axios.post(
			"http://localhost:8080/api/courses",
			{ name, subject, start, end, repetition, times, place, description, docents },
		);
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
				<TextField
					id="standard-full-width"
					label="Studiengang"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
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
					label="Dozenten"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
					value={docents}
					onChange={(e) => setDocents(e.target.value)}
				/>

				<Link to="/courses">
					<Button>Abbrechen</Button>
				</Link>
				<Button type="submit">Kurs anlegen</Button>
			</form>
		</>
	);
};

export default CreateAppointmentScreen;
