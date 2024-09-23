export const fetchChatRequest = async (message: string): Promise<string> => {
	try {
		const response = await fetch('/api/general/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message }),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data.message;
	} catch (error) {
		console.error('There was a problem with fetch operation:', error);
		return "I'm sorry, something unexpected occurred.";
	}
};
