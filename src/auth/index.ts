import { BACKEND_URL } from '../api';
import { UserInfo } from './model';

export const getUserInfo = async (): Promise<UserInfo> => {
  const resp = await fetch(`${BACKEND_URL}/users/self`, {
    credentials: 'include',
  });

  const data = await resp.json();

  return data;
};
