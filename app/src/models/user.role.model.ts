import sequelize from '../config/db.config';
import { DataTypes, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, Association, Optional, HasManySetAssociationsMixin } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string,
  email: string,
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { };

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

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

interface RoleAttributes {
  id: number;
  name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> { };

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
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

export { Role, User };