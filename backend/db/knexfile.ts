const env = process.env;

const config = {
	client: 'pg',
	connection: {
		host: 'database',
		port: parseInt(env.DB_PORT || '5432'),
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		database: env.DB,
		charset: 'utf8',
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		directory: './migrations', // Directory for migration files
		tableName: 'knex_migrations', // Table to keep track of migrations
	},
	seeds: {
		directory: './seeds', // Directory for seed files
	},
};

export default config;
