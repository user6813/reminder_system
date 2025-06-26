import { Request, Response } from 'express'
import { LoginFun, LogoutFun, RegisterFun } from '../services/auth'

export const Register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body
  const response = await RegisterFun({ username, email, password })
  if (response.success) {
    res.status(201).send(response.data)
  } else {
    res.status(400).send(response.message)
  }
}

export const Login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  const response = await LoginFun({ email, password })
  if (response.success) {
    res.status(200).send(response.data)
  } else {
    res.status(400).send(response.message)
  }
}

export const Logout = async (req: Request, res: Response): Promise<void> => {
  const response = await LogoutFun()
  if (response.success) {
    res.status(200).send(response.data)
  } else {
    res.status(400).send(response.message)
  }
}