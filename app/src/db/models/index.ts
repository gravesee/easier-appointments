import { User } from './user.model'
import { Role } from './role.model'
import { Appointment } from './appointment.model'

// Role.belongsToMany(User, { through: "user_roles" });
User.belongsToMany(Role, { through: "user_roles" });

User.belongsToMany(Appointment, {through: "user_appointments"});
Appointment.belongsToMany(User, {through: "user_appointments"});

// Appointment.hasMany(User);

export { Role, User, Appointment }; 