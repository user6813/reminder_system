import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StoreProvider } from './context/storeProvider'
import { useStore } from './context/storeProvider'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Reminders from './pages/Reminders'
// import './App.css'

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <StoreProvider>
      <Router>
        <nav style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/reminders">Reminders</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reminders" element={<ProtectedRoute><Reminders /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2500} />
      </Router>
    </StoreProvider>
  )
}

export default App
