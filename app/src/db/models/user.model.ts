import sequelize from './config';
import { DataTypes, Model, HasManyGetAssociationsMixin, Association, Optional, HasManySetAssociationsMixin } from 'sequelize';
import { Role, RoleAttributes } from './role.model';

interface UserAttributes {
  id: number;
  username: string,
  email: string,
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { };

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  // timestamps
  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  // associations
  public getRoles!: HasManyGetAssociationsMixin<Role>;
  public setRoles!: HasManySetAssociationsMixin<Role, RoleAttributes['id']>;

  // // inclusions
  public readonly roles?: Role[];

  public static associations: {
    roles: Association<User, Role>;
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
  {
    sequelize,
    tableName: "users"
  }
);
