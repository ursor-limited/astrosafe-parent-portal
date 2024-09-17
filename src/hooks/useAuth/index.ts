import { useEffect, useState } from 'react'
import { UserInfo } from './../../auth/model'
import { getUserInfo } from './../../auth'

const useAuth = (email: string) => {
  const [user, setUser] = useState<UserInfo>({} as UserInfo)

  useEffect(() => {
    getUserInfo(email)
      .then((data) => {
        setUser(data)

        return
      })
      .catch(
        () => {
          login()
            .then(() => {
              console.log('noooooo')

              getUserInfo(email).then((data) => {
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
