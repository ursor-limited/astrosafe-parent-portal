import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import DashboardPageContents from "./DashboardPageContents";
import { UserProvider } from "../UserContext";

async function DashboardPage({
  searchParams,
}: {
  searchParams: { justSubscribed: string };
}) {
  console.log("aa", searchParams);
  return (
    <AuthWrapper>
      <UserProvider>
        <DashboardPageContents
          justSubscribed={searchParams?.justSubscribed === "1"}
        />
      </UserProvider>
    </AuthWrapper>
  );
}

export default DashboardPage;
