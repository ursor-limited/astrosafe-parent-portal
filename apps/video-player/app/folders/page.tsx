import React from "react";
import ContentsPageContents from "./contents/common";
import { UserProvider } from "../components/UserContext";
import AllFoldersPage from "./contents/common";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";

async function Page() {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <UserProvider>
      <AllFoldersPage isMobile={isMobile} />
    </UserProvider>
  );
}

export default Page;
