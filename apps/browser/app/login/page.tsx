import React from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import { Stack } from "@mui/system";
import { PALETTE } from "ui";
import LoginPage from "./contents/common";

async function Page({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <Stack
      width="100%"
      height="100%"
      bgcolor={PALETTE.primary.navy}
      position="relative"
    >
      <LoginPage />
    </Stack>
  );
}

export default Page;
