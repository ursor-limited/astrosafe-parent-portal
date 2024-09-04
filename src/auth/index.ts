import { BACKEND_URL } from '../api'
import { UserInfo } from './model'

export const getUserInfo = async (email: string): Promise<UserInfo> => {
  const resp = await fetch(`${BACKEND_URL}/troomi/users/self?email=${email}`, {
    credentials: 'include',
  })

  if (!resp.ok) throw new Error('Failed to fetch user info - invalid session.')

  const data = await resp.json()

  return data
}
