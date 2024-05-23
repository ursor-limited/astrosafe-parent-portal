import React from "react";
import ApiController from "@/app/api";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";
import AccountPageContents from "../account/AccountPageContents";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import MobileAccountPageContents from "./MobileAccountPageContents";
import { BrowserUserProvider } from "../components/BrowserUserContext";

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
    <AuthWrapper>
      <BrowserUserProvider>
        <UserProvider>
          {isMobile ? <MobileAccountPageContents /> : <AccountPageContents />}
        </UserProvider>
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default AccountPage;
