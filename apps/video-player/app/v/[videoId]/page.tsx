import React from "react";
import { Stack } from "@mui/system";
//import CaptionsIcon from "./images/icons/Captions.svg";
import Logo from "@/images/logo.svg";
import Image from "next/image";
import Typography from "@/components/Typography";
import ApiController from "@/app/api";
import Background from "@/images/background.png";
import PlayerLogo from "@/images/playerLogo.png";
//import Player from "@/components/Player";
import VideoDetailsEditingSection from "@/components/VideoDetailsEditingSection";
import Link from "next/link";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import VideoPageContents from "./VideoPageContents";
import { PALETTE } from "@/palette";

const Player = dynamic(
  () => import("@/components/Player"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const PADDING_TOP = "100px";
const VIDEO_WIDTH = 845;
const VIDEO_HEIGHT = 475;

// export const getStaticProps = (async (context) => {
//   //const videoDetails = ApiController.getVideoDetails(videoId)
//   return {
//     props: {
//       videoDetails: await ApiController.getVideoDetails(
//         context.params?.videoId as string
//       ), //projects: data.projects
//     },
//   };
// }) satisfies GetStaticProps<{
//   videoDetails: IVideo;
// }>;

async function VideoPage({ params }: { params: { videoId: string } }) {
  const videoDetails = await ApiController.getVideoDetails(params.videoId);
  return videoDetails ? <VideoPageContents details={videoDetails} /> : <></>;
}

export default VideoPage;
