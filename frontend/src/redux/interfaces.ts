// Login response interface
export interface LoginResponse {
	status: boolean;
	message: string;
}

// Chat message interface
export interface Message {
	text: string;
	sender: 'user' | 'bot';
}