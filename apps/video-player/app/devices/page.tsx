import React from "react";
import DevicesPageContents from "./DevicesPageContents";
import { UserProvider } from "../components/UserContext";

async function DevicesPage() {
  return (
    <UserProvider>
      <DevicesPageContents />
    </UserProvider>
  );
}

export default DevicesPage;
