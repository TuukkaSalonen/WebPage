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
				table.uuid('user_id').nullable().references('id').inTable('app.user').onDelete('CASCADE');
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
				table.string('email').unique().nullable();
				table.enum('role', ['user', 'admin']).defaultTo('user');
				table.timestamps(true, true);
			});
		}

		const tokenTableExists = await knex.schema.withSchema('app').hasTable('refresh_token');
		if (!tokenTableExists) {
			await knex.schema.withSchema('app').createTable('refresh_token', (table) => {
				table.increments('id').primary();
				table.string('token').unique().notNullable();
				table.uuid('user_id').notNullable().references('id').inTable('app.user').onDelete('CASCADE');
				table.timestamp('expires_at').notNullable();
				table.boolean('is_revoked').defaultTo(false);
				table.timestamp('created_at').defaultTo(knex.fn.now());
			});
			await knex.raw('CREATE INDEX idx_user ON refresh_token(user_id)');
			await knex.raw('CREATE INDEX idx_expires ON refresh_token(expires_at)');
			await knex.raw('CREATE INDEX idx_token ON refresh_token(token)');
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
