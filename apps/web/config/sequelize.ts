import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'reminder_db',
  process.env.POSTGRES_USER || 'root',
  process.env.POSTGRES_PASSWORD || 'root',
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  }
)

function connect({ force = false }: { force?: boolean } = {}) {
  sequelize.sync({ force }).then(() => {
    console.log('Connection has been established successfully.')
  }).catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
}

export default {
    sequelize,
    connect
} 