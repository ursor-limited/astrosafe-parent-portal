import React from "react";
import ApiController from "@/app/api";
import VideoPageContents from "./VideoPageContents";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import MobileDashboardPageContents from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/MobileDashboardPageContents";
import MobileVideoPageContents from "./MobileVideoPageContents";

export async function generateStaticParams() {
  return [
    {
      videoId: "653f98dbdffef24a0729b421",
    },
  ];
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { videoId: string };
}): Promise<Metadata> {
  const videoDetails = await ApiController.getVideoDetails(params.videoId);
  return {
    title: videoDetails.title,
    description:
      "SafeTube - A safe way for kids to view Youtube and Vimeo videos.",
  };
}

async function VideoPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { lesson: string };
}) {
  const videoDetails = await ApiController.getVideoDetails(params.videoId);
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return videoDetails ? (
    <AuthWrapper>
      <UserProvider>
        {isMobile ? (
          <MobileVideoPageContents
            details={videoDetails}
            lessonId={searchParams.lesson}
          />
        ) : (
          <VideoPageContents
            details={videoDetails}
            lessonId={searchParams.lesson}
          />
        )}
      </UserProvider>
    </AuthWrapper>
  ) : (
    <></>
  );
}

export default VideoPage;
