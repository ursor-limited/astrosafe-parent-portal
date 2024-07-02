import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import { BrowserUserProvider } from "@/app/components/BrowserUserContext";
import DevicesPageContents from "./DevicesPageContents";

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
