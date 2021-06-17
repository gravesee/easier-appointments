const sequelize = require("../config/db.config");

const User = require("./user.model");
const Role = require("./role.model");

db = {
  sequelize: sequelize,
  user: User,
  role: Role,
};

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

module.exports = db;
