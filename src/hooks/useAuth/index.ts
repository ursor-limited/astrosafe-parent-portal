import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserInfo } from '@/auth/model';
import { BACKEND_URL, post } from '@/api';
import { getUserInfo } from '@/auth';

const useAuth = () => {
  // If you're able to access this hook the user info should always be set as the middleware handles checking the auth state!!
  const [user, setUser] = useState<UserInfo>({} as UserInfo);

  useEffect(() => {
    const storedUserInfo = Cookies.get('user_info');

    if (storedUserInfo) {
      setUser(JSON.parse(atob(storedUserInfo)));

      return;
    }

    getUserInfo()
      .then((data) => {
        setUser(data);

        Cookies.set('user_info', btoa(JSON.stringify(data)));

        return;
      })
      .catch(
        () =>
          login()
            .then(() =>
              getUserInfo().then((data) => {
                setUser(data);

                Cookies.set('user_info', btoa(JSON.stringify(data)));

                return;
              })
            )
            .catch((err) => {}) // Failing login after first failed login = death?
      );
  }, []);

  const login = async () => {
    await post(process.env.AUTH_URL!, { user_id: 1 }); // TODO: Change before launch to actual user/parent ID!!
  };

  const logout = () => {
    window.location.href = `${BACKEND_URL}/logout`;

    return;
  };

  return { user, login, logout };
};

export default useAuth;
