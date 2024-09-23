import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createSchemaIfNotExists('app');
    
    const tableExists = await knex.schema.withSchema('app').hasTable('general');
    if (!tableExists) {
      await knex.schema.withSchema('app').createTable('general', (table) => {
        table.increments('id').primary();
        table.string('name').unique();
        table.integer('data');
        table.timestamps(true, true);
      });
      await knex('app.general').insert({
        name: 'visitors',
        data: 0,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      })
    }
  }
  
export async function down(knex: Knex): Promise<void> {
	return knex.schema.withSchema('app').dropTableIfExists('app.general');
}
