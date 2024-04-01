import React, { useState } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import RateAppointment from './RateAppointment';
import './Appointment.css'; 

const Appointment = ({ doctor }) => {
  const [isRateAppointmentOpen, setIsRateAppointmentOpen] = useState(false);

  const handleOpenRateAppointment = () => {
    setIsRateAppointmentOpen(true);
  };

  const handleCloseRateAppointment = () => {
    setIsRateAppointmentOpen(false);
  };

  const doctorsAppointments = [
    { id:"UUID-29", name: 'Devraj', date: '21-02-2024', symptoms: "Fever", priorMedicalHistory: "abc" },
    { id:"UUID-30", name: 'Raman', date: '21-02-2024', symptoms: "Cough", priorMedicalHistory: "abc" },
    { id:"UUID-31", name: 'Surya', date: '2-02-2024', symptoms: "Headache, fever", priorMedicalHistory: "abc" },
    { id:"UUID-33", name: 'Gowri', date: '12-09-2024', symptoms: "Eye pain, neck pain", priorMedicalHistory: "abc" },
  ];

  return (
    <div className="DoctorsAppointmentTab">
      {doctorsAppointments.map((doctorAppointment, index) => (
        <Paper key={index} elevation={3} className="doctor-appointment-paper">
          <Typography variant="h6">Dr. {doctorAppointment.name}</Typography>
          <Typography variant="subtitle1">Date: {doctorAppointment.date}</Typography>
          <Typography variant="subtitle1"> Symptoms: {doctorAppointment.symptoms}</Typography>
          <Typography variant="subtitle1">priorMedicalHistory: {doctorAppointment.priorMedicalHistory}</Typography><br/>
          <div className="rate-appointment">
            <Button 
              variant="contained" 
              color="primary" 
              className="rate-appointment-button" 
              onClick={handleOpenRateAppointment} // Open RateAppointment modal
            >
              Rate Appointment
            </Button>
          </div>
        </Paper>
      ))}
      <RateAppointment open={isRateAppointmentOpen} handleClose={handleCloseRateAppointment} doctorName="Devraj" doctorId="UUID-33" appointmentId= "f646f379-bc4b-47e3-a335-0fe4704931cb"/>
    </div>
  );
};

export default Appointment;
