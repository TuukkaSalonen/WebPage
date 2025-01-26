import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLogin } from '../../redux/actionCreators/thunks/login.ts';

export const ProtectedRoute = ({ children, roles }) => {
    const dispatch = useDispatch();
    const isLoggedin = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.role);
    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        dispatch(getLogin());
    }, [dispatch]);

    if (!isLoggedin && !loading) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(role) && !loading) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;