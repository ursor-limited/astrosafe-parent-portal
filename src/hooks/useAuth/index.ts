import { useEffect, useState } from 'react'
import { UserInfo } from './../../auth/model'
import { getUserInfo } from './../../auth'
import Cookies from 'js-cookie'

const useAuth = (email: string) => {
  const [user, setUser] = useState<UserInfo>({} as UserInfo)

  useEffect(() => {
    const userData = localStorage.getItem('user_info')

    if (userData && Cookies.get('access_token')) {
      setUser(JSON.parse(userData))

      return
    }

    getUserInfo(email)
      .then((data) => {
        setUser(data)

        localStorage.setItem('user_info', JSON.stringify(data))

        return
      })
      .catch(
        () => {
          login()
            .then(() => {
              getUserInfo(email).then((data) => {
                setUser(data)

                location.reload()

                localStorage.setItem('user_info', JSON.stringify(data))

                return
              })
            })
            .catch((err) => {})
        } // Failing login after first failed login = death?
      )

    const handleBeforeUnload = () => {
      localStorage.removeItem('user_info')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

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

    return
  }

  return { user, login, logout }
}

export default useAuth
