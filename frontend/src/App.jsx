import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { Home } from './components/Home.jsx';
import { Details } from './components//Details.jsx';
import { Projects } from './components/Projects.jsx';
import { NotFound } from './components/NotFound.jsx';

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
				<p>Copyright &copy; 2024</p>
			</footer>
		</div>
	);
};

export default App;
