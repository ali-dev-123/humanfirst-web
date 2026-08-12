import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type User = {
  id: number
  name: string
  email: string
  role: string
  createdAt?: string
  updatedAt?: string
}

type AuthContextValue = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<User>
  register: (name: string, email: string, password: string) => Promise<User>
  googleLogin: (credential: string) => Promise<User>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'humanfirst_auth'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://humanfirst-backend.vercel.app'

function getStoredAuth() {
  if (typeof window === 'undefined') return null

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as { token: string; user: User }
  } catch {
    return null
  }
}

function saveAuth(token: string, user: User) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }))
}

function clearAuth() {
  window.localStorage.removeItem(STORAGE_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const stored = getStoredAuth()
    if (stored?.token && stored?.user) {
      setToken(stored.token)
      setUser(stored.user)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data?.message || 'Login failed')
    }
    if (!data?.token || !data?.user) {
      throw new Error('Invalid login response from server')
    }

    setToken(data.token)
    setUser(data.user)
    saveAuth(data.token, data.user)

    return data.user as User
  }

  const register = async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data?.message || 'Registration failed')
    }

    // If registration succeeds, immediately log the user in.
    const authenticatedUser = await login(email, password)
    return authenticatedUser
  }

  const googleLogin = async (credential: string) => {
    const response = await fetch(`${API_BASE}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data?.message || 'Google login failed')
    }
    if (!data?.token || !data?.user) {
      throw new Error('Invalid Google login response from server')
    }

    setToken(data.token)
    setUser(data.user)
    saveAuth(data.token, data.user)

    return data.user as User
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    clearAuth()
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      googleLogin,
      logout,
    }),
    [token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
