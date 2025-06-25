import { Request, Response } from 'express'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'

export const Register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body
  const user = await User.create({ username, email, password })
  res.status(201).send(user)
}

export const Login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' })
    return
  }
  if (user.password !== password) {
    res.status(401).json({ message: 'Invalid email or password' })
    return
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret')
  res.status(200).send({ token })
}

export const Logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send({ message: 'Logged out successfully' })
}