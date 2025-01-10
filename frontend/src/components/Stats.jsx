import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import './styling/Stats.css';
import { getRsStats } from '../redux/actionCreators/thunks/rs.ts';

// Add toggle virtual level

export const Stats = () => {
	const [username, setUsername] = useState('');
	const [skills, setSkills] = useState([]);

	const fetchHiscores = async () => {
		if (username) {
			try {
				const data = await getRsStats(username);
				console.log('Data saatu:', data);
				setSkills(data);
			} catch (error) {
				console.error('Error fetching hiscores:', error);
			}
		} else {
			console.log('Username is empty');
		}
	};

	const handleInputChange = (event) => {
		setUsername(event.target.value);
	};

	return (
		<div className="stats-container">
			{/* Back button */}
			<h3>Lookup RuneScape stats</h3>
			<TextField
				className="text-field"
				placeholder="Enter username: eg. PottuTatti"
				variant="outlined"
				value={username}
				onChange={handleInputChange}
				sx={{
					'& .MuiInputBase-input': {
						textAlign: 'center',
					},
				}}
			/>
			<Button
				className="search-button"
				variant="contained"
				sx={{ margin: '5px' }}
				onClick={() => fetchHiscores()}
			>
				Search stats
			</Button>
			<TableContainer component={Paper} className="table-container">
				<Table className="skill-table" size='small' sx={{ minWidth: 650, maxWidth: 900}} aria-label="simple table">
					{skills.length > 0 && (
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 'bold' }}>Skill</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }} align="right">
									Level
								</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }} align="right">
									Experience
								</TableCell>
							</TableRow>
						</TableHead>
					)}
					<TableBody>
						{skills.map((skillrow, index) => (
							<TableRow className='table-row' key={index}>
								<TableCell component="th" scope="row">
									<img src={skillrow.skill.imageUrl} alt={skillrow.skill.name} className='skill-icon' />
									{skillrow.skill.name}
								</TableCell>
								<TableCell align="right">{skillrow.level}</TableCell>
								<TableCell align="right">{skillrow.experience}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
