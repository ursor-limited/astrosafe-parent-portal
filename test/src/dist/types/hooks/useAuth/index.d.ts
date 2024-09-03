import { UserInfo } from './../../auth/model';
declare const useAuth: (deviceId: string, authUrl: string) => {
    user: UserInfo;
    login: () => Promise<any>;
    logout: () => void;
};
export default useAuth;
