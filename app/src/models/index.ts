import sequelize from "../config/db.config";

// import { User } from "./user.model";
// import { Role } from "./role.model";

import { User, Role } from "./user.role.model";

User.belongsToMany(Role, { through: "user_roles" });
Role.belongsToMany(User, { through: "user_roles" });

export const db = {
  sequelize: sequelize,
  user: User,
  role: Role,
  ROLES: ["user", "admin", "moderator"],
};

export type IDatabase = typeof db;
