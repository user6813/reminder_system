import { Router } from 'express'
import { Login, Logout, Register } from '../controllers/auth'
import AuthMiddleware from '../utils/auth'

const router = Router()

router.post('/register', AuthMiddleware, Register)

router.post('/login', AuthMiddleware, Login)

router.post('/logout', AuthMiddleware, Logout)

export default router