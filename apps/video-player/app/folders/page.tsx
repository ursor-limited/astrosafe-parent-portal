import React from "react";
import ContentsPageContents from "./ContentsPageContents";
import { UserProvider } from "../components/UserContext";

async function ContentPage() {
  return (
    <UserProvider>
      <ContentsPageContents />
    </UserProvider>
  );
}

export default ContentPage;
