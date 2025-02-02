// API request to fetch rs stats
export const getStats = async (username: string): Promise<Object> => {
	try {
		const response = await fetch(`/api/general/rs/${username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		if (!response.ok) {
			if (data.message) {
				return data.message;
			} else {
				throw new Error('No message in response');
			}
		}
        else {
            return data.message;
        }
	} catch (error) {
		console.error('There was a problem with fetch operation:', error);
		throw new Error('Internal server error');
	}
};
