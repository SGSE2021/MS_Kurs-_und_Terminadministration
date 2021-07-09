import React from "react";
import "date-fns";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResponsiveDrawer from "./components/MenuAppBar";
import CreateAppointmentScreen from "./screens/appointments/CreateAppointmentScreen";
import AppointmentScreen from "./screens/appointments/AppointmentScreen";
import EditAppointment from "./screens/appointments/EditAppointment";
import {makeStyles} from "@material-ui/core/styles";
import CourseScreen from "./screens/courses/CourseScreen";
import CreateCourseScreen from "./screens/courses/CreateCourseScreen";
import EditCourseScreen from "./screens/courses/EditCourseScreen";

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

						<Route path="/appointments/create" strict>
							<CreateAppointmentScreen />
						</Route>
						<Route
							path="/appointments/:id"
							strict
							component={(props) => (
								<EditAppointment id={props.match.params.id} />
							)}
						/>
						<Route path="/appointments" strict>
							<AppointmentScreen />
						</Route>
						<Route path="/courses/create" strict>
							<CreateCourseScreen />
						</Route>
						<Route
							path="/courses/:id"
							strict
							component={(props) => (
								<EditCourseScreen id={props.match.params.id} />
							)}
						/>
						<Route path="/courses" strict>
							<CourseScreen />
						</Route>
					</Switch>
				</header>
			</div>
		</Router>
	);
}

export default App;
