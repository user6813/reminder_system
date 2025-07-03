import { Request, Response } from 'express'
import { GetAllReminders, GetReminderById as ServiceGetReminderById, CreateReminderFun, UpdateReminderFun, DeleteReminderFun, GetRemindersByUserId } from '../services/reminder'

export const GetReminder = async (req: Request, res: Response): Promise<void> => {
  const response = await GetAllReminders();
  if (response.success) {
    res.status(200).send(response.data);
  } else {
    res.status(404).json({ message: response.message });
  }
}

export const GetReminderById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const response = await ServiceGetReminderById(Number(id));
  if (response.success) {
    res.status(200).send(response.data);
  } else {
    res.status(404).json({ message: response.message });
  }
}

export const CreateReminder = async (req: Request, res: Response): Promise<void> => {
  const { title, description, dateTime, userId } = req.body;
  const response = await CreateReminderFun({ title, description, dateTime, userId });
  if (response.success) {
    res.status(201).send(response.data);
  } else {
    res.status(400).json({ message: response.message });
  }
}

export const UpdateReminder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, dateTime } = req.body;
  const response = await UpdateReminderFun(Number(id), { title, description, dateTime });
  if (response.success) {
    res.status(200).send(response.data);
  } else {
    res.status(404).json({ message: response.message });
  }
}

export const DeleteReminder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const response = await DeleteReminderFun(Number(id));
  if (response.success) {
    res.status(200).send({ message: response.message });
  } else {
    res.status(404).json({ message: response.message });
  }
}

export const GetReminderByUserId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const response = await GetRemindersByUserId(Number(id));
  if (response.success) {
    res.status(200).send(response.data);
  } else {
    res.status(404).json({ message: response.message });
  }
}