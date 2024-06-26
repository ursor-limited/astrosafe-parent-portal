import React from "react";
import DashboardPageContents from "./DashboardPageContents";
import { Metadata } from "next";
import AuthWrapper from "../components/AuthWrapper";
import { UserProvider } from "../components/UserContext";

export const metadata: Metadata = {
  title: "Moonsafe",
  description: "A dazzling dashboard.",
};

async function DashboardPage() {
  return (
    <AuthWrapper>
      <UserProvider>
        <DashboardPageContents />;
      </UserProvider>
    </AuthWrapper>
  );
}

export default DashboardPage;
