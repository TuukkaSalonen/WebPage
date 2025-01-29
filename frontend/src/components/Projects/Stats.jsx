import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../styling/Stats.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { toggleVirtual, getStats } from '../../redux/actionCreators/statActions.ts';
import { virtualLevels, eliteVirtualLevels } from '../constants/statConstants.ts';

export const Stats = () => {
	const [username, setUsername] = useState('');
	const stats = useSelector((state) => state.stats.stats);
	const name = useSelector((state) => state.stats.name);
	const dispatch = useDispatch();
	const virtual = useSelector((state) => state.stats.virtual);

	useEffect(() => {
		if (name) {
			setUsername(name);
		}
	}, [name]);

	const handleSend = () => {
		dispatch(getStats(username));
	};

	const handleInputChange = (event) => {
		setUsername(event.target.value);
	};

	const handleAlignment = (event, newAlignment) => {
		if (newAlignment !== null) {
			dispatch(toggleVirtual());
		}
	};

	const getVirtualLevel = (skill, level, experience) => {
		const levels = skill === 'Invention' ? eliteVirtualLevels : virtualLevels;
		if (skill === 'Overall') {
			return 0;
		}
		for (let i = levels.length - 1; i >= 0; i--) {
			if (experience >= levels[i].xp) {
				return levels[i].level;
			}
		}
		return level;
	};

	const updateStatsWithVirtualLevels = (stats) => {
		return stats.map((skillrow) => ({
			...skillrow,
			level: getVirtualLevel(skillrow.skill.name, skillrow.level, skillrow.experience),
		}));
	};

	const getTotalVirtualLevel = (stats) => {
		const updatedStats = updateStatsWithVirtualLevels(stats);
		return updatedStats.reduce((total, skillrow) => {
			return total + parseInt(skillrow.level);
		}, 0);
	};

	const updatedStats = virtual ? updateStatsWithVirtualLevels(stats) : stats;
	const totalVirtualLevel = getTotalVirtualLevel(stats);

	const overallIndex = updatedStats.findIndex((skillrow) => skillrow.skill.name === 'Overall');
	if (overallIndex !== -1) {
		updatedStats[overallIndex].level = virtual ? totalVirtualLevel : stats[overallIndex].level;
	}

	return (
		<div className="stats-container">
			<Link to="/projects" className="stat-back-button">
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</Link>
			<div className="search-column">
				<h3>Lookup RuneScape stats</h3>
				<TextField
					className="text-field"
					placeholder="Enter username: e.g. PottuTatti"
					variant="outlined"
					value={username}
					onChange={handleInputChange}
					sx={{
						marginBottom: '5px',
						'& .MuiInputBase-input': {
							textAlign: 'center',
						},
						'& fieldset': {
							borderColor: 'black',
						},
						'&:hover fieldset': {
							borderColor: '#0056b3',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#0056b3',
						},
					}}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							handleSend();
							event.preventDefault();
						}
					}}
				/>
				<Button className="search-button" variant="contained" sx={{ margin: '10px' }} onClick={() => handleSend()}>
					Search stats
				</Button>
				<ToggleButtonGroup value={virtual ? 'virtual' : 'normal'} exclusive onChange={handleAlignment} aria-label="text alignment">
					<ToggleButton value="normal" aria-label="left aligned">
						<div>Normal levels</div>
					</ToggleButton>
					<ToggleButton value="virtual" aria-label="right aligned">
						<div>Virtual levels</div>
					</ToggleButton>
				</ToggleButtonGroup>
			</div>
			<TableContainer component={Paper} className="table-container">
				<Table className="skill-table" size="small" sx={{ maxWidth: 900 }} aria-label="simple table">
					{stats.length > 0 && (
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 'bold' }}>Skill</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }} align="right">
									Level
								</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }} align="right">
									Experience
								</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }} align="right">
									Rank
								</TableCell>
							</TableRow>
						</TableHead>
					)}
					<TableBody>
						{updatedStats.map((skillrow, index) => (
							<TableRow className="table-row" key={index}>
								<TableCell component="th" scope="row">
									<img src={skillrow.skill.imageUrl} alt={skillrow.skill.name} className="skill-icon" />
									{skillrow.skill.name}
								</TableCell>
								<TableCell align="right">{Number(skillrow.level).toLocaleString('en-US')}</TableCell>
								<TableCell align="right">{Number(skillrow.experience).toLocaleString('en-US')}</TableCell>
								<TableCell align="right">{Number(skillrow.rank).toLocaleString('en-US')}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
