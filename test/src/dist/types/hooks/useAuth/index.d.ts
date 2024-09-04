import { UserInfo } from '../../auth/model'
declare const useAuth: (email: string) => {
  user: UserInfo
  login: () => Promise<any>
  logout: () => void
}
export default useAuth
