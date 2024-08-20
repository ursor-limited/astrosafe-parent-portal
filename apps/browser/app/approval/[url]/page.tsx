import React from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import ApprovalPageContents from "./ApprovalPageContents";

async function ApprovalPage({ params }: { params: { url: string } }) {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <ApprovalPageContents
      isMobile={mobile}
      url={decodeURIComponent(params.url)}
    />
  );
}

export default ApprovalPage;
