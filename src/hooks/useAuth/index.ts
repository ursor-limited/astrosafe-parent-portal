import { useEffect, useState } from 'react'
import { UserInfo } from './../../auth/model'
import { AUTH_URL, post } from './../../api'
import { getUserInfo } from './../../auth'

const useAuth = (deviceId: string, authUrl: string) => {
  const [user, setUser] = useState<UserInfo>({} as UserInfo)

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        setUser(data)

        return
      })
      .catch(
        () => {
          login()
            .then(() => {
              getUserInfo().then((data) => {
                setUser(data)

                location.reload()

                return
              })
            })
            .catch((err) => {})
        } // Failing login after first failed login = death?
      )
  }, [])

  const login = async () => {
    const resp = await fetch(authUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceId: deviceId,
      }),
    })

    if (!resp.ok) throw new Error('Login failed.')

    return await resp.json()
  }

  const logout = () => {
    window.location.href = `${AUTH_URL}/logout`

    return
  }

  return { user, login, logout }
}

export default useAuth
