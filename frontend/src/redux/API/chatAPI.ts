// API request to post chatbot message
export const postChatMessage = async (message: string): Promise<string> => {
	try {
		const response = await fetch('/api/general/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message }),
			credentials: 'include',
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
		return "I'm sorry, something unexpected occurred.";
	}
};
