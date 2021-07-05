import "./App.css";
import ResponsiveDrawer from "./components/MenuAppBar";
import React from "react";
import "date-fns";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateAppointmentScreen from "./screens/appointments/CreateAppointmentScreen";
import AppointmentScreen from "./screens/appointments/AppointmentScreen";
import DisplayAppointments from "./screens/appointments/DisplayAppointments";
import AppointmentPreview from "./components/AppointmentPreview";
import Appointment from "./components/Appointment";

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
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
