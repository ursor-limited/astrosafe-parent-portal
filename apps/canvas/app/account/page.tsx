import React from "react";
import ApiController from "@/app/api";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";
import AccountPageContents from "./AccountPageContents";

async function AccountPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  return (
    <AuthWrapper>
      <UserProvider>
        <AccountPageContents />
      </UserProvider>
    </AuthWrapper>
  );
}

export default AccountPage;
