import '../styling/Home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
	const navigate = useNavigate();
	const [seconds, setSeconds] = useState(5);

	useEffect(() => {
		const container = document.querySelector('.home-container');
		setTimeout(() => {
			container.classList.add('fade-in');
		}, 100);
	});

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
			<div className="home-container-text">
				<h1>404 OOPS!</h1>
				<p>This page was not found. Redirecting back to home page in {seconds} seconds.</p>
			</div>
		</div>
	);
};
