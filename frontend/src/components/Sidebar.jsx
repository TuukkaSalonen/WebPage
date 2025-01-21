import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import './styling/Sidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { postLogout } from '../redux/actionCreators/thunks/login.ts';
import { useRef, useEffect, useCallback } from 'react';

export const Sidebar = ({ isOpen, toggleSidebar, visitorCount }) => {
	const loggedIn = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.username);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const sidebarRef = useRef(null);

	const handleLogout = () => {
		dispatch(postLogout()).then(() => {
			navigate('/');
			toggleSidebar();
		});
	};

	const handleClickOutside = useCallback(
		(event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				toggleSidebar();
			}
		},
		[toggleSidebar]
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, handleClickOutside]);

	return (
		<div className={isOpen ? 'sidebar open' : 'sidebar'} ref={sidebarRef}>
			<FontAwesomeIcon icon={faTimes} className="close-icon" onClick={toggleSidebar} />
			<ul>
				{loggedIn ? (
					<>
						<li>
							<p>Logged in as: {user}</p>
						</li>
						<li>
							<Link to="/profile" onClick={toggleSidebar}>
								Profile
							</Link>
						</li>
						<li>
							<Link onClick={handleLogout}>Log out</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login" onClick={toggleSidebar}>
								Login
							</Link>
						</li>
						<li>
							<Link to="/register" onClick={toggleSidebar}>
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
			<div className="site-info">
				<p>Visitor count: {visitorCount}</p>
				<p>Last update: 18.1.2025</p>
			</div>
		</div>
	);
};
