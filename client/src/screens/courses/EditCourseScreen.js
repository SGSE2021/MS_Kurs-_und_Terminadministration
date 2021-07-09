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

const EditCourseScreen = ({ id }) => {
	let history = useHistory();
	const classes = useStyles();

	const [name, setName] = React.useState("");
	const [subject, setSubject] = React.useState("");
	const [start, setStart] = React.useState(Date.now());
	const [end, setEnd] = React.useState(Date.now());
	const [repetition, setRepetition] = React.useState("");
	const [times, setTimes] = React.useState(0);
	const [place, setPlace] = React.useState(null);
	const [description, setDescription] = React.useState("");
	const [docents, setDocents] = React.useState("");


	useEffect(() => {
		const fetchData = async () => {
			const {data: courseFromApi} = await axios.get(`http://localhost:8080/api/courses/${id}`);
			setName(courseFromApi[0].name);
			setSubject(courseFromApi[0].subject);
			setStart(courseFromApi[0].start);
			setEnd(courseFromApi[0].end);
			setRepetition(courseFromApi[0].repetition);
			setTimes(courseFromApi[0].times);
			setPlace(courseFromApi[0].place);
			setDescription(courseFromApi[0].description);
			setDocents(courseFromApi[0].docents);
		};
		fetchData().then().catch();
	}, []);

	//TODO: Laden des Kurses anzeigen
	//if (!querySuccess) return <p>Loading Kurs #{id}...</p>;

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

	const handleCreateCourse = async (e) => {
		e.preventDefault();
		const { data } = await axios.put(
			"http://localhost:8080/api/courses",
			{ id, name, subject, start, end, repetition, times, place, description, docents },
		);
		console.log(data);
		history.push("/courses");
	};

	return (
		<>
			<p>Kurs bearbeiten</p>
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
				<Button type="submit">Kurs bearbeiten</Button>
			</form>
		</>
	);
};

export default EditCourseScreen;
