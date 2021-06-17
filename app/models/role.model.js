const sequelize = require('../config/db.config');
const { DataTypes } = require('Sequelize');

const Role = sequelize.define("role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    }
});

module.exports = Role;