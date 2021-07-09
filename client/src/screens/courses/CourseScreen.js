import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import CourseTable from "../../components/CourseTable";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	button: {
	},

}));

const AppointmentScreen = () => {
	const classes = useStyles();
	return (
		<div>
			<Link  to="/courses/create">
				<Button className={classes.button}>Kurs anlegen</Button>
			</Link>
			<CourseTable/>
		</div>
	);
};

export default AppointmentScreen;
