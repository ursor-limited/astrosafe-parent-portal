"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { IVideo } from "@/app/api";
import dynamic from "next/dynamic";
import { PALETTE, Typography, UrsorButton } from "ui";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { useWindowSize } from "usehooks-ts";
import { useAuth0 } from "@auth0/auth0-react";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import NotificationContext from "@/app/components/NotificationContext";
import moment from "moment";
import mixpanel from "mixpanel-browser";

export const MAGICAL_BORDER_THICKNESS = 1.8;
export const HIDE_LOGO_PLAYER_WIDTH_THRESHOLD = 500;

const Player = dynamic(
  () => import("@/app/components/player"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const UrlBar = dynamic(
  () => import("@/app/components/url-bar"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const VIDEO_WIDTH = 845;
const VIDEO_HEIGHT = 475;

const GRADIENT = "linear-gradient(178deg, #F279C5, #FD9B41)";
const SigninPromptBar = (props: { signInCallback: () => void }) => (
  <Stack
    position="fixed"
    zIndex={999999}
    width="100%"
    height="76px"
    justifyContent="center"
    alignItems="center"
    sx={{ background: GRADIENT }}
    direction="row"
    spacing="20px"
  >
    <Typography variant="large" bold color={PALETTE.font.light}>
      Sign in within 30 min to save and share your Safe Video.
    </Typography>
    <UrsorButton
      dark
      endIcon={PersonIcon}
      fontColor="#F88A83"
      onClick={props.signInCallback}
    >
      Sign in
    </UrsorButton>
  </Stack>
);

function VideoPageContents(props: { details: IVideo }) {
  const { user, loginWithPopup } = useAuth0();

  const notificationCtx = React.useContext(NotificationContext);

  const provider = props.details?.url.includes("vimeo") ? "vimeo" : "youtube";
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const [playing, setPlaying] = useState<boolean>(false);

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

  useEffect(() => {
    moment().diff(props.details.createdAt, "seconds") < 10 &&
      notificationCtx.success("Video created.");
  }, [props.details.createdAt]);

  useEffect(() => {
    mixpanel.init(
      process.env.NEXT_PUBLIC_REACT_APP_MIXPANEL_PROJECT_TOKEN as string,
      {
        debug: true,
        track_pageview: false,
        persistence: "localStorage",
      }
    );
  }, []);

  useEffect(() => {
    user?.email && mixpanel.track("viewing page");
  }, [user?.email]);

  return props.details && provider ? (
    <Stack flex={1} spacing="50px" justifyContent="center">
      {/* {!user ? (
        <UrsorFadeIn duration={1000} delay={3000}>
          <SigninPromptBar signInCallback={loginWithPopup} />
        </UrsorFadeIn>
      ) : null} */}
      {!fullscreen ? <Header createNewButton={!user} mobile={mobile} /> : null}
      <Stack
        px="60px"
        justifyContent="center"
        alignItems="center"
        position="relative"
        // height={`calc(100vh - ${HEADER_HEIGHT}px)`}
        // minHeight={`calc(100vh - ${HEADER_HEIGHT}px)`}
        width="100vw"
        pb={!fullscreen ? "100px" : undefined}
        //overflow="scroll"
        spacing="14px"
      >
        <Stack
          spacing="18px"
          alignItems="center"
          // py={fullscreen ? 0 : "24px"}
          //px="28px"
          //borderRadius="12px"
          //bgcolor="rgba(0,0,0,0.15)"
          // sx={{
          //   backdropFilter: "blur(7px)",
          // }}
        >
          {!fullscreen ? (
            <Stack
              // sx={{
              //   background: `linear-gradient(45deg, #FFFFFF, ${PALETTE.secondary.purple[2]})`,
              //   "-webkit-text-fill-color": "transparent",
              //   backgroundClip: "text",
              //   "-webkit-background-clip": "text",
              // }}
              width={
                Math.min(playerWidth, VIDEO_WIDTH) -
                2 * MAGICAL_BORDER_THICKNESS
              }
              sx={{
                opacity: 0.78,
              }}
              alignItems="center"
            >
              <Typography
                bold
                variant={
                  props.details.title.length < 10
                    ? "h0"
                    : props.details.title.length < 18
                    ? "h2"
                    : props.details.title.length < 25
                    ? "h3"
                    : props.details.title.length < 35
                    ? "h4"
                    : "h5"
                }
                color={PALETTE.font.light}
                sx={{
                  textAlign: "center",
                }}
              >
                {props.details.title}
              </Typography>
            </Stack>
          ) : null}
          <Stack
            width={fullscreen ? "100vw" : "90vw"}
            boxSizing="border-box"
            ref={setPlayerWidthRef}
          >
            <Stack
              p={`${MAGICAL_BORDER_THICKNESS}px`}
              borderRadius="15px"
              sx={{ backdropFilter: "none" }}
              position="relative"
            >
              <Stack
                top="50%"
                left="50%"
                borderRadius="15px"
                width={Math.min(playerWidth, VIDEO_WIDTH)}
                height="100%"
                position="absolute"
                sx={{
                  transform: "translate(-50%, -50%)",
                  opacity: playing ? 0 : 1,
                  transition: "0.3s",
                  background: fullscreen
                    ? "none"
                    : "linear-gradient(90deg, #F279C5, #FD9B41)",
                }}
              />
              {/* <Stack width="100vw" px="30px"> */}
              <Player
                key={props.details.id}
                url={props.details.url}
                provider={provider}
                startTime={props.details.startTime}
                endTime={props.details.endTime}
                noKitemark={mobile}
                width={
                  Math.min(playerWidth, VIDEO_WIDTH) -
                  2 * MAGICAL_BORDER_THICKNESS
                }
                height={
                  Math.min(playerWidth, VIDEO_WIDTH) *
                  (VIDEO_HEIGHT / VIDEO_WIDTH)
                }
                top="0px"
                setDuration={(d) => setDuration(d)}
                showUrlBar
                setFullscreen={setFullscreen}
                playingCallback={(p) => setPlaying(p)}
                mobile={mobile}
              />
            </Stack>
          </Stack>
          {!fullscreen && user ? (
            <Stack width={Math.min(playerWidth, VIDEO_WIDTH)}>
              <UrlBar mobile={mobile} />
            </Stack>
          ) : null}
          {/* </Stack> */}
          {/* <Image src={Background} alt='Background'  */}
          {/* <Stack width={`${VIDEO_WIDTH}px`} height={`${VIDEO_HEIGHT + 90}px`} /> */}
          {!fullscreen && props.details.description ? (
            <Stack
              width={`${Math.min(playerWidth, VIDEO_WIDTH)}px`}
              justifyContent="space-between"
              overflow="scroll"
              //px="16px"
              sx={{ backdropFilter: "blur(7px)" }}
            >
              <Stack
                py="20px"
                px="30px"
                bgcolor={"rgba(0,0,0,0.2)"}
                borderRadius="12px"
              >
                <Stack spacing="5px">
                  {(props.details.description?.split("\n") ?? []).map(
                    (line, i) => (
                      <Typography key={i} color="rgba(255,255,255,0.8)">
                        {line}
                      </Typography>
                    )
                  )}
                </Stack>
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </Stack>
      {!fullscreen ? (
        <Footer fontScale={Math.min(playerWidth, VIDEO_WIDTH) / VIDEO_WIDTH} />
      ) : null}
    </Stack>
  ) : (
    <></>
  );
}

export default VideoPageContents;
