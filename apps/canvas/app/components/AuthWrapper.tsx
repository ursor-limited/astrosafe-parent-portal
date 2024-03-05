"use client";

import dynamic from "next/dynamic";
import React from "react";
//import { Auth0Provider } from "@auth0/auth0-react";

const Auth0Provider = dynamic(
  () => import("react-quill"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

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
      {/* @ts-ignore */}
      {props.children}
    </Auth0Provider>
  );
}
