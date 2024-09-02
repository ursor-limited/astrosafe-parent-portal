import { UserInfo } from '../../auth/model';
declare const useAuth: () => {
  user: UserInfo;
  login: () => Promise<any>;
  logout: () => void;
};
export default useAuth;
