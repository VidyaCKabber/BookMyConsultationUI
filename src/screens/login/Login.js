import React, { useState, useRef, useEffect } from 'react';
import { FormControl, InputLabel, Input, Button, Paper } from '@material-ui/core';
import ErrorPopup from '../../common/error/ErrorPopup';
import './Login.css';

const Login = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    useEffect(() => {
        if (emailError && emailInputRef.current) {
            emailInputRef.current.focus();
        }
        if (passwordError && passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
    }, [emailError, passwordError]);

    const handleLogin = async () => {
        // Reset errors
        setEmailError('');
        setPasswordError('');

        // Basic validation
        if (!email) {
            setEmailError('Please fill out this field');
            return;
        }
        if (!password) {
            setPasswordError('Please fill out this field');
            return;
        }

        try {
            // Construct basic authentication token
            const basicAuthToken = btoa(`${email}:${password}`);
            console.log(basicAuthToken);
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${basicAuthToken}`,
                    'Content-Type': 'application/json',
                }
            });

            // Retrieve the access token from the response
            const data = await response.json();
            if (!response.ok) {
                if (data.message === "Username does not exist") {
                    setEmailError('Enter valid Email');
                }
                setPasswordError("Invalid credentials");
                console.log(data.message);
                return;
            }
            const accessToken = data.accessToken.trim();
            const userId = data.id;
            const userName = btoa(`${data.firstName} ${data.lastName}`);
            const userEmailId = data.emailAddress;
            console.log(data);
            // Store the access token in localStorage or sessionStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('userId', userId);
            localStorage.setItem('userName', userName);
            localStorage.setItem('userEmailId', userEmailId);

            // Navigate to the home page
            // code to be implemented

        } catch (error) {
            console.error('Login failed:', error);
            setPasswordError('Failed to Login in');
        }
    };


    return (
        <div className="login-modal">
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">Email *</InputLabel>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputRef={emailInputRef}
                />
                {emailError && email.length == 0 &&
                    <ErrorPopup message={emailError} />
                }
                {email.length > 0 && emailError === "Enter valid Email" && <span className="error">{emailError}</span>}
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="password">Password *</InputLabel>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    inputRef={passwordInputRef}
                />
                {passwordError === "Invalid credentials" && <span className="error">Invalid credentials</span>}
                {passwordError && password.length == 0 &&
                    <ErrorPopup message={passwordError} />
                }
            </FormControl>
            <Button variant="contained" color="primary" style={{ margin: 'auto', display: 'block', marginTop: '25px' }} onClick={handleLogin}>
                LOGIN
            </Button>
        </div>
    );
}

export default Login;
