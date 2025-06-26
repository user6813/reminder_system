import { Reminder } from '../models/reminder';
import { ResponseType } from '../types/global';

interface CreateReminderInput {
  title: string;
  description: string;
  dateTime: Date;
  userId: number;
}

const GetAllReminders = async (): Promise<ResponseType<Reminder[]>> => {
  const reminders = await Reminder.findAll();
  if (!reminders.length) {
    return { success: false, message: 'No reminders found' };
  }
  return { success: true, message: 'Reminders fetched', data: reminders };
};

const GetReminderById = async (id: number): Promise<ResponseType<Reminder>> => {
  const reminder = await Reminder.findByPk(id);
  if (!reminder) {
    return { success: false, message: 'Reminder not found' };
  }
  return { success: true, message: 'Reminder fetched', data: reminder };
};

const CreateReminderFun = async (input: CreateReminderInput): Promise<ResponseType<Reminder>> => {
  const reminder = await Reminder.create({ ...input, reminded: false });
  if (!reminder) {
    return { success: false, message: 'Failed to create reminder' };
  }
  return { success: true, message: 'Reminder created', data: reminder };
};

const UpdateReminderFun = async (id: number, update: Partial<CreateReminderInput>): Promise<ResponseType<Reminder>> => {
  const reminder = await Reminder.findByPk(id);
  if (!reminder) {
    return { success: false, message: 'Reminder not found' };
  }
  await reminder.update(update);
  return { success: true, message: 'Reminder updated', data: reminder };
};

const DeleteReminderFun = async (id: number): Promise<ResponseType> => {
  const reminder = await Reminder.findByPk(id);
  if (!reminder) {
    return { success: false, message: 'Reminder not found' };
  }
  await reminder.destroy();
  return { success: true, message: 'Reminder deleted' };
};

const GetRemindersByUserId = async (userId: number): Promise<ResponseType<Reminder[]>> => {
  const reminders = await Reminder.findAll({ where: { userId } });
  if (!reminders.length) {
    return { success: false, message: 'No reminders found for user' };
  }
  return { success: true, message: 'Reminders fetched', data: reminders };
};

export { GetAllReminders, GetReminderById, CreateReminderFun, UpdateReminderFun, DeleteReminderFun, GetRemindersByUserId };
