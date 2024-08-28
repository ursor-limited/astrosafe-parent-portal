import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserInfo } from '@/auth/model';
import { BACKEND_URL } from '@/api';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '@/auth';

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

    if (!accessToken) {
      window.location.href = `${BACKEND_URL}/login?origin_uri=${pathname}`;

      return;
    }

    getUserInfo().then((data) => {
      if (!data?.sub) {
        window.location.href = `${BACKEND_URL}/login?origin_uri=${pathname}`;

        return;
      }

      setUser(data);

      Cookies.set('user_info', JSON.stringify(data));
    });
  }, []);

  const login = () => {
    window.location.href = `${BACKEND_URL}/login?origin_uri=${window.location.href}`;

    return;
  };

  const logout = () => {
    window.location.href = `${BACKEND_URL}/logout`;

    return;
  };

  return { user, login, logout };
};

export default useAuth;
