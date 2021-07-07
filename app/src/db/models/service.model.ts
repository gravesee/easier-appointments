import sequelize from './config';
import { DataTypes, Model, Association, Optional } from 'sequelize';

export interface ServiceAttributes {
  id: number;
  name: string;
  duration: number;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, "id"> { };

export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public duration!: number;
  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

Service.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isPositive(value) {
        if (parseInt(value) < 0) {
          throw new Error('Only positive values are allowed!');
        }
      }
    }
  },
},
  {
    sequelize,
    tableName: "services"
  }
);
