import React from "react";
import HomePageContents from "./HomePageContents";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";

async function HomePage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { openConnect: string };
}) {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <HomePageContents
      mobile={mobile}
      openConnect={searchParams.openConnect === "true"}
    />
  );
}

export default HomePage;
