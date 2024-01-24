"use client";

import React, { useEffect, useState } from "react";
import _ from "lodash";

import { useAuth0 } from "@auth0/auth0-react";
import PediaLandingPageSignedInView from "./PediaLandingPageSignedInView";
import PediaLandingPageSignedOutView from "./PediaLandingPageSignedOutView";

export default function PediaHomePageContents() {
  /* needed for the platform row's proper scrollability */

  const { user, isLoading } = useAuth0();

  return isLoading ? (
    <></>
  ) : user ? (
    <PediaLandingPageSignedInView />
  ) : (
    <PediaLandingPageSignedOutView />
  );
}
