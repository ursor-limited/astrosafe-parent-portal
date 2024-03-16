import React from "react";
import ApiController from "@/app/api";
import AuthWrapper from "./AuthWrapper";

async function VideoPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  const videoDetails = await ApiController.getVideoDetails(params.videoId);
  return videoDetails ? <AuthWrapper videoDetails={videoDetails} /> : <></>;
}

export default VideoPage;
