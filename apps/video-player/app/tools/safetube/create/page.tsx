import React from "react";
import ApiController from "../../../api";
import CreationPageContents from "./CreationPageContents";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/UserContext";

async function CreationPage({ params }: { params: { videoId: string } }) {
  const videoDetails = await ApiController.getVideoDetails(params.videoId);
  return (
    <AuthWrapper>
      <UserProvider>
        {videoDetails ? <CreationPageContents details={videoDetails} /> : <></>}
      </UserProvider>
    </AuthWrapper>
  );
}

export default CreationPage;
