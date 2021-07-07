import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || 'development';
 
import _config from './../config/config';

//@ts-ignore
const config = _config[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
