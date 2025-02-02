// API request to update username
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

// API request to update email
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

// API request to update password
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

// API request to delete email
export const deleteEmail = async (id: string): Promise<void> => {
	try {
		const response = await fetch(`/api/user/${id}/email`, {
			method: 'DELETE',
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
		} else {
			throw new Error('No message in response');
		}
	} catch (error) {
		console.error('There was a problem with fetch operation:', error);
		throw new Error(error.message);
	}
};

// API request to delete user
export const deleteUser = async (id: string): Promise<void> => {
	try {
		const response = await fetch(`/api/user/${id}`, {
			method: 'DELETE',
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
		} else {
			throw new Error('No message in response');
		}
	} catch (error) {
		console.error('There was a problem with fetch operation:', error);
		throw new Error(error.message);
	}
};