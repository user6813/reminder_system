import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './config/sequelize'
import routes from './routes'
import morgan from 'morgan'

dotenv.config()

const PORT = process.env.BACKEND_PORT || 5000

const app = express()

db.connect({ force: true })

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})