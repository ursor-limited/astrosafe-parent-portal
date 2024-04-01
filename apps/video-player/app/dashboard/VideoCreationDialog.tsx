import { Stack } from "@mui/system";
import RocketIcon from "@/images/icons/RocketIcon.svg";
import { useRouter } from "next/navigation";
import UrsorDialog from "../components/UrsorDialog";
import { useEffect, useState } from "react";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import {
  PALETTE,
  Typography,
  UrsorButton,
  UrsorInputField,
  UrsorTextField,
} from "ui";
import { Slider } from "@mui/material";
import DurationLabel from "../editor/duration-label";
import Player from "../components/player";
import { deNoCookiefy } from "../components/utils";
import ApiController from "../api";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import SignupPromptDialog from "./SignupPromptDialog";
import { useUserContext } from "../components/UserContext";
import VideoSignupPromptDialog from "../components/VideoSignupPromptDialog";
import _ from "lodash";
import { isMobile } from "react-device-detect";
import TimeRange from "./TimeRange";

const PLACEHOLDER_DURATION = 4000;

const VIDEO_WIDTH = 450; //390;
const VIDEO_HEIGHT = 246;

const extractUrl = (html: string) => html.split('src="')[1].split("?")[0];

const VideoCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  creationCallback?: (videoId: string) => void;
}) => {
  const router = useRouter();
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const [showForbiddenVideoView, setShowForbiddenVideoView] =
    useState<boolean>(false);

  const [showInvalidUrlView, setShowInvalidUrlView] = useState<boolean>(false);

  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [provider, zetProvider] = useState<"youtube" | "vimeo" | undefined>(
    undefined
  );

  useEffect(
    () => zetProvider(originalUrl.includes("vimeo") ? "vimeo" : "youtube"),
    [originalUrl]
  );
  useEffect(() => {
    fetch(
      `https://noembed.com/embed?url=${encodeURIComponent(
        deNoCookiefy(originalUrl.replace("/shorts/", "/embed/"))
      )}`
    )
      .then((response) => response.json())
      .then((details) => {
        if (!details.html) {
          setShowInvalidUrlView(true);
        } else if (details.error?.includes("403")) {
          setShowForbiddenVideoView(true);
        } else {
          setUrl(deNoCookiefy(extractUrl(details.html)));
          setTitle(details.title);
          //setDescription(details.description); // vimeo has the description here; youtube requires the youtube api
          setThumbnailUrl(details.thumbnail_url);
        }
      })
      .catch(() => setShowInvalidUrlView(true));
  }, [originalUrl]);

  const [playing, setPlaying] = useState<boolean>(false);
  useEffect(() => {
    setPlaying(false);
    provider === "youtube" &&
      ApiController.getYoutubeVideoDetails(url.split("/").slice(-1)[0]).then(
        (result) => {
          //setDescription(result.description);
          setThumbnailUrl(result.thumbnailUrl);
        }
      );
  }, [url]);

  const [duration, setDuration] = useState<number | undefined>(10);
  const [range, setRange] = useState<[number, number] | undefined>(undefined);
  useEffect(() => {
    duration && setRange([0, duration]);
  }, [Math.floor((duration ?? 0) / 3)]);

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

  const [loading, setLoading] = useState<boolean>(false);

  const [freeVideoCreationCount, setFreeVideoCreationCount] =
    useLocalStorage<number>("freeVideoCreationCount", 0);
  const [freeVideoIds, setFreeVideoIds] = useLocalStorage<string[]>(
    "freeVideoIds",
    []
  );

  const submit = () => {
    setLoading(true);
    ApiController.createVideo({
      title,
      description,
      url,
      thumbnailUrl,
      startTime: range?.[0],
      endTime: range?.[1],
      creatorId: userDetails.user?.id,
    }).then(async (v) => {
      setLoading(false);
      setFreeVideoCreationCount(freeVideoCreationCount + 1);
      setFreeVideoIds([...freeVideoIds, v.id]);
      props.creationCallback
        ? props.creationCallback(v.id)
        : router.push(`/video/${v.id}`);
      props.closeCallback();
    });
  };

  const [signupPromptDialogOpen, setSignupPromptDialogOpen] =
    useState<boolean>(false);

  const [landInDashboardAfterCreation, setLandInDashboardAfterCreation] =
    useLocalStorage<boolean>("landInDashboardAfterCreation", false);

  const userDetails = useUserContext();

  return (
    <>
      <UrsorDialog
        supertitle={isMobile ? undefined : "Create safe video link"}
        open={props.open}
        // button={{
        //   text: "Create",
        //   callback: () => {
        //     // !userDetails.user ? setSignupPromptDialogOpen(true) : submit();
        //     submit();
        //   },
        //   icon: RocketIcon,
        //   disabled: !url,
        // }}
        onCloseCallback={props.closeCallback}
        width="926px"
        maxWidth="926px"
        noPadding
        dynamicHeight
        paddingTop="52px"
        paddingX={isMobile ? undefined : "32px"}
      >
        <Stack
          flex={1}
          direction={isMobile ? "column" : "row"}
          spacing="40px"
          // width={isMobile ? "100%" : "95%"}
          overflow="hidden"
          px={isMobile ? "16px" : "40px"}
          py={isMobile ? "20px" : "40px"}
          boxSizing="border-box"
        >
          <Stack spacing="20px" flex={1} width="358px">
            <Captioned text="Video URL">
              <UrsorInputField
                value={originalUrl}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setOriginalUrl(event.target.value)
                }
                placeholder="Youtube or Vimeo"
                width="100%"
                leftAlign
                boldValue
              />
            </Captioned>

            <Stack
              height="2px"
              width="100%"
              bgcolor={PALETTE.secondary.grey[2]}
            />

            <Captioned text="Title">
              <UrsorInputField
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(event.target.value)
                }
                placeholder="Title"
                width="100%"
                leftAlign
                boldValue
              />
            </Captioned>
            <Captioned text="Description">
              <UrsorTextField
                value={description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(event.target.value)
                }
                placeholder="Optional"
                width="100%"
                height="179px"
                boldValue
              />
            </Captioned>
            {isMobile ? <TimeRange setRange={setRange} /> : null}
          </Stack>
          {!isMobile ? (
            <Stack
              width={VIDEO_WIDTH}
              //height={VIDEO_HEIGHT}
              spacing="6px"
            >
              {provider ? (
                <Player
                  url={url}
                  provider={provider}
                  width={Math.min(playerWidth, VIDEO_WIDTH)}
                  height={
                    Math.min(playerWidth, VIDEO_WIDTH) *
                    (VIDEO_HEIGHT / VIDEO_WIDTH)
                  }
                  setDuration={(d) => d && setDuration(d)}
                  noKitemark
                  top="120px"
                  playingCallback={(p) => setPlaying(p)}
                  smallPlayIcon
                  noBackdrop
                />
              ) : null}
              {/* <Typography maxLines={2} bold>
                {title}
              </Typography>
              <Stack flex={1} overflow="hidden">
                <Typography variant="small" maxLines={2}>
                  {description}
                </Typography>
              </Stack> */}
              <TimeRange
                range={range}
                duration={duration}
                setRange={setRange}
                originalUrl={originalUrl}
              />
              <UrsorButton
                onClick={() => {
                  submit();
                }}
                disabled={!url}
                dark
                variant="tertiary"
                endIcon={RocketIcon}
                width="100%"
              >
                Create
              </UrsorButton>
            </Stack>
          ) : null}
          {isMobile ? (
            <UrsorButton
              onClick={() => {
                submit();
              }}
              disabled={!url}
              dark
              variant="tertiary"
              endIcon={RocketIcon}
              width="100%"
            >
              Create
            </UrsorButton>
          ) : null}
        </Stack>
      </UrsorDialog>
      <VideoSignupPromptDialog
        open={signupPromptDialogOpen}
        closeCallback={() => setSignupPromptDialogOpen(false)}
        createCallback={submit}
        //signinCallback={() => setLandInDashboardAfterCreation(true)}
        mobile={false}
      />
    </>
  );
};

export default VideoCreationDialog;
