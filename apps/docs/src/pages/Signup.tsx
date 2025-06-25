import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/auth'
import { useApi } from '../hooks/useApi'
import { toast } from 'react-toastify'
import './Auth.css'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [trigger, setTrigger] = useState(0)
  const [formData, setFormData] = useState<{username: string, email: string, password: string} | null>(null)
  const navigate = useNavigate()

  const { loading, error } = useApi(
    async () => {
      if (!formData) return null
      const res = await signup(formData.username, formData.email, formData.password)
      toast.success('Signup successful! Please login.')
      setTimeout(() => navigate('/login'), 1500)
      return res
    },
    [trigger]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData({ username, email, password })
    setTrigger(t => t + 1)
  }

  if (error) toast.error(error)

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Username
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
      </form>
    </div>
  )
} 