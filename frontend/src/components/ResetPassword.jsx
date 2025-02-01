import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { validateResetToken, resetPassword } from '../redux/actionCreators/thunks/reset.ts';
import { useDispatch } from 'react-redux';

//import './styling/ResetPassword.css';

export const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        console.log("checking token");
        async function checkToken() {
            console.log("check");
            const isValid = await dispatch(validateResetToken(token));
            if (!isValid) {
                console.log(isValid);
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
            <Typography variant="h4" component="h1" gutterBottom>
                Reset Password
            </Typography>
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