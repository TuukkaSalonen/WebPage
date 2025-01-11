import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { Home } from './components/Home.jsx';
import { Details } from './components//Details.jsx';
import { Projects } from './components/Projects.jsx';
import { NotFound } from './components/NotFound.jsx';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Snake } from './components/Snake.jsx';
import { Stats } from './components/Stats.jsx';
import { Notification } from './components/Notification.jsx';

const App = ({ visitorCount }) => {
	return (
		<div className="App">
			<Navbar visitorCount={visitorCount} />
			<Notification />
			<div className="main-content">
				<Routes>
					<Route path="/details" element={<Details />}></Route>
					<Route path="/projects" element={<Projects />}></Route>
					<Route path="/projects/snake" element={<Snake />}></Route>
					<Route path="/projects/rs" element={<Stats />}></Route>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
			<footer>
				<p className="last-update">Last update: 11.1.2025</p>
				<div className="links">
					<a
						href="https://www.linkedin.com/in/tuukkasalonen/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faLinkedin} size="2x" />
					</a>
					<a
						href="https://github.com/TuukkaSalonen"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faGithub} size="2x" />
					</a>
					<a href="mailto:tuukkasalonen@outlook.com">
						<FontAwesomeIcon icon={faEnvelope} size="2x" />
					</a>
				</div>
			</footer>
		</div>
	);
};

export default App;
