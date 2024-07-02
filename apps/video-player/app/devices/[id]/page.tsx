import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import { BrowserUserProvider } from "@/app/components/BrowserUserContext";
import DevicePageContents from "./DevicePageContents";

async function DevicePage({ params }: { params: { id: number } }) {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <DevicePageContents deviceId={params.id} />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default DevicePage;
