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
		border: "1px solid white",
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
		color: "white",
	},
}));

const CreateAppointmentScreen = () => {
	const classes = useStyles();

	const [selectedDate, setSelectedDate] = React.useState(
		new Date("2014-08-18T21:11:54"),
	);

	const [title, setTitle] = React.useState("");

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const [age, setAge] = React.useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handleCreateCourse = async (e) => {
		e.preventDefault();
		const { data } = await axios.post(
			"http://localhost:8080/api/appointments",
			{ title },
		);
		console.log(data);
		// TODO: send post request to backend with course data
	};

	return (
		<>
			<p>Kurs erstellen</p>
			<form
				className={classes.root}
				autoComplete="off"
				onSubmit={(e) => handleCreateCourse(e)}
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
				<TextField
					id="standard-full-width"
					label="Label"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
				/>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<p className={classes.text}>Beginn:</p>
					<KeyboardDateTimePicker
						variant="inline"
						ampm={false}
						format="yyyy/MM/dd hh:mm a"
						margin="normal"
						id="date-picker-inline"
						label="Date picker inline"
						value={selectedDate}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
					<p className={classes.text}>Ende:</p>
					<KeyboardDateTimePicker
						variant="inline"
						ampm={false}
						format="yyyy/MM/dd hh:mm a"
						margin="normal"
						id="date-picker-inline"
						label="Date picker inline"
						value={selectedDate}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
				</MuiPickersUtilsProvider>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={age}
						onChange={handleChange}
						label="Age"
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
				<TextField
					id="standard-full-width"
					label="Label"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
				/>
				<TextField
					id="standard-full-width"
					label="Label"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
					multiline
					rows={5}
				/>
				<TextField
					id="standard-full-width"
					label="Label"
					variant="outlined"
					style={{ margin: 12 }}
					fullWidth
					margin="normal"
				/>
				<Button type="submit">Kurs erstellen</Button>
			</form>
		</>
	);
};

export default CreateAppointmentScreen;
