import { Role } from './role.model'
import { User } from './user.model'

Role.belongsToMany(User, { through: "user_roles" });
User.belongsToMany(Role, { through: "user_roles" });

export { Role, User };