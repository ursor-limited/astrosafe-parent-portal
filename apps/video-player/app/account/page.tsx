import React from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import AccountPageContents from "./AccountPageContents";
import { UserProvider } from "../components/UserContext";

async function AccountPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <UserProvider>
      <AccountPageContents />
    </UserProvider>
  );
}

export default AccountPage;
