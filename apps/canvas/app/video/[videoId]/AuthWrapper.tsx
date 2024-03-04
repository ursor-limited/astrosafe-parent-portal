"use client";

import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { IVideo } from "@/app/api";
import VideoPageContents from "./VideoPageContents";
import { UserProvider } from "@/app/components/UserContext";

export default function AuthWrapper(props: { videoDetails: IVideo }) {
  /* needed for the platform row's proper scrollability */

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.NEXT_PUBLIC_REACT_APP_AUTH0_CLIENT_ID as string}
      authorizationParams={{
        audience: "https://api-gateway-authorizer",
        redirect_uri: process.env
          .NEXT_PUBLIC_REACT_APP_AUTH0_REDIRECT_URL as string,
      }}
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
    >
      <UserProvider>
        <VideoPageContents details={props.videoDetails} />
      </UserProvider>
    </Auth0Provider>
  );
}
