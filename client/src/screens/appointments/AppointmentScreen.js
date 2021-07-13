import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import AppointmentTable from "../../components/AppointmentTable";
import {makeStyles} from "@material-ui/core/styles";
import {Helmet} from 'react-helmet';

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		width: "80vw",
		marginLeft: "180px",
		marginTop: "80px",
		justifyContent: "flex-end",
	},
	button: {
		marginBottom: "10px",
	},

}));

const AppointmentScreen = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Helmet>
				<title>Termine</title>
			</Helmet>
			<Link  to="/appointments/create">
				<Button variant="contained" color="primary" className={classes.button}>Termin erstellen</Button>
			</Link>
			<AppointmentTable/>
		</div>
	);
};

export default AppointmentScreen;
