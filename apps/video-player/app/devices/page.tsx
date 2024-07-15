import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import DevicesPageContents from "./DevicesPageContents";

async function DevicesPage() {
  return (
    <AuthWrapper>
      <DevicesPageContents />
    </AuthWrapper>
  );
}

export default DevicesPage;
