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
  //const details = (await ApiController.getUserById(params.id)) as ISafeTubeUser;
  return {
    title: "Bobby Boy's Lessons",
    description:
      "Have a look at all the sweet stuff that Bobby Boy has made for you!",
  };
}

async function TeacherPage({ params }: { params: { id: string } }) {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;

  const lessons = (await ApiController.getUserLessons(params.id).then((l) =>
    _.reverse(l.slice())
  )) as ILesson[];

  return (
    <AuthWrapper>
      <UserProvider>
        {isMobile ? null : (
          // <MobileLessonPageContents lessonId={params.id} />
          <UserPageContents lessons={lessons} creatorName="Bobby Boy" />
        )}
      </UserProvider>
    </AuthWrapper>
  );
}

export default TeacherPage;
