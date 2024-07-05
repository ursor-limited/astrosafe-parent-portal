import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import { BrowserUserProvider } from "../components/BrowserUserContext";
import ContentsPageContents from "./ContentsPageContents";

async function ContentPage() {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <ContentsPageContents />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default ContentPage;
