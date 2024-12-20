const env = process.env;

const devConfig = {
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

// let prodConfig = {};

// if (env.ENV === 'production') {
// 	prodConfig = {
// 		client: 'pg',
// 		connection: {
// 			host: env.DB_HOST || 'database',
// 			port: parseInt(env.DB_PORT || '5432'),
// 			user: env.DB_USER,
// 			password: env.DB_PASSWORD,
// 			database: env.DB,
// 			charset: 'utf8',
// 			ssl: {
// 				rejectUnauthorized: false,
// 				key: fs.readFileSync(path.resolve('/etc/ssl/privkey.pem')).toString(),
// 				cert: fs.readFileSync(path.resolve('/etc/ssl/fullchain.pem')).toString(),
// 			},
// 		},
// 		pool: {
// 			min: 2,
// 			max: 10,
// 		},
// 		migrations: {
// 			directory: './migrations', // Directory for migration files
// 			tableName: 'knex_migrations', // Table to keep track of migrations
// 		},
// 		seeds: {
// 			directory: './seeds', // Directory for seed files
// 		},
// 	};
// }

 const config = /*env.ENV === 'production' ? prodConfig :*/ devConfig;

export default config;
