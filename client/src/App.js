import React, {useState} from "react";
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

	const [title, setTitle] = useState("Startseite");

	const classes = useStyles();

	//localStorage.setItem('current-user',"{\"uid\":\"dSwafL2b0sQcYxJgmCpzcfkh3b43\",\"firstname\":\"Dennis\",\"lastname\":\"Admin\",\"role\":2}");
	const currentUserString = localStorage.getItem( "current-user" );
	const currentUserObject = JSON.parse(currentUserString );

	if (currentUserObject === null || currentUserObject === undefined) {
		return (
			<Router>
				<Redirect to="/users/"/>
			</Router>
		)
	}

	const {role} = currentUserObject;

	//TODO: Check user with uid over user Api

	return (
		<Router basename="/courses">
			<div className={classes.app}>
				<header className={classes.appheader}>
					<ResponsiveDrawer />
					{(role === 2) ? (
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
								Startseite
							</Route>
						</Switch>) : (
						<p>Keine Berechtigung</p>
					)}
				</header>
			</div>
		</Router>
	);
}

export default App;
