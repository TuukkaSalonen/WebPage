import { app } from './app/index.js';
import { initializeDb, createTables, isConnectionClosed } from './db/dbConnection.js';
import https from 'https';
import fs from 'fs';
import path from 'path';

const env = process.env.ENV;
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
		if (env === 'production') {
			const sslOptions = {
            	key: fs.readFileSync(path.resolve('/etc/ssl/privkey.pem')),
            	cert: fs.readFileSync(path.resolve('/etc/ssl/fullchain.pem')),
        	};
			https.createServer(sslOptions, app).listen(port, () => {
				console.log(`Server is running on port ${port}`);
			});
		}
		else {
			app.listen(port, () => {
				console.log(`Backend server is running on port ${port}.`);
			});
		}
	} catch (error) {
		console.error('Error initializing server:', error);
	}
}

startServer();
