import React from "react";
import { UserProvider } from "../../components/UserContext";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import ChannelPage from "./contents/common";

async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { folderId?: string };
}) {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <UserProvider>
      <ChannelPage
        id={parseInt(params.id)}
        folderId={
          searchParams.folderId ? parseInt(searchParams.folderId) : undefined
        }
        isMobile={isMobile}
      />
    </UserProvider>
  );
}

export default Page;
