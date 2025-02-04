import db from '../dbConnection';

const userTable = 'app.user';

// Get user by username. Case insensitive, not used in frontend.
export async function getUserByUsername(username: string) {
	try {
		return await db(userTable).select('*').whereRaw('LOWER(username) = ?', [username.toLowerCase()]).first();
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}

// Get user password by id. Only used in backend for authentication check.
export async function getUserPasswordById(id: string) {
	try {
		const user = await db(userTable).select('password').where('id', id).first();
		return user.password;
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}

// Get user by id excluding password
export async function getUser(id: string) {
	try {
		return await db(userTable).select('id', 'username', 'email', 'created_at', 'role').where('id', id).first();
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}

// Get user by email. Case insensitive.
export async function getUserByEmail(email: string) {
	try {
		return await db(userTable).select('id').whereRaw('LOWER(email) = ?', [email.toLowerCase()]).first();
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}

// Get all users
export async function getUsers() {
	try {
		return await db(userTable).select('id', 'username', 'email', 'role', 'created_at', 'updated_at');
	} catch (error) {
		console.error('Error selecting all records:', error);
		throw new Error('Error selecting all records');
	}
}

// Create user
export async function createUser(username: string, password: string, email: string) {
	try {
		const [insertedRecord] = await db(userTable).insert({ username, password, email }).returning(['id', 'username']);

		return insertedRecord;
	} catch (error) {
		console.error('Error creating user:', error);
		throw new Error('Error creating user');
	}
}

// Update user email by id
export const updateUserEmail = async (id: string, email: string) => {
	try {
		return await db(userTable)
			.where('id', id)
			.update({ email })
			.returning(['email'])
			.then((rows) => rows[0]);
	} catch (error) {
		console.error('Error updating user email:', error);
		throw new Error('Error updating user email');
	}
};

// Update user password by id
export const updateUserPassword = async (id: string, password: string) => {
	try {
		return await db(userTable).where('id', id).update({ password }).returning(['username']);
	} catch (error) {
		console.error('Error updating user password:', error);
		throw new Error('Error updating user password');
	}
};

// Update user password by id
export const updateUsername = async (id: string, username: string) => {
	try {
		return await db(userTable)
			.where('id', id)
			.update({ username })
			.returning(['username'])
			.then((rows) => rows[0]);
	} catch (error) {
		console.error('Error updating username:', error);
		throw new Error('Error updating username');
	}
};

// Update user role by id
export const updateUserRole = async (id: string, role: string) => {
	try {
		return await db(userTable).where('id', id).update({ role }).returning(['id', 'role']).first();
	} catch (error) {
		console.error('Error updating user username:', error);
		throw new Error('Error updating user username');
	}
};

// Set user email to null by id
export const deleteUserEmail = async (id: string) => {
	try {
		return await db(userTable).where('id', id).update({ email: null }).returning(['id']).first();
	} catch (error) {
		console.error('Error deleting user email:', error);
		throw new Error('Error deleting user email');
	}
};

// Delete user by id
export const deleteUser = async (id: string) => {
	try {
		return await db(userTable).where('id', id).del();
	}
	catch (error) {
		console.error('Error deleting user:', error);
		throw new Error('Error deleting user');
	}
};