import db from '../dbConnection';
const snakeTable = 'app.snake';

// Get top 10 scores from snake table
export async function getTopScores() {
	try {
		return await db(snakeTable).select('name', 'score').orderBy('score', 'desc').limit(10);
	} catch (error) {
		console.error('Error getting top scores:', error);
		throw new Error(`DB error - Error getting top scores: ${error}`);
		
	}
}

// Set score in snake table
export async function setScore(name: string, id: string | null, score: number) {
	try {
		const [insertedRecord] = await db(snakeTable).insert({ user_id: id, name, score }).returning(['name', 'score']);

		return insertedRecord;
	} catch (error) {
		console.error('Error setting score:', error);
		throw new Error(`DB error - Error setting score: ${error}`);
	}
}

// Get scores by id limited to top 25 scores
export async function getScoresById(id: string) {
	try {
		const subquery = db(snakeTable)
			.select('name', 'score', 'created_at', 'user_id', db.raw(`RANK() OVER (ORDER BY score DESC) as rank`));
		return await db(snakeTable).select('*').from(subquery).where('user_id', id).orderBy('score', 'desc').limit(25);
	} catch (error) {
		console.error('Error getting scores by id:', error);
		throw new Error(`DB error - Error getting scores by id: ${error}`);
	}
}
