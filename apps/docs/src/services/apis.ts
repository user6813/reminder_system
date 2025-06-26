const BASE_URL = import.meta.env.VITE_API_URL // Update if needed

const API_URL = import.meta.env.API_URL || `${BASE_URL}/api`

console.log("API_URL", API_URL)

export const API = {
  LOGIN: `${API_URL}/auth/login`,
  SIGNUP: `${API_URL}/auth/register`,
  LOGOUT: `${API_URL}/auth/logout`,
  REMINDERS: `${API_URL}/reminder`,
  USER: `${API_URL}/user`,
} 