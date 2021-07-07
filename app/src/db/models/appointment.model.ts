import sequelize from './config';
import { DataTypes, Model, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, Optional, literal } from 'sequelize';
import { User, UserAttributes } from './user.model';


//export const ROLES = ["user", "admin", "moderator"];

export interface AppointmentAttributes {
  id: number;
  book_datetime: number,
  start_datetime: number,
  end_datetime: number,
  location: string,
  notes: string,
  hash: string,
  is_unavailable: boolean,
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, "id" | "book_datetime" | "start_datetime" | "end_datetime" | "location" | "notes" | "hash"> { };

export class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttributes> implements AppointmentAttributes {
  public id!: number;
  public book_datetime!: number;
  public start_datetime!: number;
  public end_datetime!: number;
  public location!: string;
  public notes!: string;
  public hash!: string;
  public is_unavailable!: boolean;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public getUsers!: HasManyGetAssociationsMixin<User>;
  public setUsers!: HasManySetAssociationsMixin<User, UserAttributes['id']>;

  public async getUsersByRole(role: string): Promise<Array<User>> {
    const users = await this.getUsers();
    return users.filter(async user => (await user.getRoles()).filter(_ => _.name === role));
  }

}

Appointment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  book_datetime: {
    type: DataTypes.TIME,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  },
  start_datetime: {
    type: DataTypes.TIME,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  },
  end_datetime: {
    type: DataTypes.TIME,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  hash: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_unavailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
},
  {
    sequelize,
    tableName: "appointments"
  }
);
