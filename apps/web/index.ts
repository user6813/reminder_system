import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './config/sequelize'
import routes from './routes'

dotenv.config()

const app = express()

db.connect()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})