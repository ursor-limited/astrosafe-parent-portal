import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
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
        () =>
          login()
            .then(() => {
              getUserInfo().then((data) => {
                setUser(data)

                location.reload()

                return
              })
            })
            .catch((err) => {}) // Failing login after first failed login = death?
      )
  }, [])

  const login = async () => {
    const resp = await post(authUrl, {
      deviceId: deviceId,
    })
    // TODO: Change before launch to actual user/parent ID... or maybe don't since Troomi uses device_id to authenticate meaning we can't authenticate properly

    if (!resp) return

    return await resp.json()
  }

  const logout = () => {
    window.location.href = `${AUTH_URL}/logout`

    return
  }

  return { user, login, logout }
}

export default useAuth
