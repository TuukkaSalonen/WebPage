import './styling/Details.css';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from '@mui/material/Link';

import { useEffect } from 'react';

export const Details = () => {
	useEffect(() => {
		const sections = document.querySelectorAll('.details-section, .photo-container');
		sections.forEach((section, index) => {
			setTimeout(() => {
				section.classList.add('fade-in');
			}, index * 100);
		});
	}, []);
	return (
		<div className="details-container">
			<div className="photo-container">
				<img src="photo.jpg" alt="Tuukka Salonen" className="profile-photo" />
			</div>
			<div className="education-content">
				<div className="details-section">
					<h2>Education</h2>
					<div className="education-subsection">
						<h3>Master's Degree 2024-</h3>
						<p>Software Engineering (120cr)</p>
					</div>
					<div className="education-subsection">
						<h3>Bachelor's Degree 2021-2024</h3>
						<p>
							<Link
								href="https://urn.fi/URN:NBN:fi:tuni-202405206059"
								target="_blank"
								rel="noopener noreferrer"
								underline="hover"
								color="primary"
							>
								Utilization of WebGL- and WebGPU-interfaces in web games
							</Link>
						</p>
						<p>Computer Science (150cr)</p>
						<p>Business Studies (30cr)</p>
					</div>
					<h4>Tampere University & University of Eastern Finland</h4>
				</div>
			</div>
			<div className="additional-sections">
				<div className="details-section knowledge-list">
					<h2>Programming knowledge</h2>
					<ul>
						<li>C</li>
						<li>C++</li>
						<li>JavaScript</li>
						<li>TypeScript</li>
						<li>PostgreSQL</li>
						<li>Java</li>
						<li>JavaFX</li>
						<li>Haskell</li>
						<li>React</li>
						<li>Redux</li>
						<li>Vue</li>
						<li>NodeJS</li>
						<li>Express</li>
						<li>Python</li>
						<li>HTML</li>
						<li>CSS</li>
						<li>Git</li>
						<li>Docker</li>
						<li>Firebase</li>
						<li>Android</li>
						<li>RabbitMQ</li>
						<li>Mocha</li>
						<li>Jest</li>
						<li>Nginx</li>
					</ul>
				</div>
				<div className="details-section">
					<h2>Background</h2>
					<p>
						My name is Tuukka Salonen. I am a Master's degree student in Computer
						Science at Tampere University focusing on Software Engineering. I have
						always been passionate about games which led me to this branch.
					</p>
					<p>
						My main focus and interest throughout my university studies has been
						software development.
					</p>
					<p>I have learned a wide variety of programming languages and tools.</p>
					<p>
						I have gotten experience in software development such as software
						engineering, full-stack web-development in backend/frontend/databases,
						software testing and design.
					</p>
				</div>
				<div>
					<div className="details-section">
						<h2>Hobbies</h2>
						<p>Gaming, Jogging</p>
					</div>
					<div className="details-section">
						<h2>CV</h2>
						<Link
							href="CV_TEMPLATE.pdf"
							target="_blank"
							rel="noopener noreferrer"
							underline="hover"
							color="primary"
						>
							View CV-TEMPLATE
						</Link>
					</div>
					<div className="details-section">
						<h2>Contact Me</h2>
						<div className="contact-section">
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
				</div>
			</div>
		</div>
	);
};
