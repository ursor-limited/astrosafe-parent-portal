import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import EditorPageContents from "./EditorPageContents";
import { UserProvider } from "../components/UserContext";

async function FigmaPage() {
  return (
    <AuthWrapper>
      <UserProvider>
        <EditorPageContents />
      </UserProvider>
    </AuthWrapper>
  );
}

export default FigmaPage;
