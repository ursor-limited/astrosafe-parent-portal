import { NextResponse, NextRequest } from 'next/server';

const UNPROTECTED_ROUTES: string[] = [];

const getUserInfo = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  const resp = await fetch(`${BACKEND_URL}/users/self`, {
    headers: {
      Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`, // Yes, I know. Setting cookies manually in fetch is slop but it's the slop we need for Next.js
    },
  });

  const data = await resp.json();

  return data;
};

const BACKEND_URLS = {
  local: 'http://localhost:8000',
  development: 'https://api.astrosafe.co',
  preview: 'https://api.astrosafe.co',
  production: 'https://api.astrosafe.co',
};

const BACKEND_URL =
  BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV as keyof typeof BACKEND_URLS];

export async function middleware(request: NextRequest) {
  const { origin, pathname } = request.nextUrl;

  const originUri = `${origin}${pathname}`;

  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!accessToken)
    return NextResponse.redirect(
      `${BACKEND_URL}/login?origin_uri=${originUri}`
    );

  console.log(accessToken);

  const userInfo = await getUserInfo(accessToken, refreshToken!);

  console.log(userInfo);

  if (
    !UNPROTECTED_ROUTES.some((item) => originUri.startsWith(item)) &&
    !userInfo.sub
  )
    return NextResponse.redirect(
      `${BACKEND_URL}/login?origin_uri=${originUri}`
    );
}
