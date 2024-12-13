export const postSnakeScore = async (score: number): Promise<void> => {
	try {
		const response = await fetch('/api/general/snake', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ score: score }),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
	} catch (error) {
		console.error('There was a problem with fetch operation:', error);
	}
};

export const getSnakeLeaderboard = async (): Promise<string> => {
	try {
		const response = await fetch('/api/general/snake', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
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
		return 'Something unexpected occurred.';
	}
};