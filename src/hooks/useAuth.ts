import { useCallback, useEffect, useState } from 'react'

/**
 * Фронтенд-мок авторизации (email + 2FA код на почту).
 * Хранит сессию в localStorage. Для прод-версии вместо этого
 * подключается Supabase Auth (magic-link / OTP) — интерфейс тот же.
 */

const SESSION_KEY = 'convvy.session'
const DEMO_CODE = '000000'

export interface Session {
  email: string
  loggedInAt: number
}

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(() => loadSession())

  useEffect(() => {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [session])

  /** Шаг 1: «отправить код». В моке — просто проверяем формат email. */
  const requestCode = useCallback((email: string): boolean => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    return ok
  }, [])

  /** Шаг 2: проверить 2FA код */
  const verifyCode = useCallback((email: string, code: string): boolean => {
    if (code.trim() !== DEMO_CODE) return false
    setSession({ email: email.trim().toLowerCase(), loggedInAt: Date.now() })
    return true
  }, [])

  const logout = useCallback(() => setSession(null), [])

  return { session, requestCode, verifyCode, logout }
}
