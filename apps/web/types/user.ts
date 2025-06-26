export interface RegisterUser {
  username: string
  email: string
  password: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}