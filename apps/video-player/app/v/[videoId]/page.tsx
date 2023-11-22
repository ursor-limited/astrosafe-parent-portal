import React from "react";
import ApiController from "@/app/api";
import dynamic from "next/dynamic";
import VideoPageContents from "./VideoPageContents";

async function VideoPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  const videoDetails = await ApiController.getVideoDetails(params.videoId);
  return videoDetails ? (
    <VideoPageContents
      details={videoDetails}
      share={searchParams.share === "1"}
    />
  ) : (
    <></>
  );
}

export default VideoPage;
