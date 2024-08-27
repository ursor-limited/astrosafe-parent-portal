import React from 'react';
import ApiController from '../../../api';
// import CreationPageContents from "./CreationPageContents";

import { UserProvider } from '@/app/components/UserContext';

export const dynamicParams = true;

export async function generateStaticParams() {
  return [
    {
      videoId: 'boo',
    },
  ];
}

async function CreationPage({ params }: { params: { videoId: string } }) {
  //   const videoDetails = await ApiController.getVideoDetails(params.videoId);
  return (
    <></>
    // <AuthWrapper>
    //
    //     {videoDetails ? <CreationPageContents details={videoDetails} /> : <></>}
    //
    // </AuthWrapper>
  );
}

export default CreationPage;
