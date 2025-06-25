import { API } from './apis'

export async function login(email: string, password: string) {
  const res = await fetch(API.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export async function signup(username: string, email: string, password: string) {
  const res = await fetch(API.SIGNUP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  if (!res.ok) throw new Error('Signup failed')
  return res.json()
}

export async function logout(token: string) {
  const res = await fetch(API.LOGOUT, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Logout failed')
  return res.json()
} 