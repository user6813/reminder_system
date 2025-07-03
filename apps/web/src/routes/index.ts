import { Router } from 'express'
import authRoutes from './auth'
import userRoutes from './user'
import reminderRoutes from './reminder'

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/reminder', reminderRoutes)

export default router