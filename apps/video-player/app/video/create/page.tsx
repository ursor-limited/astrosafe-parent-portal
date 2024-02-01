import React from "react";
import ApiController from "../../api";
import CreationPageContents from "./CreationPageContents";
import AuthWrapper from "@/app/components/AuthWrapper";

async function CreationPage({ params }: { params: { videoId: string } }) {
  const videoDetails = await ApiController.getVideoDetails(params.videoId);
  return (
    <AuthWrapper>
      {videoDetails ? <CreationPageContents details={videoDetails} /> : <></>}
    </AuthWrapper>
  );
}

export default CreationPage;
