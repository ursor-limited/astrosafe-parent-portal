import React from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import ApprovalPageContents from "./ApprovalPageContents";

async function ApprovalPage({
  searchParams,
}: {
  searchParams: { url: string };
}) {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <ApprovalPageContents
      isMobile={mobile}
      url={decodeURIComponent(searchParams.url)}
    />
  );
}

export default ApprovalPage;
