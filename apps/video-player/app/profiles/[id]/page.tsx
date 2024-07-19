import React from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import { UserProvider } from "@/app/components/UserContext";
import ProfilePage from "./contents/common";

async function Page({ params }: { params: { id: string } }) {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <UserProvider>
      <ProfilePage deviceId={parseInt(params.id)} isMobile={isMobile} />
    </UserProvider>
  );
}

export default Page;
