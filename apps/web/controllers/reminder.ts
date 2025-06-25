import { Request, Response } from 'express'
import { Reminder } from '../models/reminder'
import { User } from '../models/user'

export const GetReminder = async (req: Request, res: Response): Promise<void> => {
  const reminders = await Reminder.findAll()
  if (!reminders.length) {
    res.status(404).json({ message: 'No reminders found' })
    return
  }
  res.status(200).send(reminders)
}

export const GetReminderById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const reminder = await Reminder.findByPk(id)
  if (!reminder) {
    res.status(404).json({ message: 'Reminder not found' })
    return
  }
  res.status(200).send(reminder)
}

export const CreateReminder = async (req: Request, res: Response): Promise<void> => {
  const { title, description, dateTime, userId } = req.body
  const reminder = await Reminder.create({ title, description, dateTime, userId })
  res.status(201).send(reminder)
}

export const UpdateReminder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { title, description, dateTime } = req.body
  const reminder = await Reminder.findByPk(id)
  if (!reminder) {
    res.status(404).json({ message: 'Reminder not found' })
    return
  }
  await reminder.update({ title, description, dateTime })
  res.status(200).send(reminder)
}

export const DeleteReminder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const reminder = await Reminder.findByPk(id)
  if (!reminder) {
    res.status(404).json({ message: 'Reminder not found' })
    return
  }
  await reminder.destroy()
  res.status(200).send({ message: 'Reminder deleted successfully' })
}

export const GetReminderByUserId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const reminders = await Reminder.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'email'],
        where: { id: id },
      },
    ],
  })
  if (!reminders.length) {
    res.status(404).json({ message: 'No reminders found' })
    return
  }
  res.status(200).send(reminders)
}