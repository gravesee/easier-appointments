

export default {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
  test: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
  production: {},
}

