import React from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import { UserProvider } from "@/app/components/UserContext";
import ProfilePage, { AstroAccountTab } from "./contents/common";

async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { tab: AstroAccountTab };
}) {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <UserProvider>
      <ProfilePage
        deviceId={parseInt(params.id)}
        isMobile={isMobile}
        tab={searchParams.tab}
      />
    </UserProvider>
  );
}

export default Page;
