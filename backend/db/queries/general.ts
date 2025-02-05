import db from '../dbConnection';

const generalTable = 'app.general';

// Select all records from general table
export async function selectAll() {
    try {
        return await db(generalTable).select('*');
    } catch (error) {
        console.error('Error selecting all records:', error);
        throw new Error(`DB error - Error selecting all records ${error}`);
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
        throw new Error(`DB error - Error incrementing visitor count: ${error}`);
    }
}

// Select visitor count
export async function selectVisitors() {
    try {
        return await db(generalTable).select('data').where('name', 'visitors').first();
    } catch (error) {
        console.error('Error selecting visitors:', error);
        throw new Error(`DB error - Error selecting visitors: ${error}`);
    }
}