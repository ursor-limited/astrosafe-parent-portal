"use client";

import React from "react";
import _ from "lodash";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import PediaHomePageContents from "./PediaHomePageContents";

export default function AuthWrapper() {
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
      <PediaHomePageContents />
    </Auth0Provider>
  );
}
