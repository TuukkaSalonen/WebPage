import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './styling/Sidebar.css';

export const Sidebar = ({ isOpen, toggleSidebar, visitorCount }) => {
	return (
		<div className={isOpen ? 'sidebar open' : 'sidebar'}>
			<FontAwesomeIcon icon={faTimes} className="close-icon" onClick={toggleSidebar} />
			<ul>
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
			</ul>
			<div className="site-info">
				<p>Visitor count: {visitorCount}</p>
				<p>Last update: 17.1.2025</p>
			</div>
		</div>
	);
};
