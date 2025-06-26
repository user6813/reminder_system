import { useState, useEffect, createContext, useContext, type ReactNode } from 'react'

const StoreContext = createContext<StoreType | undefined>(undefined)

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within a StoreProvider')
  return context
}

interface UserInfo {
  id: number | null
  username: string | null
  email: string | null
}

interface StoreType {
  isAuthenticated: boolean
  isLoggedIn: boolean
  user: UserInfo
  login: (token: string, user: UserInfo) => void
  logout: () => void
}

export function StoreProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<UserInfo>({ id: null, username: null, email: null })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userInfo = localStorage.getItem('user')
    setIsAuthenticated(!!token)
    setIsLoggedIn(!!token)
    if (userInfo) setUser(JSON.parse(userInfo))
  }, [])

  const login = (token: string, user: UserInfo) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setIsAuthenticated(true)
    setIsLoggedIn(true)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setIsLoggedIn(false)
    setUser({ id: null, username: null, email: null })
  }

  return (
    <StoreContext.Provider value={{ isAuthenticated, isLoggedIn, user, login, logout }}>
      {children}
    </StoreContext.Provider>
  )
}