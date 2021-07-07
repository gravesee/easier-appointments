import { Sequelize, Dialect } from "sequelize";

const config = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Sh3ldon$", 
  DB: "EasierAppointments",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect as Dialect,
  pool: config.pool,
});

export default sequelize;
