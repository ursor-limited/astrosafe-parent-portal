import React from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import VideoChannelsPageContents from "./VideoChannelsPageContents";

async function VideoChannelsPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return <VideoChannelsPageContents mobile={mobile} />;
}

export default VideoChannelsPage;
