import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import FiltersPageContents from "./FiltersPageContents";
import { BrowserUserProvider } from "../components/BrowserUserContext";

async function ChannelsPage() {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <FiltersPageContents />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default ChannelsPage;
