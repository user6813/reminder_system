const BASE_URL = 'http://localhost:3000/api' // Update if needed

export const API = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/register`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REMINDERS: `${BASE_URL}/reminder`,
  USER: `${BASE_URL}/user`,
} 