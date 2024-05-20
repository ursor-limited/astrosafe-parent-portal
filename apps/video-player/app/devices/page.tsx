import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import { UserProvider } from "../components/UserContext";
import DevicesPageContents from "./DevicesPageContents";

async function DevicesPage() {
  return (
    <AuthWrapper>
      <UserProvider>
        <DevicesPageContents />
      </UserProvider>
    </AuthWrapper>
  );
}

export default DevicesPage;
