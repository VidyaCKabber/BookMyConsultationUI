import React, { useState } from 'react';
import { Modal, Tabs, Tab, Box } from '@material-ui/core';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import './Authentication.css';

const AuthenticationModal = ({ isOpen, handleClose }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Modal open={isOpen} onClose={handleClose}>
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
                    maxWidth: 300,
                    outline: 'none',
                }}
            >
                <div className="modal-title" style={{ backgroundColor: 'purple', padding: '10px'}}>
                    <h4 style={{ color: 'white' }}>Authentication</h4>
                </div>
                <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange} 
                    variant="fullWidth" 
                    indicatorColor="secondary"
                >
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <div className="tab-nevigator">
                    {activeTab === 0 && <Login />}
                    {activeTab === 1 && <Register />}
                </div>
            </Box>
        </Modal>
    );
}

export default AuthenticationModal;
