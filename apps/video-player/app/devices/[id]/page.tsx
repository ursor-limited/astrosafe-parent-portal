import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import { BrowserUserProvider } from "@/app/components/BrowserUserContext";
import DevicePageContents from "./DevicePageContents";

async function DevicePage({ params }: { params: { id: string } }) {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <DevicePageContents deviceId={parseInt(params.id)} />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default DevicePage;
