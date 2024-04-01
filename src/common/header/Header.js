import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import Button from '@material-ui/core/Button';
import AuthenticationModal from '../../screens/authentication/AuthenticationModal';
import Login from '../../screens/login/Login';

const Header = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const updateStateFromLocalStorage = () => {
            const updatedAccessToken = localStorage.getItem('accessToken');
            if (updatedAccessToken) {
                setAccessToken(updatedAccessToken);
            }

            const updatedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(updatedIsLoggedIn);
        };
        updateStateFromLocalStorage();
        const localStorageTimer = setInterval(() => {
            updateStateFromLocalStorage();
        }, 2000);

        return () => {
            clearInterval(localStorageTimer);
        };
    }, []);



    const handleLoginModalOpen = () => {
        setLoginModalOpen(true);
    };

    const handleLoginModalClose = () => {
        setLoginModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', false);
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    };

    return (
        <div className="header">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
                <h3>Doctor Finder</h3>
            </div>
            <div className="button-container">
                {isLoggedIn ? (
                    <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleLoginModalOpen}>Login</Button>
                )}
            </div>
            <AuthenticationModal isOpen={isLoginModalOpen} handleClose={handleLoginModalClose} >
                <Login onClose={handleLoginModalClose} />
            </AuthenticationModal>
        </div>
    );
}

export default Header;
