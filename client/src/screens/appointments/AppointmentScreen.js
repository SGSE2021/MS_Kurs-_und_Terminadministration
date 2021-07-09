import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import AppointmentTable from "../../components/AppointmentTable";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	button: {
	},

}));

const AppointmentScreen = () => {
	const classes = useStyles();
	return (
		<div>
			<Link  to="/appointments/create">
				<Button className={classes.button}>Termin erstellen</Button>
			</Link>
			<AppointmentTable/>
		</div>
	);
};

export default AppointmentScreen;
