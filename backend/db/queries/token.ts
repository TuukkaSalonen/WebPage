import db from '../dbConnection';

const tokenTable = 'app.refresh_token';

// Clear expired refresh tokens
export async function clearExpiredRefreshTokens() {
	try {
		return await db(tokenTable).delete().where('expires_at', '<', new Date(Date.now()));
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}

// Insert refresh token
export async function insertRefreshToken(user_id: string, token: string) {
	try {
        const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
		return await db(tokenTable).insert({ token, user_id, expires_at }).returning(['token']);
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
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
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}