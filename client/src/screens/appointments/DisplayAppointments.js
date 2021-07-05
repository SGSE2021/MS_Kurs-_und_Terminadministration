import axios from "axios";
import React, { useEffect, useState } from "react";
import AppointmentPreview from "../../components/AppointmentPreview";

const DisplayAppointments = () => {
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const {
				data: { entries: appointmentsFromApi },
			} = await axios.get("http://localhost:8080/api/appointments");
			setAppointments(appointmentsFromApi);
		};
		fetchData();
	}, []);

	return (
		<div>
			{appointments.length === 0 ? (
				<p>Loading...</p>
			) : (
				<p>
					{appointments.map((appointment, i) => (
						<AppointmentPreview
							key={i}
							titel={appointment.titel}
							description={appointment.description}
							place={appointment.place}
							id={appointment.id}
						/>
					))}
				</p>
			)}
		</div>
	);
};

export default DisplayAppointments;
