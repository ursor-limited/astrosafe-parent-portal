import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import ChannelsPageContents from "./ChannelsPageContents";
import { BrowserUserProvider } from "../components/BrowserUserContext";

async function ChannelsPage() {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <ChannelsPageContents />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default ChannelsPage;
