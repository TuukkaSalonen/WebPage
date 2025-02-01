import db from '../dbConnection';

const tokenTable = 'app.refresh_token';
const resetTable = 'app.password_reset';

// Clear expired refresh tokens
export async function clearExpiredRefreshTokens() {
	try {
		return await db(tokenTable).delete().where('expires_at', '<', new Date(Date.now()));
	} catch (error) {
		console.error('Error deleting all records:', error);
		throw new Error('Error deleting all records');
	}
}

export async function clearExpiredPasswordTokens() {
	try {
		return await db(resetTable).delete().where('expires_at', '<', new Date(Date.now()));
	} catch (error) {
		console.error('Error deleting all records:', error);
		throw new Error('Error deleting all records');
	}
}

// Insert refresh token
export async function insertRefreshToken(user_id: string, token: string) {
	try {
        const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
		return await db(tokenTable).insert({ token, user_id, expires_at }).returning(['token']);
	} catch (error) {
		console.error('Error inserting record:', error);
		throw new Error('Error inserting record');
	}
}

// Select refresh token
export async function getRefreshToken(token: string) {
	try {
		return await db(tokenTable).select('*').where('token', token).first();
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}

// Revoke refresh token
export async function revokeRefreshToken(token: string) {
	try {
		return await db(tokenTable).update('is_revoked', true).where('token', token);
	} catch (error) {
		console.error('Error updating record:', error);
		throw new Error('Error updating record');
	}
}

// Insert password reset token
export async function insertPasswordReset(user_id: string, token: string) {
	try {
		const expires_at = new Date(Date.now() + 1000 * 60 * 60);
		return await db(resetTable).insert({ token, user_id, expires_at }).returning(['token']);
	} catch (error) {
		console.error('Error inserting record:', error);
		throw new Error('Error inserting record');
	}
}

// Select password reset token
export async function getPasswordReset(token: string) {
	try {
		return await db(resetTable).select('*').where('token', token).first();
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}

// Use password reset token
export async function usePasswordReset(token: string) {
	try {
		return await db(resetTable).update('is_used', true).where('token', token);
	} catch (error) {
		console.error('Error updating record:', error);
		throw new Error('Error updating all record');
	}
}