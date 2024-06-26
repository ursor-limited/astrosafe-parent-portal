import React from "react";
import MoonsafePageContents from "./MoonsafePageContents";
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
        <MoonsafePageContents />;
      </UserProvider>
    </AuthWrapper>
  );
}

export default DashboardPage;
