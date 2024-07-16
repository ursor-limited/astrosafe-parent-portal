import React from "react";
import ContentPageContents from "./ContentPageContents";
import { UserProvider } from "@/app/components/UserContext";

async function ContentPage({ params }: { params: { id: string } }) {
  return (
    <UserProvider>
      <ContentPageContents folderId={parseInt(params.id)} />
    </UserProvider>
  );
}

export default ContentPage;
