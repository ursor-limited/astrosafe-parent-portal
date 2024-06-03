import React from "react";
import HistoryPageContents from "./HistoryPageContents";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import MobileHistoryPageContents from "./MobileHistoryPageContents";

async function HistoryPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return isMobile ? <MobileHistoryPageContents /> : <HistoryPageContents />;
}

export default HistoryPage;
