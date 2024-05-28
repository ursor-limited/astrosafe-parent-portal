import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import { BrowserUserProvider } from "../components/BrowserUserContext";
import UsersPageContents from "./UsersPageContents";
import { UserProvider } from "../components/UserContext";

async function UsersPage() {
  return (
    <AuthWrapper>
      <UserProvider>
        <BrowserUserProvider>
          <UsersPageContents />
        </BrowserUserProvider>
      </UserProvider>
    </AuthWrapper>
  );
}

export default UsersPage;
