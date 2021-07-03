import sequelize from "../config/db.config";

import {User} from "./user.model";
import {Role} from "./role.model";

export const db = {
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

export type IDatabase = typeof db;