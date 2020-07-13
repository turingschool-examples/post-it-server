// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection:  'postgres://localhost/posts',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'posts',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'posts',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};