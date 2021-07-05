import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

const Appointment = ({ id }) => {
	const [appointment, setAppointment] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const {
				data: { appointment: appointmentFromApi },
			} = await axios.get(`http://localhost:8080/api/appointments/${id}`);
			setAppointment(appointmentFromApi);
		};
		fetchData();
	}, []);

	if (!appointment) return <p>Loading Termin #{id}...</p>;

	const handleDelete = async () => {
		await axios.delete(`http://localhost:8080/api/appointments/${id}`);
		// TODO: redirect to "safe" pafe
	};

	const { persons, titel, repeat, start, description, end, place } =
		appointment;

	return (
		<div>
			<h2>{titel}</h2>
			<p>{description}</p>
			<span>in {place}</span>
			<span>
				Zyklus: {repeat}, Zeitraum: {new Date(start).toLocaleString()} -{" "}
				{new Date(end).toLocaleString()}
			</span>
			<hr />
			<Button onClick={handleDelete}>Löschen</Button>
		</div>
	);
};

export default Appointment;
