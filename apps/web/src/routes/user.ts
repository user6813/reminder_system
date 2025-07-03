import { Router } from 'express'
import AuthMiddleware from '../utils/auth'
import { DeleteUser, GetUser, GetUserById, UpdateUser } from '../controllers/user'

const router = Router()

router.get('/', AuthMiddleware, GetUser)

router.get('/:id', AuthMiddleware, GetUserById)

router.put('/:id', AuthMiddleware, UpdateUser)

router.delete('/:id', AuthMiddleware, DeleteUser)

export default router