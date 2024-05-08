import React, { useEffect, useState } from "react";
import ApiController, { IVideo } from "@/app/api";
import AuthWrapper from "@/app/components/AuthWrapper";
import { ISafeTubeUser, UserProvider } from "@/app/components/UserContext";
import { Metadata } from "next";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import _ from "lodash";
import UserPageContents from "./UserPageContents";
import { ILesson } from "@/app/lesson/[id]/page";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const details = (await ApiController.getUserById(params.id)) as ISafeTubeUser;
  return {
    title: details.externalDashboardTitle,
    description: details.externalDashboardTitle,
  };
}

async function TeacherPage({ params }: { params: { id: string } }) {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;

  const lessons = (await ApiController.getUserLessons(params.id).then((l) =>
    _.reverse(l.slice())
  )) as ILesson[];

  const title = ((await ApiController.getUserById(params.id)) as ISafeTubeUser)
    .externalDashboardTitle;

  console.log(await ApiController.getUserById(params.id));

  return (
    <AuthWrapper>
      <UserProvider>
        {isMobile ? null : (
          // <MobileLessonPageContents lessonId={params.id} />
          <UserPageContents lessons={lessons} title={title ?? "Lesson"} />
        )}
      </UserProvider>
    </AuthWrapper>
  );
}

export default TeacherPage;
