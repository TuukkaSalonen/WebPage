import {app} from './app/index.js';
import { initializeDb, createTables, isConnectionClosed } from './db/dbConnection.js';

const port = process.env.PORT;

async function startServer() {
	try {
		// Connect to the database
		await initializeDb();
		console.log('Connected to database successfully.');

		// Create tables (if needed)
		await createTables();

		// Check if the connection is still open
		const closed = await isConnectionClosed();
		if (closed) {
			console.error('Database connection is closed.');
			return;
		}

		// Start the server
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	} catch (error) {
		console.error('Error initializing server:', error);
	}
}

startServer();
