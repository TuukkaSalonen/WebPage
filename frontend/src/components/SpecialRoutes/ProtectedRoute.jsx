import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

export const ProtectedRoute = ({ children, roles }) => {
	const isLoggedin = useSelector((state) => state.auth.isAuthenticated);
	const role = useSelector((state) => state.auth.role);
	const loading = useSelector((state) => state.auth.loading);

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
				<CircularProgress />
			</Box>
		);
	}

	if (!isLoggedin && !loading) {
		return <Navigate to="/login" />;
	}

	if (roles && !roles.includes(role) && !loading) {
		return <Navigate to="/unauthorized" />;
	}

	return children;
};

export default ProtectedRoute;
