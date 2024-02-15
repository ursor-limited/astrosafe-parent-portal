"use client";

import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/system";
import ApiController, { IVideo } from "@/app/api";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { Header, STRIPE_CUSTOMER_PORTAL_URL } from "@/app/components/header";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { useAuth0 } from "@auth0/auth0-react";
import Star from "@/images/Star.svg";
import Play from "@/images/play.svg";
import moment from "moment";
import { useRouter } from "next/navigation";
import UrsorFadeIn from "../components/UrsorFadeIn";
import _ from "lodash";
import Image from "next/image";
import NotificationContext from "../components/NotificationContext";
import mixpanel from "mixpanel-browser";
import { deNoCookiefy } from "../components/utils";
import { ISafeTubeUser, useUserContext } from "../UserContext";
import Canvas from "./Canvas";
import TextEditorToolbar from "./TextEditorToolBar";

export const MAGICAL_BORDER_THICKNESS = 1.8;
export const HIDE_LOGO_PLAYER_WIDTH_THRESHOLD = 500;

const PLACEHOLDER_THUMBNAIL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/Safetubelogo2.png";

export const FREE_VIDEO_LIMIT = 3;

const VIDEO_WIDTH = 845;

export const GRADIENT = "linear-gradient(150deg, #F279C5, #FD9B41)";
const PROMPT_BAR_GRADIENT = "linear-gradient(0deg, #6596FF, #7B61FF)";

const UPGRADE_PROMPT_BAR_VISIBILITY_WINDOW_WIDTH_THRESHOLD = 1110;
export const MOBILE_WINDOW_WIDTH_THRESHOLD = 680;

function FigmaPageContents() {
  const { width } = useWindowSize();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  return (
    <>
      <Header mobile={isMobile} hidePopupDashboardButton />
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Stack spacing="12px">
          <Canvas />
        </Stack>
      </Stack>
    </>
  );
}

export default FigmaPageContents;
