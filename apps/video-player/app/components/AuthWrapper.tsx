"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
export default function AuthWrapper(props: { children: React.ReactNode }) {
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
      cacheLocation="localstorage"
    >
      {props.children}
    </Auth0Provider>
  );
}
