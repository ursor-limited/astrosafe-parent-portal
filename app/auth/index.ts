import { BACKEND_URL } from '../api';
import { UserInfo } from './model';

export const getUserInfo = async (
  accessToken: string,
  refreshToken: string
): Promise<UserInfo> => {
  const resp = await fetch(`${BACKEND_URL}/users/self`, {
    headers: {
      Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`, // Yes, I know. Setting cookies manually in fetch is slop but it's the slop we need for Next.js
    },
  });

  const data = await resp.json();

  return data;
};
