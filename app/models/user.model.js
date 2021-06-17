const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
