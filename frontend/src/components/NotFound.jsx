import './styling/Home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
	const navigate = useNavigate();
	const [seconds, setSeconds] = useState(5);

	useEffect(() => {
		if (seconds > 0) {
			const timer = setTimeout(() => {
				setSeconds((prev) => prev - 1);
			}, 1000);

			return () => clearTimeout(timer);
		} else {
			navigate('/');
		}
	}, [seconds, navigate]);

	return (
		<div className="home-container">
			<div className="home-container-text">OOPS!</div>
			<div>This page was not found.</div>
			<div>Redirecting back to home page in {seconds} seconds.</div>
		</div>
	);
};
