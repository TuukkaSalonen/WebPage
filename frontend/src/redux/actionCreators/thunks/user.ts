// Not currently used
// export const fetchProfile = async (id: string): Promise<Object> => {
// 	try {
// 		const response = await fetch(`/api/user/${id}`, {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			credentials: 'include',
// 		});
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}
// 		const data = await response.json();
// 		if (data.message) {
// 			return data.message;
// 		} else {
// 			throw new Error('No message in response');
// 		}
// 	} catch (error) {
// 		console.error('There was a problem with fetch operation:', error);
// 		throw new Error('Internal server error');
// 	}
// };

export const putUsername = async (id: string, username: string): Promise<string> => {
	try {
		const response = await fetch(`/api/user/${id}/username`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ username }),
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
		console.error('There was a problem with fetch operation:', error);
		throw new Error(error.message);
	}
};

export const putEmail = async (id: string, email: string): Promise<string> => {
	try {
		const response = await fetch(`/api/user/${id}/email`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ email }),
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
		console.error('There was a problem with fetch operation:', error);
		throw new Error(error.message);
	}
};

export const putPassword = async (id: string, oldPassword: string, newPassword: string): Promise<void> => {
	try {
		const response = await fetch(`/api/user/${id}/password`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ oldPassword, newPassword }),
		});
		const data = await response.json();
		if (data.message) {
			if (!response.ok) {
				throw new Error(data.message);
			}
		} else {
			throw new Error('No message in response');
		}
	} catch (error) {
		console.error('There was a problem with fetch operation:', error);
		throw new Error(error.message);
	}
};
