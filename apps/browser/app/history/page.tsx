import React from "react";
import DesktopHistoryPageContents from "./DesktopHistoryPageContents";
import MobileHistoryPageContents from "./MobileHistoryPageContents";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";

async function HistoryPage() {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return mobile ? (
    <MobileHistoryPageContents />
  ) : (
    <DesktopHistoryPageContents />
  );
}

export default HistoryPage;
