import knex from 'knex';
import config from './knexfile';
import { up as upGeneral, down as downGeneral } from './migrations/init';

const db = knex(config);

// Check if the database connection is successful and return the connection
export const initializeDb = async (retries = 5, delay = 2000): Promise<any> => {
    for (let i = 0; i < retries; i++) {
        try {
            // Connection check
            await db.raw('SELECT 1');
            console.log('Connected to database successfully.');
            return db;
        } catch (error) {
            console.error(`Database connection failed. Retry ${i + 1} of ${retries}.`, error);
            if (i < retries - 1) {
                await new Promise(res => setTimeout(res, delay));
            } else {
                throw new Error('Failed to connect to the database after multiple attempts.');
            }
        }
    }
};

// Create tables based on the migration files
export async function createTables() {
	console.log('Creating tables...');
	try {
		await upGeneral(db);
		console.log('Tables created');
	} catch (error) {
		console.error('Error running migration up:', error);
	}
}

// Delete tables based on the migration files
export async function deleteTables() {
	console.log('Deleting tables...');
	try {
		await downGeneral(db);
		console.log('Tables deleted');
	} catch (error) {
		console.error('Error running migration down:', error);
	}
}

// Check if the database connection is closed
export async function isConnectionClosed(): Promise<boolean> {
	try {
		await db.raw('SELECT 1');
		return false;
	} catch (error) {
		return true;
	}
}

// Close the database connection
export async function closeConnection(knex: any) {
	try {
		await knex.destroy();
	} catch (error) {
		console.log('Error closing database connection');
	}
}

export default db;