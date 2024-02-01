"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { IVideo } from "@/app/api";
import dynamic from "next/dynamic";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { useWindowSize } from "usehooks-ts";
import { useAuth0 } from "@auth0/auth0-react";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import ChevronRight from "@/images/icons/ChevronRight.svg";

export const MAGICAL_BORDER_THICKNESS = 1.8;
export const HIDE_LOGO_PLAYER_WIDTH_THRESHOLD = 500;

const FREE_VIDEO_LIMIT = 3;

const VIDEO_WIDTH = 845;
const VIDEO_HEIGHT = 475;

const GRADIENT = "linear-gradient(150deg, #F279C5, #FD9B41)";

function DashboardPageContents() {
  const { width } = useWindowSize();

  const [playerWidthRef, setPlayerWidthRef] = useState<HTMLElement | null>(
    null
  );

  const [playerWidth, setPlayerWidth] = useState<number>(VIDEO_WIDTH);
  useEffect(
    () =>
      setPlayerWidth(
        playerWidthRef?.getBoundingClientRect().width ?? VIDEO_WIDTH
      ),
    [playerWidthRef, width]
  );

  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => setMobile(playerWidth < VIDEO_WIDTH), [playerWidth]);

  const { user, loginWithPopup } = useAuth0();

  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <Header
        noCreateNew
        noDiscover={playerWidth < HIDE_LOGO_PLAYER_WIDTH_THRESHOLD}
      />
      <Stack spacing="40px" alignItems="center" pt="40px">
        <Stack spacing="20px" alignItems="center">
          <Stack
            sx={{
              background: GRADIENT,
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
            alignItems="center"
          >
            <Typography variant="h1" color={PALETTE.font.light}>
              Your SafeTube Dashboard
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing="19px">
            <Stack direction="row" alignItems="center" spacing="6px">
              <Typography
                variant="large"
                bold
                color={PALETTE.font.light}
              >{`${2}/${FREE_VIDEO_LIMIT}`}</Typography>
              <Typography variant="large" bold color="rgba(255,255,255,0.7)">
                videos created
              </Typography>
            </Stack>
            <UrsorButton size="small" dark>
              Upgrade
            </UrsorButton>
          </Stack>
        </Stack>
        <Stack direction="row" spacing="10px">
          <UrsorInputField
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(event.target.value)
            }
            placeholder="Enter Youtube or Vimeo URL"
            width="645px"
            leftAlign
            boldValue
          />
          <Stack
            sx={{
              opacity: inputValue ? 1 : 0.5,
              pointerEvents: inputValue ? undefined : "none",
            }}
          >
            <UrsorButton
              backgroundColor={GRADIENT}
              hoverOpacity={0.7}
              endIcon={ChevronRight}
              iconColor={PALETTE.font.light}
            >
              Create Video
            </UrsorButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default DashboardPageContents;
