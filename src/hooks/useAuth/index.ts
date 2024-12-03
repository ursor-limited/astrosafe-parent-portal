import { UserInfo } from './../../auth/model'
import { useEffect, useState } from 'react'
import { getUserInfo } from './../../auth'
import Cookies from 'js-cookie'

let userInfoPromise: Promise<UserInfo> | null = null

export const fetchAndCacheUserInfo = async (
  email: string
): Promise<UserInfo> => {
  if (userInfoPromise) {
    return userInfoPromise
  }

  userInfoPromise = (async () => {
    const cachedData = localStorage.getItem('user_info')

    if (cachedData && Cookies.get('access_token')) return JSON.parse(cachedData)

    try {
      const userData = await getUserInfo(email)

      localStorage.setItem('user_info', JSON.stringify(userData))

      return userData
    } catch (error) {
      await login()

      const userData = await getUserInfo(email)

      localStorage.setItem('user_info', JSON.stringify(userData))

      return userData
    } finally {
      userInfoPromise = null
    }
  })()

  return userInfoPromise
}

const login = async () => {
  const resp = await fetch('https://api.astrosafe.co/troomi/login', {
    method: 'POST',
    credentials: 'include',
  })

  if (!resp.ok) throw new Error('Login failed.')

  return await resp.json()
}

const logout = () => {
  window.location.href = 'https://api.astrosafe.co/logout'
}

const useAuth = (email: string) => {
  const [user, setUser] = useState<UserInfo>(() => {
    const cachedData = localStorage.getItem('user_info')

    return cachedData ? JSON.parse(cachedData) : ({} as UserInfo)
  })

  useEffect(() => {
    fetchAndCacheUserInfo(email)
      .then((data) => setUser(data))
      .catch((err) => console.error('Failed to fetch user info:', err))

    const handleBeforeUnload = () => {
      localStorage.removeItem('user_info')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [email])

  return { user, login, logout }
}

export default useAuth
