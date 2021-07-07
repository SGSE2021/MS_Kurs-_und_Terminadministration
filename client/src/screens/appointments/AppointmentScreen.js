import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import AppointmentTable from "../../components/AppointmentTable";

const AppointmentScreen = () => {
	return (
		<div>
			<AppointmentTable/>
			<Link to="/appointments/create">
				<Button>Termin anlegen</Button>
			</Link>
		</div>
	);
};

export default AppointmentScreen;
