import db from '../dbConnection';

const table = 'app.general';

export async function selectAll() {
	return await db(table).select('*');
}

/*
export async function selectVisitors() {
	return await db(table).select('data').where('name', 'visitors').first();
}

export async function incrementVisitorCount() {
	return await db(table)
	  .where('name', 'visitors')
	  .increment('data', 1).update({updated_at: db.fn.now()});
}
*/

export async function incrementAndSelectVisitors() {
	await db(table)
	  .where('name', 'visitors')
	  .increment('data', 1)
	  .update({ updated_at: db.fn.now() });
  
	const result = await db(table)
	  .select('data')
	  .where('name', 'visitors')
	  .first();
  
	return result;
  }