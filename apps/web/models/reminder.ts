import { DataTypes, Model, Optional } from 'sequelize'
import db from '../config/sequelize'

interface ReminderAttributes {
  id?: number
  title: string
  description: string
  dateTime: Date
  userId: number
  reminded: boolean
  createdAt?: Date
  updatedAt?: Date
}

interface ReminderCreationAttributes extends Optional<ReminderAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Reminder extends Model<ReminderAttributes, ReminderCreationAttributes> implements ReminderAttributes {
  public id!: number
  public title!: string
  public description!: string
  public dateTime!: Date
  public userId!: number
  public reminded!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Reminder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    reminded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'reminders',
    timestamps: true,
  }
)

export default Reminder
