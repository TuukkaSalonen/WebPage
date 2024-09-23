import knex from 'knex';
import config from './knexfile';
import { up as upGeneral, down as downGeneral } from './migrations/20240913103931_general';

const db = knex(config);

export const initializeDb = async (): Promise<any> => {
	try {
		// Connection check
		await db.raw('SELECT 1');
		return db;
	} catch (error) {
		throw error;
	}
};

export async function createTables() {
	console.log('Creating tables...');
	try {
		await upGeneral(db);
	} catch (error) {
		console.error('Error running migration up:', error);
	}
}

export async function deleteTables() {
	console.log('Deleting tables...');
	await downGeneral(db);
}

export async function isConnectionClosed(): Promise<boolean> {
	try {
		await db.raw('SELECT 1');
		return false;
	} catch (error) {
		return true;
	}
}

export async function closeConnection(knex: any) {
	try {
		await knex.destroy();
	} catch (error) {
		console.log('Error closing database connection');
	}
}

export default db;