import React from 'react';
import './styling/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const Home = () => {
	return (
		<div className="home-container">
			<div className="home-container-text">
				<h1>Welcome to my site!</h1>
				<p>
					This website is dedicated for trying and testing different full-stack web
					development techniques. The site is built with React and Express which are
					created with Docker images. Database is done with PostgreSQL and the site is
					hosted by ????.
				</p>
				<p>
					I have also added seperated pages for showcasing my projects that which I have
					created and providing information about me and my education. You can check my
					previous projects on Github, where this websites source code and most of my
					university projects are located.
				</p>
				<p>
					My LinkedIn and GitHub profiles are linked below. Also, feel free to reach out
					to me via email.
				</p>
			</div>
			<div className="home-container-social">
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
			</div>
		</div>
	);
};
