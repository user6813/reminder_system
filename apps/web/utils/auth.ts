import { Request, Response, NextFunction, RequestHandler } from 'express'
import { CompareToken } from './jwt'

const AuthMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  const decoded = CompareToken(token)
  if (!decoded) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  next()
}

export default AuthMiddleware

