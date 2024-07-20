import React from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import AccountPage from "./contents/common";
import { UserProvider } from "../components/UserContext";

async function Page() {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <UserProvider>
      <AccountPage isMobile={isMobile} />
    </UserProvider>
  );
}

export default Page;
