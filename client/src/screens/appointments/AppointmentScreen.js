import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import AppointmentTable from "../../components/AppointmentTable";
import {makeStyles} from "@material-ui/core/styles";
import {Helmet} from 'react-helmet';

const useStyles = makeStyles(() => ({
	button: {
	},

}));

const AppointmentScreen = () => {
	const classes = useStyles();

	return (
		<div>
			<Helmet>
				<title>Termine</title>
			</Helmet>
			<Link  to="/appointments/create">
				<Button className={classes.button}>Termin erstellen</Button>
			</Link>
			<AppointmentTable/>
		</div>
	);
};

export default AppointmentScreen;
