import React from "react";
import ApiController from "@/app/api";
import VideoPageContents from "./VideoPageContents";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";

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
