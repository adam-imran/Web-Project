import { createContext, useContext, useState, useEffect } from 'react'
import { getMe, loginUser, logoutUser, registerUser } from '../services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMe()
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (credentials) => {
    const res = await loginUser(credentials)
    setUser(res.data.user)
    return res
  }

  const register = async (userData) => {
    const res = await registerUser(userData)
    setUser(res.data.user)
    return res
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
