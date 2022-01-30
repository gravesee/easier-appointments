require("dotenv").config();

module.exports = {
  host: "localhost",
  port: process.env.PORT,
  public: "../public/",
  paginate: {
    default: 10,
    max: 50,
  },
  authentication: {
    entity: "user",
    service: "users",
    secret: process.env.SECRET,
    authStrategies: ["jwt", "local"],
    apiKey: process.env.API_KEY,
    jwtOptions: {
      header: {
        typ: "access",
      },
      audience: "https://yourdomain.com",
      issuer: "feathers",
      algorithm: "HS256",
      expiresIn: "1d",
    },
    local: {
      usernameField: "email",
      passwordField: "password",
    },
    apiKey: {
      allowedKeys: [`${process.env.API_KEY}`],
      header: "x-access-token",
    },
  },
  postgres: {
    connection: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=${process.env.DB_SSLMODE}`,
    client: "pg",
    migrations: {
      tableName: "knex_migrations",
      directory: "src/migrations",
    },
    seeds: {
      directory: "src/seeders",
    },
    debug: true,
  },
};
