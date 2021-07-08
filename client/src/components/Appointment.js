import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Link, useHistory} from "react-router-dom";

const Appointment = ({ id }) => {
	let history = useHistory();
	const [appointment, setAppointment] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const {data: appointmentFromApi} = await axios.get(`http://localhost:8080/api/appointments/${id}`);
			setAppointment(appointmentFromApi[0]);
		};
		fetchData();
	}, []);

	if (!appointment) return <p>Loading Termin #{id}...</p>;

	const handleDelete = async () => {
		await axios.delete(`http://localhost:8080/api/appointments/${id}`);
		history.push("/appointments");
	};

	const {title, start, end, repetition, place, description, persons } =
		appointment;

	return (
		<div>
			<h2>{title}</h2>
			<p>{description}</p>
			<span>in {place}</span>
			<span>
				Zyklus: {repetition}, Zeitraum: {new Date(start).toLocaleString()} -{" "}
				{new Date(end).toLocaleString()}
			</span>
			<hr />
			<Button onClick={handleDelete}>Löschen</Button>
		</div>
	);
};

export default Appointment;
