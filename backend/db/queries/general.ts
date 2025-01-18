import db from '../dbConnection';

const generalTable = 'app.general';
const snakeTable = 'app.snake';

// Select all records from general table
export async function selectAll() {
    try {
        return await db(generalTable).select('*');
    } catch (error) {
        console.error('Error selecting all records:', error);
        throw new Error('Error selecting all records');
    }
}

// Increment visitor count
export async function incrementVisitor() {
    try {
        await db(generalTable)
            .where('name', 'visitors')
            .increment('data', 1)
            .update({ updated_at: db.fn.now() });
    } catch (error) {
        console.error('Error incrementing visitor count:', error);
        throw new Error('Error incrementing visitor count');
    }
}

// Select visitor count
export async function selectVisitors() {
    try {
        return await db(generalTable).select('data').where('name', 'visitors').first();
    } catch (error) {
        console.error('Error selecting visitors:', error);
        throw new Error('Error selecting visitors');
    }
}

// Get top 10 scores from snake table
export async function getTopScores() {
    try {
        return await db(snakeTable).select('*').orderBy('score', 'desc').limit(10);
    } catch (error) {
        console.error('Error getting top scores:', error);
        throw new Error('Error getting top scores');
    }
}

// Set score in snake table
export async function setScore(name: string, score: number) {
    try {
        const [insertedRecord] = await db(snakeTable)
            .insert({ name, score })
            .returning(['name', 'score']); 

        return insertedRecord;
    } catch (error) {
        console.error('Error setting score:', error);
        throw new Error('Error setting score');
    }
}