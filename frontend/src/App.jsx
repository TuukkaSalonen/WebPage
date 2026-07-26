import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { Home } from './components/Home.jsx';
import { Details } from './components//Details.jsx';
import { Projects } from './components/Projects/Projects.jsx';
import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';
import { NotFound } from './components/SpecialRoutes/NotFound.jsx';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Snake } from './components/Projects/Snake.jsx';
import { Stats } from './components/Projects/Stats.jsx';
import { Notification } from './components/Notification.jsx';
import { useLocation } from 'react-router-dom';
import ProtectedRoute from './components/SpecialRoutes/ProtectedRoute.jsx';
import GuestRoute from './components/SpecialRoutes/GuestRoute.jsx';
import { Profile } from './components/Profile.jsx';
import { Unauthorized } from './components/SpecialRoutes/Unauthorized.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkLogin } from './redux/thunks/login.ts';
import SnakeScores from './components/SnakeScores.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import { ResetPassword } from './components/ResetPassword.jsx';
import { setMetaTags } from './components/constants/utils.ts';

const App = ({ visitorCount }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { title, description } = setMetaTags(location.pathname);

	useEffect(() => {
		dispatch(checkLogin());
		const intervalCheckLogin = setInterval(() => {
			dispatch(checkLogin());
		}, 300000);
		return () => clearInterval(intervalCheckLogin);
	}, [dispatch]);

	useEffect(() => {
		document.title = title;

		const ensureMetaTag = (selector, attributes) => {
			let metaTag = document.head.querySelector(selector);
			if (!metaTag) {
				metaTag = document.createElement('meta');
				document.head.appendChild(metaTag);
			}
			Object.entries(attributes).forEach(([name, value]) => metaTag.setAttribute(name, value));
		};

		ensureMetaTag('meta[name="description"]', { name: 'description', content: description });
		ensureMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
		ensureMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
	}, [description, title]);

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
					<Route
						path="/login"
						element={
							<GuestRoute>
								<Login />
							</GuestRoute>
						}
					></Route>
					<Route
						path="/register"
						element={
							<GuestRoute>
								<Register />
							</GuestRoute>
						}
					></Route>
					<Route
						path="/forgot-password"
						element={
							<GuestRoute>
								<ForgotPassword />
							</GuestRoute>
						}
					></Route>
					<Route
						path="/reset-password/:token"
						element={
							<GuestRoute>
								<ResetPassword />
							</GuestRoute>
						}
					></Route>
					<Route
						path="/profile"
						element={
							<ProtectedRoute roles={['user', 'admin']}>
								<Profile />
							</ProtectedRoute>
						}
					></Route>
					<Route
						path="/scores"
						element={
							<ProtectedRoute roles={['user', 'admin']}>
								<SnakeScores />
							</ProtectedRoute>
						}
					></Route>
					<Route path="/unauthorized" element={<Unauthorized />}></Route>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
			<footer>
				<div className="links">
					<a href="https://www.linkedin.com/in/tuukkasalonen/" target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon icon={faLinkedin} size="2x" />
					</a>
					<a href="https://www.github.com/TuukkaSalonen" target="_blank" rel="noopener noreferrer">
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
