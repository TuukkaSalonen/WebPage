import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const GuestRoute = ({ children }) => {
    const isLoggedin = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);

    if (isLoggedin && !loading) {
        return <Navigate to="/" />;
    }

    return children;
};

export default GuestRoute;