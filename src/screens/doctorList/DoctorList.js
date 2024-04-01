import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import BookAppointment from './BookAppointment';
import DoctorDetails from './DoctorDetails';
import './DoctorList.css';
import renderRatingStars from '../../common/utils/utils';


const DoctorList = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to track selected doctor
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State to manage DoctorDetails modal visibility
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [selectedDoctorName, setSelectedDoctorName] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleSpecialityChange = (event) => {
    setSelectedSpeciality(event.target.value.toLowerCase());
  };

  const handleBookAppointment = (doctor_id, doctor_name) => {
    localStorage.removeItem('choosenDoctorId');
    localStorage.removeItem('choosenDoctorName');
    localStorage.setItem('choosenDoctorId', doctor_id);
    localStorage.setItem('choosenDoctorName', doctor_name);
    setSelectedDoctorName(doctor_name);
    setSelectedDoctorId(doctor_id)
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log("handleBookAppointment Doctor vidya:", selectedDoctorName, selectedDoctorId);
  }, [selectedDoctorId, selectedDoctorName]); // Add selectedDoctorName to the dependency array

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewDetails = async (doctor) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSelectedDoctor(doctor);
    console.log("Selected Doctor:", selectedDoctor);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const getSpecialities = async () => {
    try {
      const response = await fetch('http://localhost:8080/doctors/speciality'); // Assuming this is the correct endpoint
      const data = await response.json();
      setSpecialities(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpecialities();
  }, []);

  useEffect(() => {
    console.log('Selected Doctor:', selectedDoctor);
    // Perform any action here to pass selectedDoctor to the next page
  }, [selectedDoctor]);


  const filteredDoctors = selectedSpeciality
    ? doctors.filter((doctor) => doctor.speciality.toLowerCase() === selectedSpeciality)
    : doctors;

  return (
    <div className="DoctorsTab">
      <label>Select Speciality: </label>
      <select value={selectedSpeciality} onChange={handleSpecialityChange} className="speciality-dropdown">
        <option value="">All Specialities</option>
        {specialities.map((speciality, index) => (
          <option key={index} value={speciality.toLowerCase()}>{speciality}</option>
        ))}
      </select>
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor, index) => (
          <Paper key={index} elevation={3} className="doctor-paper">
            <Typography variant="h6">Doctor Name: {doctor.firstName} {doctor.lastName}</Typography><br />
            <Typography variant="subtitle1">Speciality: {doctor.speciality}</Typography>
            <Typography variant="subtitle1">Average Rating: {renderRatingStars(doctor.rating)}</Typography>
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                className="book-appointment-button"
                onClick={() => handleBookAppointment(`${doctor.id}`, `${doctor.firstName} ${doctor.lastName}`)} // Handle booking appointment
              >
                Book Appointment
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: 'green', color: 'white' }}
                className="view-details-button"
                onClick={() => handleViewDetails(doctor)} // Handle viewing details
              >
                View Details
              </Button>
            </div>
          </Paper>
        ))
      ) : (
        <Typography variant="subtitle1" className="no-doctors-found">
          No doctors found for the selected speciality.
        </Typography>
      )}
      {/* Render BookAppointment modal */}
      <BookAppointment open={isModalOpen} handleClose={handleCloseModal} doctor={selectedDoctorName} />
      {/* Render DoctorDetails modal */}
      <DoctorDetails open={isDetailsModalOpen} handleClose={handleCloseDetailsModal} doctor={selectedDoctor} />
    </div>
  );
};

export default DoctorList;
