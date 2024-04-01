// Register.js
import React, { useState, useRef, useEffect } from 'react';
import { FormControl, InputLabel, Input, Button, Paper } from '@material-ui/core';
import ErrorPopup from '../../common/error/ErrorPopup';
import './Register.css'

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [contactNumberError, setContactNumberError] = useState('');
    const [registrationMessage, setRegistrationMessage] = useState('');

    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const contactNumberInputRef = useRef(null);

    useEffect(() => {
        if (firstNameError) {
            firstNameInputRef.current.focus();
        }
        if (lastNameError) {
            lastNameInputRef.current.focus();
        }
        if (emailError) {
            emailInputRef.current.focus();
        }
        if (passwordError) {
            passwordInputRef.current.focus();
        }
        if (contactNumberError) {
            contactNumberInputRef.current.focus();
        }
    }, [firstNameError, lastNameError, emailError, passwordError, contactNumberError]);
    

    const handleRegister = async () => {
        const emptyFieldErrorMsg = 'Please fill out this field';
        // Reset errors and messages
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setContactNumberError('');
        setRegistrationMessage('');
    
        // Basic validation
        if (!firstName) {
            setFirstNameError(emptyFieldErrorMsg);
            return;
        }
        if (!lastName) {
            setLastNameError(emptyFieldErrorMsg);
            return;
        }
        if (!email) {
            setEmailError(emptyFieldErrorMsg);
            return;
        }
        if (!password) {
            setPasswordError(emptyFieldErrorMsg);
            return;
        }
        if (!contactNumber) {
            setContactNumberError(emptyFieldErrorMsg);
            return;
        }
        if (!isValidEmail(email)) {
            setEmailError('Enter a valid email.');
            return;
        }
    
        try {
            const signInData = {
                firstName: firstName,
                lastName: lastName,
                mobile: contactNumber,
                password: password,
                emailId: email
            };
    
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInData),
            });
    
            if (!response.ok) {
                throw new Error('Registration failed. Please try again.');
            }
            setRegistrationMessage('Registration Successful');
    
            // Add a delay before executing the login code
            setTimeout(async () => {
                console.log("Inside");
                const basicAuthToken = btoa(`${email}:${password}`);
                const loginResponse = await fetch('http://localhost:8080/auth/login', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${basicAuthToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }), 
                });
                
                if (!loginResponse.ok) {
                    throw new Error('Login failed. Please try again.');
                }
    
                const loginData = await loginResponse.json();
                const authToken = loginData.authToken; 
                const userName = btoa(`${firstName} ${lastName}`); 

                // Store the authentication token in localStorage
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userId', loginData.id);
                localStorage.setItem('userName', userName);
                localStorage.setItem('userEmailId', email);
    
                // Clear input fields after successful registration
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setContactNumber('');
            }, 5000); // Delay of 2 seconds (2000 milliseconds)
        } catch (error) {
            console.error('Registration failed:', error.message);
            setRegistrationMessage(error.message || 'Registration failed. Please try again.');
        }
    };
    

    const isValidContactNumber = (contactNumber) => {
        const contactNumberRegex = /^\d{10}$/;
        return contactNumberRegex.test(contactNumber);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="register-form">
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="firstName">First Name *</InputLabel>
                <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    inputRef={firstNameInputRef}
                />
                {firstNameError && 
                    <ErrorPopup message={firstNameError} />
                }
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="lastName">Last Name *</InputLabel>
                <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    inputRef={lastNameInputRef}
                />
                {lastNameError && 
                    <ErrorPopup message={lastNameError} />
                }
            </FormControl>
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
                {email.length<3  && emailError && !isValidEmail(email) && <span className="error">Enter valid email.</span>}
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
                {passwordError && 
                    <ErrorPopup message={passwordError} />
                }
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="contactNumber">Mobile No. *</InputLabel>
                <Input
                    id="contactNumber"
                    type="number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    inputRef={contactNumberInputRef}
                />
                {contactNumber.length ==0 && contactNumberError && 
                    <ErrorPopup message={contactNumberError} />
                }
                {contactNumber.length > 0 && contactNumber.length<11  && contactNumberError && !isValidContactNumber(contactNumber) && <span className="error">Invalid mobile number format.</span>}
            </FormControl>
            <Button variant="contained" className="registerButton" style={{ margin: 'auto', display: 'block', marginTop:'25px' }} color="primary" onClick={handleRegister}>
                REGISTER
            </Button>
            <span className="success" style={{ color:'success', marginTop:'25px' }} >{registrationMessage}</span>
        </div>
    );
};

export default Register;
