import { Card } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const AppointmentPreview = ({
	persons,
	titel,
	repeat,
	start,
	description,
	end,
	id,
	place,
}) => {
	return (
		<Link to={`/appointments/display/${id}`}>
			<Card>
				<h2>{titel}</h2>
				<p>{description}</p>
				<span>in {place}</span>
			</Card>
		</Link>
	);
};

export default AppointmentPreview;
