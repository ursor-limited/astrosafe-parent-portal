import { BACKEND_URL } from '../api';
import { UserInfo } from './model';

export const getUserInfo = async (): Promise<UserInfo> => {
  const resp = await fetch(`${BACKEND_URL}/users/self`, {
    credentials: 'include',
  });

  if (!resp.ok) throw new Error('Failed to fetch user info - invalid session.');

  const data = await resp.json();

  return data;
};
