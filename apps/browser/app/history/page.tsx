import React from "react";
import HistoryPageContents from "./HistoryPageContents";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";

async function HistoryPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return <HistoryPageContents mobile={mobile} />;
}

export default HistoryPage;
