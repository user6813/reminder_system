import { useState, useEffect, createContext, useContext, type ReactNode } from 'react'

const StoreContext = createContext<StoreType | undefined>(undefined)

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within a StoreProvider')
  return context
}

interface StoreType {
  isAuthenticated: boolean
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
}

export function StoreProvider({ children }: { children: ReactNode }): React.ReactElement {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  
    useEffect(() => {
      const token = localStorage.getItem('token')
      setIsAuthenticated(!!token)
      setIsLoggedIn(!!token)
    }, [])
  
    const login = (token: string) => {
      localStorage.setItem('token', token)
      setIsAuthenticated(true)
      setIsLoggedIn(true)
    }
  
    const logout = () => {
      localStorage.removeItem('token')
      setIsAuthenticated(false)
      setIsLoggedIn(false)
    }
  
    return (
      <StoreContext.Provider value={{ isAuthenticated, isLoggedIn, login, logout }}>
        {children}
      </StoreContext.Provider>
    )
  }