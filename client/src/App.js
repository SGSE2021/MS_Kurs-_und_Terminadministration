import React from "react";
import "date-fns";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ResponsiveDrawer from "./components/MenuAppBar";
import CreateAppointmentScreen from "./screens/appointments/CreateAppointmentScreen";
import AppointmentScreen from "./screens/appointments/AppointmentScreen";
import EditAppointment from "./screens/appointments/EditAppointment";
import {makeStyles} from "@material-ui/core/styles";
import CourseScreen from "./screens/courses/CourseScreen";
import CreateCourseScreen from "./screens/courses/CreateCourseScreen";
import EditCourseScreen from "./screens/courses/EditCourseScreen";
import {Helmet} from "react-helmet";

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
	const checkUser = () => {
		const currentUserString = localStorage.getItem( "current-user" );
		const currentUserObject = JSON.parse(currentUserString );
		if (currentUserObject === null || currentUserObject === undefined) return null
		else return currentUserObject.role;
	}

	if (checkUser() === null) {
		return (
			<Router>
				<Redirect to="/users/"/>
			</Router>
		)
	}

	return (
		<Router basename="/courses">
			<div className={classes.app}>
				<header className={classes.appheader}>
					<ResponsiveDrawer />
					{(checkUser() === 2) ? (
						<Switch>
							<Route path="/appointments/create/" explicit>
								<CreateAppointmentScreen />
							</Route>
							<Route
								path="/appointments/:id"
								explicit
								component={(props) => (
									<EditAppointment id={props.match.params.id} />
								)}
							/>
							<Route path="/appointments/" explicit>
								<AppointmentScreen />
							</Route>
							<Route path="/courses/create/" explicit>
								<CreateCourseScreen />
							</Route>
							<Route
								path="/courses/:id"
								explicit
								component={(props) => (
									<EditCourseScreen id={props.match.params.id} />
								)}
							/>
							<Route path="/courses/" explicit>
								<CourseScreen />
							</Route>
							<Route path="/" explicit>
									<Redirect to="/courses/"/>

							</Route>
						</Switch>) : (
						<div>
							<Helmet>
								<title>Keine Berechtigung</title>
							</Helmet>
							<p>Keine Berechtigung</p>
						</div>
					)}
				</header>
			</div>
		</Router>
	);
}

export default App;
