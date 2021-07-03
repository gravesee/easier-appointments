import sequelize from '../config/db.config';
import { DataTypes } from 'sequelize';

export const Role = sequelize.define("role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    }
});