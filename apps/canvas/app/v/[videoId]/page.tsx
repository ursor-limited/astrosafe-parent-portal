import React from "react";
import ApiController from "@/app/api";
import VideoPageContents from "./VideoPageContents";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";
import { Metadata } from "next";

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
  searchParams: { share: string };
}) {
  const videoDetails = await ApiController.getVideoDetails(params.videoId);
  return videoDetails ? (
    <AuthWrapper>
      <UserProvider>
        <VideoPageContents details={videoDetails} />
      </UserProvider>
    </AuthWrapper>
  ) : (
    <></>
  );
}

export default VideoPage;
