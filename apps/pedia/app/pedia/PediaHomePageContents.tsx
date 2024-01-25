"use client";

import React, { useEffect, useState } from "react";
import _ from "lodash";

import { useAuth0 } from "@auth0/auth0-react";
import PediaLandingPageSignedInView from "./PediaLandingPageSignedInView";
import PediaLandingPageSignedOutView from "./PediaLandingPageSignedOutView";
import { useWindowSize } from "usehooks-ts";

export const MOBILE_WINDOW_WIDTH_THRESHOLD = 700;

export default function PediaHomePageContents() {
  /* needed for the platform row's proper scrollability */

  const { user, isLoading } = useAuth0();

  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  return isLoading ? (
    <></>
  ) : user ? (
    <PediaLandingPageSignedInView mobile={isMobile} />
  ) : (
    <PediaLandingPageSignedOutView mobile={isMobile} />
  );
}
