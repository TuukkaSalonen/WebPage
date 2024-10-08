import React, { useEffect } from 'react';
import './styling/Home.css';

export const Home = () => {
	useEffect(() => {
		const container = document.querySelector('.home-container');
		setTimeout(() => {
			container.classList.add('fade-in');
		}, 100);
	});
	return (
		<div className="home-container">
			<div className="home-container-text">
				<h1>Welcome to my site!</h1>
				<p>
					This website is dedicated for trying and testing different full-stack web
					development techniques. The site is built with React and Express which are
					created with Docker images. Database is built with PostgreSQL and the site is
					hosted by ????.
				</p>
				<p>
					I have also added seperated page for showcasing my projects which I have created
					to test different web techniques. Also I created a page thatg provides
					information about me and my education. You can check my previous projects on
					Github, where this websites source code and most of my university projects are
					located.
				</p>
				<p>
					My LinkedIn and GitHub profiles are linked in the footer below. Also, feel free to reach out
					to me via email.
				</p>
			</div>
		</div>
	);
};
