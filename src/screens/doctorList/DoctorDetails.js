import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography } from '@material-ui/core';
import './DoctorDetails.css';
import renderRatingStars from '../../common/utils/utils';


const DoctorDetails = ({ open, handleClose, doctor }) => {
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    setDoctorDetails(doctor);
  }, [doctor]);

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
          maxWidth: 300,
          outline: 'none',
        }}
      >
        <div className="modal-title" style={{ backgroundColor: 'purple',color:"white", maxHeight:"70px", padding: '11px' }}>
          <h4 style={{ color: 'white' }}>Doctor Details</h4>
        </div>
        <div style={{
              margin: "15px",
              textAlign: "left",
              padding: "20px",
              cursor: "pointer"
        }}>
          {doctorDetails && (
            <>
              <Typography variant="subtitle1">Dr: {doctorDetails.firstName} {doctorDetails.lastName}</Typography>
              <Typography variant="subtitle1">Total Experience: {doctorDetails.totalYearsOfExp}</Typography>
              <Typography variant="subtitle1">Speciality: {doctorDetails.speciality}</Typography>
              <Typography variant="subtitle1">Date of Birth: {doctorDetails.dob}</Typography>
              <Typography variant="subtitle1">City: {doctorDetails.address.city}</Typography>
              <Typography variant="subtitle1">Email: {doctorDetails.emailId}</Typography>
              <Typography variant="subtitle1">Mobile: {doctorDetails.mobile}</Typography>
              <Typography variant="subtitle1">Rating: {renderRatingStars(doctorDetails.rating)}</Typography>
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default DoctorDetails;
