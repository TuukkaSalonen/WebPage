// Add error handling with notifications if user not found/error in RuneScape API
export const getRsStats = async (username: string): Promise<Object> => {
	try {
		const response = await fetch(`/api/general/rs/${username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		if (!response.ok) {
            const data = await response.json();
			if (data.message) {
				return data.message;
			} else {
				throw new Error('No message in response');
			}
		}
        else {
            const data = await response.json();
            return data.message;
        }
	} catch (error) {
		console.error('There was a problem with fetch operation:', error);
		throw new Error('Internal server error');
	}
};
