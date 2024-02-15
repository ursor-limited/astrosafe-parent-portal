"use client";

import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/system";
import ApiController, { IVideo } from "@/app/api";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { Header, STRIPE_CUSTOMER_PORTAL_URL } from "@/app/components/header";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { useAuth0 } from "@auth0/auth0-react";
import PlusIcon from "@/images/icons/PlusIcon.svg";
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
import Canvas, { IAstroCanvasElement } from "./Canvas";
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

export interface IAstroCanvas {
  id: string;
  elements: IAstroCanvasElement[];
}

function FigmaPageContents() {
  const { width } = useWindowSize();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  const [canvases, setCanvases] = useState<IAstroCanvas[]>([]);
  const [selectedCanvas, setSelectedCanvas] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setCanvases([{ id: "0", elements: [] }]);
    setSelectedCanvas("0");
  }, []);

  return (
    <>
      <Header mobile={isMobile} hidePopupDashboardButton />
      <Stack
        flex={1}
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        <Stack spacing="12px" direction="row">
          <Stack spacing="10px">
            <Stack
              width="210px"
              height="44px"
              border={`3px solid rgba(255,255,255,0.35)`}
              borderRadius="12px"
              onClick={() => {
                setSelectedCanvas(canvases.length.toString());
                setCanvases([
                  ...canvases,
                  {
                    id: canvases.length.toString(),
                    elements: [] as IAstroCanvasElement[],
                  },
                ]);
              }}
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
                svg: {
                  path: {
                    fill: "rgba(255,255,255,0.55)",
                  },
                },
              }}
              justifyContent="center"
              alignItems="center"
            >
              <PlusIcon height="25px" width="25px" />
            </Stack>
            <Stack width="300px" position="relative" flex={1} overflow="scroll">
              <Stack
                position="absolute"
                top={0}
                left={0}
                spacing="20px"
                sx={{ transform: "scale(0.2)", transformOrigin: "top left" }}
              >
                {canvases.map((c) => (
                  <Stack
                    key={c.id}
                    border={`20px solid ${
                      c.id === selectedCanvas
                        ? PALETTE.secondary.purple[2]
                        : "transparent"
                    }`}
                    onClick={() => setSelectedCanvas(c.id)}
                    sx={
                      c.id === selectedCanvas
                        ? undefined
                        : {
                            cursor: "pointer",
                            "&:hover": { opacity: 0.7 },
                            transition: "0.2s",
                          }
                    }
                  >
                    <Stack
                      sx={{
                        pointerEvents: "none",
                      }}
                    >
                      <Canvas elements={c.elements} noButtons />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
          <UrsorFadeIn duration={800} key={selectedCanvas}>
            <Canvas
              elements={
                canvases.find((c) => c.id === selectedCanvas)?.elements || []
              }
            />
          </UrsorFadeIn>
        </Stack>
      </Stack>
    </>
  );
}

export default FigmaPageContents;
