import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styling/Navbar.css';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Sidebar } from './Sidebar';

const Navbar = ({ visitorCount }) => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="navbar">
			<div className="navbar-center">
				<FontAwesomeIcon
					icon={isOpen ? faTimes : faBars}
					className="sidebar-icon"
					onClick={toggleSidebar}
				/>
				<Link to="/" className="navbar-link">
					<Button
						variant="contained"
						className={location.pathname === '/' ? 'active' : ''}
					>
						Home
					</Button>
				</Link>
				<Link to="/details" className="navbar-link">
					<Button
						variant="contained"
						className={location.pathname === '/details' ? 'active' : ''}
					>
						Who am I?
					</Button>
				</Link>
				<Link to="/projects" className="navbar-link">
					<Button
						variant="contained"
						className={location.pathname.startsWith('/projects') ? 'active' : ''}
					>
						Projects
					</Button>
				</Link>
			</div>
			<Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} visitorCount={visitorCount} />
		</nav>
	);
};

export default Navbar;
