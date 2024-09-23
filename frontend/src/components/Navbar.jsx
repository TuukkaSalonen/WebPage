import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styling/Navbar.css';
import Button from '@mui/material/Button';

const Navbar = ({ visitorCount }) => {

  const location = useLocation();

	return (
		<nav className="navbar">
			<div className="navbar-center">
				<Link to="/" className="navbar-link">
					<Button variant="contained" className={location.pathname === '/' ? 'active' : ''}>
						Home
					</Button>
				</Link>
				<Link to="/details" className="navbar-link">
					<Button variant="contained"  className={location.pathname === '/details' ? 'active' : ''}>
						Who am I?
					</Button>
				</Link>
				<Link to="/projects" className="navbar-link">
					<Button variant="contained" className={location.pathname==='/projects' ? 'active' : ''}>
						Projects
					</Button>
				</Link>
			</div>
			<div className="visitor-count">Total visitors: {visitorCount}</div>
		</nav>
	);
};

export default Navbar;
