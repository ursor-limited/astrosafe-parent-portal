import React from "react";
//import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import InsuranceApplicationPage from "./InsuranceApplicationPage";

async function AnchorWatch({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  // const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
  //   ?.isMobile;
  return <InsuranceApplicationPage />;
}

export default AnchorWatch;
