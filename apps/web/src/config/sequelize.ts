import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL || `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB}`

const sequelize = new Sequelize(DATABASE_URL,
  {
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