// API request to send snake score
export const postSnakeScore = async (score: number): Promise<Object> => {
	try {
		const response = await fetch('/api/snake', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ score }),
			credentials: 'include',
		});
		const data = await response.json();
		if (data.message) {
			if (response.ok) {
				return data.message;
			} else {
				throw new Error(data.message);
			}
		} else {
			throw new Error('No message in response');
		}
	} catch (error) {
		//console.error('There was a problem with fetch operation:', error);
		throw new Error(error.message);
	}
};

// API request to fetch snake leaderboard
export const getSnakeLeaderboard = async (): Promise<[Object]> => {
	try {
		const response = await fetch('/api/snake', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		if (data.message) {
			if (!response.ok) {
				throw new Error(data.message);
			}
			return data.message;
		} else {
			throw new Error('No message in response');
		}
	} catch (error) {
		//console.error('There was a problem with fetch operation:', error);
		throw new Error(error.message);
	}
};

// API request to fetch user snake scores
export const getUserSnakeScores = async (userId: string): Promise<[Object]> => {
	try {
		const endpoint = userId ? `/api/snake/user/${userId}` : '/api/snake/user';
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		if (data.message) {
			if (!response.ok) {
				throw new Error(data.message);
			}
			return data.message;
		} else {
			throw new Error('No message in response');
		}
	} catch (error) {
		//console.error('There was a problem with fetch operation:', error);
		throw new Error(error.message);
	}
};
