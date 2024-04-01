// Home.js
import React, {useState, useEffect}from 'react';
import { Tabs, Tab } from '@material-ui/core';
import './Home.css';
import DoctorList from '../doctorList/DoctorList';
import Appointment from '../appointment/Appointment';

const Home = () => {
    const [activeTab, setActiveTab] = React.useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially user is not logged in
    const [doctors, setDoctors] = useState('');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // const doctors = [
    //     { name: 'Devraj', speciality: 'Cardiologist', rating: 4.5 },
    //     { name: 'Raman', speciality: 'Dermatologist', rating: 4.8 },
    //     { name: 'Surya', speciality: 'Pediatrician', rating: 4.3 },
    //     { name: 'Gowri', speciality: 'Pediatrician', rating: 4.3 },
    //   ];

    const listAllDoctors = async () =>{
    try {
        const response = await fetch('http://localhost:8080/doctors'); // Assuming this is the correct endpoint
        const data = await response.json();
        setDoctors(data);
    } catch (error) {
        console.log(error);
    }
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(isLoggedIn);
        listAllDoctors();
    }, []);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(isLoggedIn);
    }, [activeTab]);
    

    return (
        <div className="home-container">
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary">
                <Tab label="DOCTORS" />
                <Tab label="APPOINTMENT" />
            </Tabs>
            <div className="tab-content">
                {activeTab === 0 && (
                    <div className="doctors-tab-content">
                        <DoctorList doctors={doctors} />
                    </div>
                )}
                {activeTab === 1 && (
                    <div className="appointment-tab-content">
                        {isLoggedIn ? (
                            <Appointment />
                        ) : (
                            <div className="login-message">
                                <p>Login to see appointments</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
