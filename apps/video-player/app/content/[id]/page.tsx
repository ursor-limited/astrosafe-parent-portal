import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import { BrowserUserProvider } from "@/app/components/BrowserUserContext";
import ContentPageContents from "./ContentPageContents";

async function ContentPage({ params }: { params: { id: string } }) {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <ContentPageContents folderId={parseInt(params.id)} />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default ContentPage;
