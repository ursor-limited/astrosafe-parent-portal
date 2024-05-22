import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import { BrowserUserProvider } from "../components/BrowserUserContext";
import AppsPageContents from "./AppsPageContents";

async function AppsPage() {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <AppsPageContents />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default AppsPage;
