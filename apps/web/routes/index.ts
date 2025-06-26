import { Router } from 'express'
import authRoutes from './auth'
import userRoutes from './user'
import reminderRoutes from './reminder'

const router = Router()

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/reminder', reminderRoutes)

export default router