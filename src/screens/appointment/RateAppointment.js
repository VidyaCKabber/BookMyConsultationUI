import React, { useState } from 'react';
import { Modal, Box, TextField, FormControl, Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './RateAppointment.css';


const RateAppointment = ({ open, handleClose, doctorName, doctorId, appointmentId }) => {
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0); // Initialize with 0 stars

  // Handler for updating the rating
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRateAppointment = async () => {
    try {
      const rateAppointment = {
        appointmentId: "f646f379-bc4b-47e3-a335-0fe4704931cb",
        doctorId: "UUID-65",
        rating: "1",
        comments: "asdad"
      };
      const basicAuthToken = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8080/ratings', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuthToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rateAppointment)
      });

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error('Rating failed:', error);
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
          width: '50%',
          maxWidth: 500,
          outline: 'none',
        }}
      >
        <div className="modal-title" style={{ backgroundColor: 'purple',color:"white", maxHeight:"70px", padding: '11px' }}>
          <h4 style={{ color: 'white' }}>Rate an Appointment</h4>
        </div>
        <div style={{
              margin: "15px",
              textAlign: "left",
              padding: "20px",
              cursor: "pointer"
        }}>
          <TextField label="Comments" value={comments} onChange={(e) => setComments(e.target.value)} fullWidth margin="normal" />
          <FormControl fullWidth margin="normal">
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                value <= rating ?
                  <StarIcon key={value} onClick={() => handleRatingChange(value)} style={{ cursor: 'pointer', color: '#ffc107' }} />
                  :
                  <StarBorderIcon key={value} onClick={() => handleRatingChange(value)} style={{ cursor: 'pointer' }} />
              ))}
            </div>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleRateAppointment}>
            Rate Appointment
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default RateAppointment;
