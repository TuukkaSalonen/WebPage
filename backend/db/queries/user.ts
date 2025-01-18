import db from '../dbConnection';

const userTable = 'app.user';

// Get user by username. Case insensitive
export async function getUser(username: string) {
	try {
		return db(userTable).select().whereRaw('LOWER(username) = ?', [username.toLowerCase()]).first();
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}

// Get all users
export async function getUsers() {
	try {
		return await db(userTable).select('*');
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}

// Create user
export async function createUser(username: string, password: string, email: string) {
	try {
		const [insertedRecord] = await db(userTable)
			.insert({ username, password, email }) // , email
			.returning(['username']); // , 'role'

		return insertedRecord;
	} catch (error) {
		console.error('Error creating user:', error);
		throw new Error('Error creating user');
	}
}
