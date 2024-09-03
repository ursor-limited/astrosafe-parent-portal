import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserInfo } from './../../auth/model';
import { AUTH_URL, post } from './../../api';
import { getUserInfo } from './../../auth';

const useAuth = () => {
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
            .then(() => {
              getUserInfo().then((data) => {
                setUser(data);

                Cookies.set('user_info', btoa(JSON.stringify(data)));

                return;
              });
            })
            .catch((err) => {}) // Failing login after first failed login = death?
      );
  }, []);

  const login = async () => {
    const resp = await post('auth/login/confidential', {
      client_id: 'troomi',
      client_secret: 'ay8efW7PT2zhmP6VvhnWdML07pY3Lj0l',
    });
    // TODO: Change before launch to actual user/parent ID... or maybe don't since Troomi uses device_id to authenticate meaning we can't authenticate properly

    if (!resp) return;

    return await resp.json();
  };

  const logout = () => {
    window.location.href = `${AUTH_URL}/logout`;

    return;
  };

  return { user, login, logout };
};

export default useAuth;
