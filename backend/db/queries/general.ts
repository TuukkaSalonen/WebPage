import db from '../dbConnection';

const generalTable = 'app.general'; // Siirrä constants fileen
const snakeTable = 'app.snake';

export async function selectAll() {
	return await db(generalTable).select('*');
}

export async function incrementAndSelectVisitors() {
	await db(generalTable)
		.where('name', 'visitors')
		.increment('data', 1)
		.update({ updated_at: db.fn.now() });

	const result = await db(generalTable).select('data').where('name', 'visitors').first();

	return result;
}

export async function getTopScores() {
	return await db(snakeTable).select('*').orderBy('score', 'desc').limit(10);
}

export async function setScore(name: string, score: number) {
	await db(snakeTable).insert({ name, score });
}
