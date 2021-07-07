import React from "react";
import "date-fns";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResponsiveDrawer from "./components/MenuAppBar";
import CreateAppointmentScreen from "./screens/appointments/CreateAppointmentScreen";
import AppointmentScreen from "./screens/appointments/AppointmentScreen";
import DisplayAppointments from "./screens/appointments/DisplayAppointments";
import Appointment from "./components/Appointment";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	app: {
		'text-align': 'center',
	},
	appheader: {
		'min-height': '100vh',
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		'font-size': 'calc(10px + 2vmin)',
	},
}));


function App() {
	const classes = useStyles();
	return (
		<Router>
			<div className={classes.app}>
				<header className={classes.appheader}>
					<ResponsiveDrawer />
					<Switch>
						<Route
							path="/appointments/display/:id"
							strict
							component={(props) => (
								<Appointment id={props.match.params.id} />
							)}
						/>
						<Route path="/appointments/create" strict>
							<CreateAppointmentScreen />
						</Route>
						<Route path="/appointments/display" strict>
							<DisplayAppointments />
						</Route>
						<Route path="/appointments" strict>
							<AppointmentScreen />
						</Route>
					</Switch>
				</header>
			</div>
		</Router>
	);
}

export default App;
