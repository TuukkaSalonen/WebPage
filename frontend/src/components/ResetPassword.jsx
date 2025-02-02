import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';
import { validateResetToken, resetPassword } from '../redux/thunks/reset.ts';
import { useDispatch } from 'react-redux';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styling/ResetPassword.css';

export const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        async function checkToken() {
            const isValid = await dispatch(validateResetToken(token));
            if (!isValid) {
                navigate('/forgot-password');
            }
        }
        checkToken();
    }, [dispatch, token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(resetPassword(token, password, confirmPassword, navigate));
    }

    return (
        <Container maxWidth="sm" className="reset-password-container">
            <Link to={'/login'} className="login-back-button"> 
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</Link>
            <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Enter password (length > 6)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Reset Password
                    </Button>
                </form>
        </Container>
    );
};