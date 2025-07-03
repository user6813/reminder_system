import { Router } from 'express'
import AuthMiddleware from '../utils/auth'
import { CreateReminder, DeleteReminder, GetReminder, GetReminderById, GetReminderByUserId, UpdateReminder } from '../controllers/reminder'

const router = Router()

router.get('/', AuthMiddleware, GetReminder)

router.get('/:id', AuthMiddleware, GetReminderById)

router.post('/', AuthMiddleware, CreateReminder)

router.put('/:id', AuthMiddleware, UpdateReminder)

router.delete('/:id', AuthMiddleware, DeleteReminder)

router.post('/user/:id', AuthMiddleware, GetReminderByUserId)

export default router