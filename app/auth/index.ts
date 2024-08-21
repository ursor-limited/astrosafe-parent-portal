import { UserInfo } from './model';

export const getUserInfo = async (
  accessToken: string,
  refreshToken: string
): Promise<UserInfo> => {
  const resp = await fetch('http://localhost:8000/users/self', {
    headers: {
      Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`, // Yes, I know. Setting cookies manually is fetch is slop but it's the slop we need for Next.js
    },
  });

  const data = await resp.json();

  return data;
};
