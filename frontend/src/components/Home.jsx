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
				<h1>Welcome!</h1>
				<p>
					This website is dedicated for trying and testing different full-stack web
					development techniques. The site is built with React and Express which are
					created with Docker images. PostgreSQL is used for the database and the site is
					hosted by AWS.
				</p>
				<p>
					I have also added separated page for showcasing my projects which I have created
					to test different web techniques. Also, I created a page that provides
					background information about me. You can check my previous projects on Github,
					where this website source code and most of my university projects are located.
				</p>
				<p>
					My LinkedIn and GitHub profiles are linked in the footer below. Also, feel free
					to reach out to me via email.
				</p>
				<p>
					Note that this site is not in active development and is used as a hobby and
					testing platform.
				</p>
			</div>
		</div>
	);
};
