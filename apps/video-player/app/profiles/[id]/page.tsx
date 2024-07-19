import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import DevicePageContents from "./DevicePageContents";

async function DevicePage({ params }: { params: { id: string } }) {
  return (
    <AuthWrapper>
      <DevicePageContents deviceId={parseInt(params.id)} />
    </AuthWrapper>
  );
}

export default DevicePage;
