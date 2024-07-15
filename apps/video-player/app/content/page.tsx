import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import ContentsPageContents from "./ContentsPageContents";

async function ContentPage() {
  return (
    <AuthWrapper>
      <ContentsPageContents />
    </AuthWrapper>
  );
}

export default ContentPage;
