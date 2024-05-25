import React from "react";
//import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import FormPage from "./FormPage";

async function AnchorWatch({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  // const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
  //   ?.isMobile;
  return <FormPage />;
}

export default AnchorWatch;
