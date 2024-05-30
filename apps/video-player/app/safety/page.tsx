import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import SafetyPageContents from "./SafetyPageContents";
import { BrowserUserProvider } from "../components/BrowserUserContext";

async function SafetyPage() {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <SafetyPageContents />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default SafetyPage;
