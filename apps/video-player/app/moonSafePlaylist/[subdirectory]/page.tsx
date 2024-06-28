import React, { useEffect, useState } from "react";
import ApiController, { IVideo } from "@/app/api";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";
import { Metadata } from "next";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import MoonsafeLessonPageContents from "./MoonsafePlaylistPageContents";
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
  imageUrls?: string[];
  expandedContentIds: string[];
  canonicalUrl: string;
  nonCanonicalUrlList: string[];
  createdAt: string;
  updatedAt: string;
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { subdirectory: string };
}): Promise<Metadata> {
  const details = (await ApiController.getLessonFromUrl(
    params.subdirectory
  )) as ILesson;
  return {
    title: details.title,
    description: "Create math worksheets with Astro Worksheet Generator.",
  };
}

async function LessonPage({ params }: { params: { subdirectory: string } }) {
  const tmp = "";
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;

  return (
    <AuthWrapper>
      <UserProvider>
        {isMobile ? (
          <MobileLessonPageContents subdirectory={params.subdirectory} />
        ) : (
          <MoonsafeLessonPageContents subdirectory={params.subdirectory} />
        )}
      </UserProvider>
    </AuthWrapper>
  );
}

export default LessonPage;