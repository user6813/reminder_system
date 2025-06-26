import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StoreProvider } from './context/storeProvider'
import { useStore } from './context/storeProvider'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Reminders from './pages/Reminders'
import Header from './components/Header'
// import './App.css'

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useStore()
  console.log("isAuthenticated", isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <StoreProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reminders" element={<ProtectedRoute><Reminders /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/reminders" replace />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2500} />
      </Router>
    </StoreProvider>
  )
}

export default App
