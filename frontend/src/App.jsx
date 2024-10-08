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

const App = ({ visitorCount }) => {
	return (
		<div className="App">
			<Navbar visitorCount={visitorCount} />
			<div className="main-content">
				<Routes>
					<Route path="/details" element={<Details />}></Route>
					<Route path="/projects" element={<Projects />}></Route>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
			<footer>
				<p className='last-update'>Last update: 8.10.2024</p>
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
							<a href="mailto:tuukka.salonen2@gmail.com">
								<FontAwesomeIcon icon={faEnvelope} size="2x" />
							</a>
			</footer>
		</div>
	);
};

export default App;
