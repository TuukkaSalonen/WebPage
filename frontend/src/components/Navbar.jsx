import React from 'react';
import { Link } from 'react-router-dom';
import './styling/Navbar.css';

export const Navbar = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="navbar-link">
				Home
			</Link>
			<Link to="/details" className="navbar-link">
				Personal details
			</Link>
			<Link to="/projects" className="navbar-link">
				Projects
			</Link>
		</nav>
	);
};
