import './styling/Details.css';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '@mui/material/Link';

export const Details = () => {
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
						<p>Computer Science (120cr)</p>
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
				<div className="details-section">
					<h2>Programming knowledge</h2>
					<p>C</p>
					<p>C++</p>
					<p>JavaScript</p>
					<p>TypeScript</p>
					<p>PostgreSQL</p>
					<p>Java</p>
					<p>Haskell</p>
					<p>React</p>
					<p>Redux</p>
					<p>Vue.js</p>
					<p>Node.js</p>
					<p>Express</p>
					<p>Python</p>
					<p>HTML</p>
					<p>CSS</p>
					<p>Git</p>
					<p>Docker</p>
					<p>Firebase</p>
					<p>Mobile</p>
					<p>RabbitMQ</p>
					<p></p>
				</div>
				<div className="details-section">
					<h2>Background</h2>
					<p>Details about your overall background...</p>
				</div>
				<div>
					<div className="details-section">
						<h2>Hobbies</h2>
						<p>Gaming</p>
						<p>Jogging</p>
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
