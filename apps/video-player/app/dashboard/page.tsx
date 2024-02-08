import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import DashboardPageContents from "./DashboardPageContents";
import { UserProvider } from "../UserContext";

async function DashboardPage() {
  return (
    <AuthWrapper>
      <UserProvider>
        <DashboardPageContents />
      </UserProvider>
    </AuthWrapper>
  );
}

export default DashboardPage;
