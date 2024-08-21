import { NextResponse, NextRequest } from 'next/server';
import { BACKEND_URL } from './app/api';
import { getUserInfo } from './app/auth';

const UNPROTECTED_ROUTES: string[] = [];

export async function middleware(request: NextRequest) {
  const { origin, pathname } = request.nextUrl;

  const originUri = `${origin}${pathname}`;

  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!accessToken)
    return NextResponse.redirect(
      `${BACKEND_URL}/login?origin_uri=${originUri}`
    );

  const userInfo = await getUserInfo(accessToken, refreshToken!);

  if (
    !UNPROTECTED_ROUTES.some((item) => originUri.startsWith(item)) &&
    !userInfo.sub
  )
    return NextResponse.redirect(
      `${BACKEND_URL}/login?origin_uri=${originUri}`
    );
}
