import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	try {
		await knex.schema.createSchemaIfNotExists('app');

		const generalTableExists = await knex.schema.withSchema('app').hasTable('general');
		if (!generalTableExists) {
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
				updated_at: knex.fn.now(),
			});
		}

		const snakeTableExists = await knex.schema.withSchema('app').hasTable('snake');
		if (!snakeTableExists) {
			await knex.schema.withSchema('app').createTable('snake', (table) => {
				table.increments('id').primary();
				table.string('name');
				table.integer('score');
				table.timestamps(true, true);
			});
		}

		await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

		const userTableExists = await knex.schema.withSchema('app').hasTable('user');
		if (!userTableExists) {
			await knex.schema.withSchema('app').createTable('user', (table) => {
				table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
				table.string('username').unique();
				table.string('password');
				table.string('email').nullable();
				table.enum('role', ['user', 'admin']).defaultTo('user');
				table.timestamps(true, true);
			});
		}
	} catch (error) {
		console.error('Error running migration up:', error);
		throw error; // Re-throw the error to ensure the migration fails
	}
}

export async function down(knex: Knex): Promise<void> {
	try {
		await knex.schema.withSchema('app').dropTableIfExists('general');
		await knex.schema.withSchema('app').dropTableIfExists('snake');
		await knex.schema.withSchema('app').dropTableIfExists('user');
	} catch (error) {
		console.error('Error running migration down:', error);
		throw error; // Re-throw the error to ensure the migration fails
	}
}
