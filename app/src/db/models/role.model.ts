import sequelize from './config';
import { DataTypes, Model, Association, Optional } from 'sequelize';
import { User } from './user.model';

export const ROLES = ["user", "admin", "moderator"];

export interface RoleAttributes {
  id: number;
  name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> { };

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public static associations: {
    roles: Association<Role, User>;
  }
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
  {
    sequelize,
    tableName: "roles"
  }
);
