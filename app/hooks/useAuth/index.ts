import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserInfo } from '@/app/auth/model';
import { BACKEND_URL } from '@/api';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '@/app/auth';

const useAuth = () => {
  // If you"re able to access this hook the user info should always be set as the middleware handles checking the auth state!!
  const [user, setUser] = useState<UserInfo>({} as UserInfo);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = Cookies.get('user_info');

    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));

      return;
    }

    const accessToken = Cookies.get('access_token');

    const pathname = window.location.href;

    if (!accessToken) navigate(`${BACKEND_URL}/login?origin_uri=${pathname}`);

    getUserInfo().then((data) => {
      setUser(data);

      Cookies.set('user_info', JSON.stringify(data));
    });
  }, []);

  const login = () =>
    navigate(`${BACKEND_URL}/login?redirect_uri=${window.location.href}`);

  const logout = () => navigate(`${BACKEND_URL}/logout`);

  return { user, login, logout };
};

export default useAuth;
