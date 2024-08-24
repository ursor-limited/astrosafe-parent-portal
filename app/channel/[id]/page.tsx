import React from "react";
import { UserProvider } from "../../components/UserContext";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import ChannelPage from "./contents/common";

async function Page({ params }: { params: { id: string } }) {
  const isMobile = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  )?.isMobile;
  return (
    <UserProvider>
      <ChannelPage id={parseInt(params.id)} isMobile={isMobile} />
    </UserProvider>
  );
}

export default Page;
