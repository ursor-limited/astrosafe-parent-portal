import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import { BrowserUserProvider } from "../components/BrowserUserContext";
import ContentPageContents from "./ContentPageContents";

async function ContentPage() {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <ContentPageContents />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default ContentPage;
