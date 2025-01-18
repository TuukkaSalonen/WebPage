import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, roles }) => {
    const isLoggedin = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.user.role);

    if (!isLoggedin) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;