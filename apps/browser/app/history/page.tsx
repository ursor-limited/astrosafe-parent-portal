import React from "react";
import HistoryPageContents from "./HistoryPageContents";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";

async function HistoryPage() {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return <HistoryPageContents isMobile={mobile} />;
}

export default HistoryPage;
