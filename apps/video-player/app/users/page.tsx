import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import { BrowserUserProvider } from "../components/BrowserUserContext";
import UsersPageContents from "./UsersPageContents";

async function UsersPage() {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <UsersPageContents />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default UsersPage;
