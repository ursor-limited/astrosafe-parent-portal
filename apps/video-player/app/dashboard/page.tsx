import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import DashboardPageContents from "./DashboardPageContents";

async function DashboardPage() {
  return (
    <AuthWrapper>
      <DashboardPageContents />
    </AuthWrapper>
  );
}

export default DashboardPage;
