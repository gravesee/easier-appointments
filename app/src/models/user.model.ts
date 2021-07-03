import sequelize from '../config/db.config';
import { DataTypes } from 'sequelize';

export const User = sequelize.define("user", {
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