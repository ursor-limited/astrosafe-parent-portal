import React from "react";
import VideoChannelsPageContents from "./VideoChannelsPageContents";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";

async function VideoChannelsPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return isMobile ? (
    <MobileVideoChannelsPageContents />
  ) : (
    <VideoChannelsPageContents />
  );
}

export default VideoChannelsPage;
