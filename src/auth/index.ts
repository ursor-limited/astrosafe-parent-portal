import { UserInfo } from './model'

export const getUserInfo = async (
  email: string,
  isProd: boolean
): Promise<UserInfo> => {
  const backendUrl = isProd
    ? 'https://api.astrosafe.co'
    : 'https://dev.api.astrosafe.co'

  const resp = await fetch(`${backendUrl}/troomi/users/self?email=${email}`, {
    credentials: 'include',
  })

  if (!resp.ok) throw new Error('Failed to fetch user info - invalid session.')

  const data = await resp.json()

  return data
}
