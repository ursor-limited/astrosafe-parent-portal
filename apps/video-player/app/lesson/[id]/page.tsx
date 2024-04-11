import React, { useEffect, useState } from "react";
import ApiController, { IVideo } from "@/app/api";
import { IWorksheet } from "@/app/components/WorksheetGenerator";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";
import { Metadata } from "next";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import LessonPageContents from "./LessonPageContents";
import { AstroContent } from "@/app/dashboard/DashboardPageContents";
import MobileLessonPageContents from "./MobileLessonPageContents";

export interface ILesson {
  id: string;
  creatorId?: string;
  title: string;
  description?: string;
  contents: {
    type: AstroContent;
    contentId: string;
  }[];
  contentOrder: string[];
  createdAt: string;
  updatedAt: string;
}

const DUMMY_CONTENTS: ILesson["contents"] = [
  {
    type: "video",
    contentId: "65f5f42bd8210303bcf22dea",
  },
  {
    type: "link",
    contentId: "BOO",
  },
  {
    type: "worksheet",
    contentId: "65f80360d8210303bcf22e32",
  },
  {
    type: "video",
    contentId: "65f5f6bdd8210303bcf22dfb",
  },
];

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const details = (await ApiController.getLesson(params.id)) as ILesson;
  return {
    title: details.title,
    description: "Create math worksheets with Astro Worksheet Generator.",
  };
}

async function LessonPage({ params }: { params: { id: string } }) {
  //const { width } = useWindowSize();
  // const [isMobile, setIsMobile] = useState<boolean>(false);
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  //useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);
  return (
    <AuthWrapper>
      <UserProvider>
        {isMobile ? (
          <MobileLessonPageContents lessonId={params.id} />
        ) : (
          <LessonPageContents lessonId={params.id} />
        )}
      </UserProvider>
    </AuthWrapper>
  );
}

export default LessonPage;
