import React from "react";
import ApiController from "@/app/api";
import dynamic from "next/dynamic";
import VideoPageContents from "./VideoPageContents";

async function VideoPage({ params }: { params: { videoId: string } }) {
  const videoDetails = await ApiController.getVideoDetails(params.videoId);
  return videoDetails ? <VideoPageContents details={videoDetails} /> : <></>;
}

export default VideoPage;
