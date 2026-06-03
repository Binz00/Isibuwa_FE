import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin as apiLogin, adminLogout } from '../services/api'

const AuthContext = createContext(null)

const TOKEN_KEY = 'isibuwa_token'
const ADMIN_KEY = 'isibuwa_admin'

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [admin, setAdmin]   = useState(null)
  const [token, setToken]   = useState(null)
  const [loading, setLoading] = useState(true)

  // ── Rehydrate from localStorage on mount ──────────────────
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY)
    const storedAdmin = localStorage.getItem(ADMIN_KEY)

    if (storedToken && storedAdmin) {
      try {
        setToken(storedToken)
        setAdmin(JSON.parse(storedAdmin))
      } catch {
        // Corrupted data — clear it
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(ADMIN_KEY)
      }
    }

    setLoading(false)
  }, [])

  // ── Login ─────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const response = await apiLogin(email, password)
    const { token: newToken, admin: adminData } = response.data

    localStorage.setItem(TOKEN_KEY, newToken)
    localStorage.setItem(ADMIN_KEY, JSON.stringify(adminData))

    setToken(newToken)
    setAdmin(adminData)

    navigate('/admin/dashboard')
  }, [navigate])

  // ── Logout ────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await adminLogout()
    } catch {
      // Ignore — we always clear local state
    }

    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ADMIN_KEY)

    setToken(null)
    setAdmin(null)

    navigate('/admin/login')
  }, [navigate])

  const isAuthenticated = Boolean(token && admin)

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
