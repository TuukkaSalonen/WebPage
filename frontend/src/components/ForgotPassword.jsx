import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resetPasswordEmail } from '../redux/actionCreators/thunks/reset.ts';
import './styling/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailSent = await dispatch(resetPasswordEmail(email));
        if (emailSent) {
            navigate('/');
        }
    };

    return (
        <Container maxWidth="sm" className="forgot-password-container">
            <Link to={'/login'} className="login-back-button"> 
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</Link>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>
            <p>You can reset your password only if you have added email on your account!</p>
        </Container>
    );
};

export default ForgotPassword;