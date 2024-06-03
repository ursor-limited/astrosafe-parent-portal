import React from "react";
import HomePageContents from "./HomePageContents";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";

async function HomePage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return <HomePageContents mobile={mobile} />;
}

export default HomePage;
