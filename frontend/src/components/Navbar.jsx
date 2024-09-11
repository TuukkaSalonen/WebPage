import React from 'react';
import { Link } from 'react-router-dom';
import './styling/Navbar.css';
import Button from '@mui/material/Button';

export const Navbar = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="navbar-link">
				<Button variant="contained" style={{ borderRadius: 30 }}>
					Home
				</Button>
			</Link>
			<Link to="/details" className="navbar-link">
				<Button variant="contained" style={{ borderRadius: 30 }}>
					CV
				</Button>
			</Link>
			<Link to="/projects" className="navbar-link">
				<Button variant="contained" style={{ borderRadius: 30 }}>
					Projects
				</Button>
			</Link>
		</nav>
	);
};
