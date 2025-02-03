import React, { useEffect } from 'react';
import './styling/Home.css';
import { List, ListItem, ListItemText } from '@mui/material';

export const Home = () => {
	useEffect(() => {
		const container = document.querySelector('.home-container');
		setTimeout(() => {
			container.classList.add('fade-in');
		}, 100);
	});

	// Temporary, will be replaced within database
	const newsItems = [
		{
			date: '2025-02-9',
			content: 'Added user system with register, login, password recovery, user details modification and snake scores tracking.',
		},
		{ date: '2025-01-12', content: 'Added RS stats page to search Runescape stats by username from the Runescape API.' },
		{ date: '2024-12-23', content: 'Initial website launch with snake game, chatbot and the introduction page.' },
	];

	return (
		<div className="home-container">
			<h1>Welcome!</h1>
			<div className="home-container-text">
				<div className="site-news">
					<h2>News</h2>
					<List>
						{newsItems.map((news, index) => (
							<ListItem key={index}>
								<ListItemText
									primary={news.content}
									secondary={news.date}
									slotProps={{
										primary: {
											style: {
												fontSize: '1.2rem',
												color: '#555',
												paddingBottom: '5px',
												fontFamily:
													'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
											},
										},
										secondary: {
											style: {
												fontSize: '0.9rem',
												color: '#777',
												fontFamily:
													'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
											},
										},
									}}
								/>
							</ListItem>
						))}
					</List>
				</div>
				<div className="site-purpose">
					<h2>Purpose</h2>
					<p>
						This website is dedicated for trying and testing different full-stack web development features. The site is built with Docker
						containerization. React and Nginx are used in the frontend and Express in the backend. Node is used for both servers.
						PostgreSQL is used for the database. The frontend, backend and database containers are run inside of an AWS EC2 virtual
						machine instance.
					</p>
					<p>
						I have also added separated page for showcasing my projects which I have created to test different web tools & techniques.
						There is also a page that provides background information about me. You can check my previous projects on Github, where this
						website source code and most of my university projects are located.
					</p>
				</div>
				<div className="site-about">
					<h2>Info</h2>
					<p>
						Note that this site is not in active development and is used as a hobby project and as a testing platform. Updates will be
						added when I have time and worthwhile ideas.
					</p>
					<p>
						If you wish to contact me or view my projects, my LinkedIn and GitHub profiles are linked in the footer below. Also, feel free
						to reach out to me via email.
					</p>
				</div>
			</div>
		</div>
	);
};
