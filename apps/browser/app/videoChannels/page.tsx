import React from "react";
import VideoChannelsPageContents from "./VideoChannelsPageContents";

async function VideoChannelsPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  return <VideoChannelsPageContents />;
}

export default VideoChannelsPage;
