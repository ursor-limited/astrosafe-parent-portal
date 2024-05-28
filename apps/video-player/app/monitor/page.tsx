import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import DevicesPageContents from "./DevicesPageContents";
import { BrowserUserProvider } from "../components/BrowserUserContext";

async function DevicesPage() {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <DevicesPageContents />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default DevicesPage;
