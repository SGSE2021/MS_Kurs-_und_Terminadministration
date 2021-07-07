import { Button } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EnhancedTable from "../../components/EnhancedTable";

const AppointmentScreen = () => {
	return (
		<div>
			<EnhancedTable/>
			<Link to="/appointments/create">
				<Button>Termin anlegen</Button>
			</Link>
		</div>
	);
};

export default AppointmentScreen;
