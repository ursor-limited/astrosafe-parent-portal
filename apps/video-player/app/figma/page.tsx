import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import FigmaPageContents from "./FigmaPageContents";
import { UserProvider } from "../UserContext";

async function FigmaPage() {
  return (
    <AuthWrapper>
      <UserProvider>
        <FigmaPageContents />
      </UserProvider>
    </AuthWrapper>
  );
}

export default FigmaPage;
