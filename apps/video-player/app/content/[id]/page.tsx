import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import ContentPageContents from "./ContentPageContents";

async function ContentPage({ params }: { params: { id: string } }) {
  return (
    <AuthWrapper>
      <ContentPageContents folderId={parseInt(params.id)} />
    </AuthWrapper>
  );
}

export default ContentPage;
