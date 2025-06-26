import { LoginResponse, LoginUser, RegisterUser } from "../types/user";
import { User } from "../models/user";
import { ResponseType } from "../types/global";
import { GenerateToken } from "../utils/jwt";

const RegisterFun = async ({ username, email, password }: RegisterUser): Promise<ResponseType<User>> => {
  const user = await User.create({ username, email, password })
  if (!user) {
    return {
      success: false,
      message: 'Failed to create user',
    }
  }
  return {
    success: true,
    message: 'User created successfully',
    data: user,
  }
}

const LoginFun = async ({ email, password }: LoginUser): Promise<ResponseType<LoginResponse>> => {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    return {
      success: false,
      message: 'User not found',
    }
  }
  if (user.password !== password) {
    return {
      success: false,
      message: 'Invalid password',
    }
  }
  const token = GenerateToken({ id: user.id })
  return {
    success: true,
    message: 'Login successful',
    data: { token },
  }
}

const LogoutFun = async (): Promise<ResponseType> => {
  return {
    success: true,
    message: 'Logout successful',
  }
}

export { RegisterFun, LoginFun, LogoutFun }
