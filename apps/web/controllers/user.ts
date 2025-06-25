import { Request, Response } from 'express'
import { User } from '../models/user'

export const GetUser = async (req: Request, res: Response): Promise<void> => {
  const users = await User.findAll()
  if (!users.length) {
    res.status(404).json({ message: 'No users found' })
    return
  }
  res.status(200).send(users)
}

export const GetUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const user = await User.findByPk(id)
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }
  res.status(200).send(user)
}

export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { username, email } = req.body
  const user = await User.findByPk(id)
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }
  await user.update({ username, email })
  res.status(200).send(user)
}

export const DeleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const user = await User.findByPk(id)
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }
  await user.destroy()
  res.status(200).send({ message: 'User deleted successfully' })
}