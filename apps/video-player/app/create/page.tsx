import React from "react";
import ApiController from "../api";
import CreationPageContents from "./CreationPageContents";

async function CreationPage({ params }: { params: { videoId: string } }) {
  const videoDetails = await ApiController.getVideoDetails(params.videoId);
  return videoDetails ? <CreationPageContents details={videoDetails} /> : <></>;
}

export default CreationPage;
