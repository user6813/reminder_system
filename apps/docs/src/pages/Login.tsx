import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth'
import { useApi } from '../hooks/useApi'
import { useStore } from '../context/storeProvider'
import { toast } from 'react-toastify'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [trigger, setTrigger] = useState(0)
  const [formData, setFormData] = useState<{email: string, password: string} | null>(null)
  const navigate = useNavigate()
  const { login: doLogin } = useStore()

  const { loading, error } = useApi(
    async () => {
      if (!formData) return null
      const res = await login(formData.email, formData.password)
      if (res.token) {
        console.log("res.token", res.token)
        doLogin(res.token)
        toast.success('Login successful!')
        setTimeout(() => navigate('/reminders'), 1000)
      }
      return res
    },
    [trigger]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData({ email, password })
    setTrigger(t => t + 1)
  }

  if (error) toast.error(error)

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  )
} 