import { Request, Response } from 'express'
import { GetAllUsers, GetUserById as ServiceGetUserById, UpdateUserFun, DeleteUserFun } from '../services/user'

export const GetUser = async (req: Request, res: Response): Promise<void> => {
  const response = await GetAllUsers();
  if (response.success) {
    res.status(200).send(response.data);
  } else {
    res.status(404).json({ message: response.message });
  }
}

export const GetUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const response = await ServiceGetUserById(Number(id));
  if (response.success) {
    res.status(200).send(response.data);
  } else {
    res.status(404).json({ message: response.message });
  }
}

export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { username, email } = req.body;
  const response = await UpdateUserFun(Number(id), { username, email });
  if (response.success) {
    res.status(200).send(response.data);
  } else {
    res.status(404).json({ message: response.message });
  }
}

export const DeleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const response = await DeleteUserFun(Number(id));
  if (response.success) {
    res.status(200).send({ message: response.message });
  } else {
    res.status(404).json({ message: response.message });
  }
}