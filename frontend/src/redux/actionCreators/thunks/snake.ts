export const postSnakeScore = async (score: number): Promise<Object> => {
	try {
		const response = await fetch('/api/general/snake', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ score }),
			credentials: 'include'
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		if (data.message) {
			return data.message;
		} else {
			throw new Error('No message in response');
		}
	} catch (error) {
		console.error('There was a problem with fetch operation:', error);
		throw new Error('Internal server error');
	}
};

export const getSnakeLeaderboard = async (): Promise<[Object]> => {
	try {
		const response = await fetch('/api/general/snake', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		if (data.message) {
			return data.message;
		} else {
			throw new Error('No message in response');
		}
	} catch (error) {
		console.error('There was a problem with fetch operation:', error);
		throw new Error('Internal server error');
	}
};
