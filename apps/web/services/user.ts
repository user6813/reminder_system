import { User } from '../models/user';
import { ResponseType } from '../types/global';

interface UpdateUserInput {
  username?: string;
  email?: string;
}

const GetAllUsers = async (): Promise<ResponseType<User[]>> => {
  const users = await User.findAll();
  if (!users.length) {
    return { success: false, message: 'No users found' };
  }
  return { success: true, message: 'Users fetched', data: users };
};

const GetUserById = async (id: number): Promise<ResponseType<User>> => {
  const user = await User.findByPk(id);
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  return { success: true, message: 'User fetched', data: user };
};

const UpdateUserFun = async (id: number, update: UpdateUserInput): Promise<ResponseType<User>> => {
  const user = await User.findByPk(id);
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  await user.update(update);
  return { success: true, message: 'User updated', data: user };
};

const DeleteUserFun = async (id: number): Promise<ResponseType> => {
  const user = await User.findByPk(id);
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  await user.destroy();
  return { success: true, message: 'User deleted' };
};

export { GetAllUsers, GetUserById, UpdateUserFun, DeleteUserFun }; 