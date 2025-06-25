import { API } from './apis'

export async function getReminders(token: string) {
  const res = await fetch(API.REMINDERS, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch reminders')
  return res.json()
}

export async function addReminder(token: string, data: { title: string, description: string, dateTime: string }) {
  const res = await fetch(API.REMINDERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to add reminder')
  return res.json()
}

export async function updateReminder(token: string, id: number, data: { title: string, description: string, dateTime: string }) {
  const res = await fetch(`${API.REMINDERS}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update reminder')
  return res.json()
}

export async function deleteReminder(token: string, id: number) {
  const res = await fetch(`${API.REMINDERS}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to delete reminder')
  return res.json()
} 