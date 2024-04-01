import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, FormControl, Select, MenuItem, Button } from '@material-ui/core';

const BookAppointment = ({ open, handleClose, doctor_id, doctor_name }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Today's date
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [doctorId, setDoctorId] = useState(null);
  const [doctorName, setDoctorName] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [symptoms, setSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const getDocterName = (doctor_name) => {
    if (doctor_name === null || doctor_name === undefined) {
      const choosenDoctorId = localStorage.getItem('choosenDoctorId');
      const choosenDoctorName = localStorage.getItem('choosenDoctorName');
      setDoctorId(choosenDoctorId);
      setDoctorName(choosenDoctorName);
    } else {
      setDoctorId(doctor_id);
      setDoctorName(doctor_name);
    }
  };

  useEffect(() => {
    getDocterName(doctor_id, doctor_name);
  }, [open]);

  useEffect(() => {
    const user_email = localStorage.getItem('userEmailId');
    const token = localStorage.getItem('accessToken');
    setUserEmail(user_email);
    setAccessToken(token);
    getUserDetails();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch(`http://localhost:8080/doctors/${doctorId}/timeSlots?date=${selectedDate}`);
      const data = await response.json();
      setTimeSlots(data.timeSlot);
    } catch (error) {
      console.error('Error fetching time slots:', error);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, [selectedDate]);

  const getUserDetails = async () => {
    try {
      const uemailId = (userEmail === '') ? localStorage.getItem('userEmailId') : userEmail;
      const uaccessToken = (accessToken === '') ? localStorage.getItem('accessToken') : accessToken;

      const response = await fetch(`http://localhost:8080/users/${uemailId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${uaccessToken}`,
          'Content-Type': 'application/json' // Adjust the content type as per your API requirements
        }
      });
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleConfirmAppointment = async () => {
    // Check if a time slot is selected
    if (selectedTimeSlot === '') {
      setErrorMessage('Please select a time slot');
      return;
    }
    console.log("userData");
    console.log(userDetails);
    const userName = btoa(`${userDetails.firstName} ${userDetails.lastName}`);
    const user_emailId = (userEmail === '') ? localStorage.getItem('userEmailId') : userEmail;
    const user_name = (userName === '') ? localStorage.getItem('userName') : userName;
    const user_id = localStorage.getItem('userId');
    // Prepare the appointment data
    const appointmentData = {
      doctorId: doctorId,
      doctorName: doctorName,
      userId: user_id,
      userName: user_name,
      userEmailId: user_emailId,
      timeSlot: selectedTimeSlot,
      appointmentDate: selectedDate,
      createdDate: new Date().toISOString().split('T')[0],
      symptoms: symptoms,
      priorMedicalHistory: medicalHistory
    };
    console.log("appointmentData");
    console.log(appointmentData);
    try {
      const response = await fetch('http://localhost:8080/appointments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        setSuccessMessage("Appointment created successfully!!");
        // handleClose();
      } else {
        console.error('Error confirming appointment:', response);
        setErrorMessage('Error confirming appointment');
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      setErrorMessage('Error confirming appointment');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          // p: 2,
          width: '40%',
          maxWidth: 500,
          outline: 'none',
        }}
      >
        <div className="modal-title" style={{ backgroundColor: 'purple',color:"white", maxHeight:"70px", padding: '11px' }}>
          <h4 style={{ color: 'white' }}>Book an Appointment</h4>
        </div>
        <div style={{
              margin: "15px",
              textAlign: "left",
              padding: "20px",
              cursor: "pointer"
        }}>
          <TextField
            label="Doctor's Name"
            value={doctorName}
            disabled
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <TextField
              label="Select Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split('T')[0], // Set min to today's date
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Select value={selectedTimeSlot} onChange={handleTimeSlotChange}>
              <MenuItem value="">Select Time Slot</MenuItem>
              {timeSlots ? (
                timeSlots.map((slot, index) => (
                  <MenuItem key={index} value={slot}>{slot}</MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>No available time slots</MenuItem>
              )}
            </Select>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Medical History"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              margin="normal"
            />
          </FormControl>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <Button variant="contained" color="primary" fullWidth onClick={handleConfirmAppointment}>
            Confirm Appointment
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default BookAppointment;
