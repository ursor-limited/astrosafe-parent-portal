import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserInfo } from '@/app/auth/model';
import { BACKEND_URL } from '@/app/api';
import { redirect } from 'next/navigation';

const useAuth = () => {
  // If you're able to access this hook the user info should always be set as the middleware handles checking the auth state!!
  const [user, setUser] = useState<UserInfo>({} as UserInfo);

  useEffect(() => {
    const userInfo = localStorage.getItem('user_info');

    if (!userInfo) return;

    setUser(JSON.parse(userInfo));
  }, []);

  const login = () =>
    redirect(`${BACKEND_URL}/login?redirect_uri=${window.location.href}`);

  const logout = () => redirect(`${BACKEND_URL}/logout`);

  return { user, login, logout };
};

export default useAuth;
