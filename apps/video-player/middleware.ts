import { NextResponse, NextRequest } from "next/server";
import ApiController from "./app/api";
import { ILesson_DEPRECATED } from "./app/lesson/[subdirectory]/page";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  //@ts-ignore
  const lessonUrlId = pathname?.split("/")?.slice(-1)?.[0]; //@ts-ignore
  if (lessonUrlId) {
    const lesson = (await ApiController.getLessonFromUrl(
      lessonUrlId
    )) as ILesson_DEPRECATED;
    if (lessonUrlId !== lesson.canonicalUrl) {
      return NextResponse.redirect(`${origin}/lesson/${lesson.canonicalUrl}`);
    }
  }
}

export const config = {
  matcher: "/lesson/:path*",
};
