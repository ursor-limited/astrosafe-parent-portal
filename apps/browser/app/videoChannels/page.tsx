import React from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import ChannelsPageContents from "./ChannelsPageContents";

async function ChannelsPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { id?: string };
}) {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <ChannelsPageContents
      mobile={mobile}
      id={searchParams.id ? parseInt(searchParams.id) : undefined}
    />
  );
}

export default ChannelsPage;
