import { Stack } from "@mui/system";
import RocketIcon from "@/images/icons/RocketIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useRouter } from "next/navigation";
import UrsorDialog from "../components/UrsorDialog";
import { useContext, useEffect, useState } from "react";
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
import { IVideo } from "./AstroContentColumns";
import NotificationContext from "../components/NotificationContext";

const PLACEHOLDER_DURATION = 4000;

const VIDEO_WIDTH = 450; //390;
const VIDEO_HEIGHT = 246;

const extractUrl = (html: string) => html.split('src="')[1].split("?")[0];

const VideoCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  creationCallback?: (videoId: string) => void;
  editingCallback?: () => void;
  video?: IVideo;
  noPlayer?: boolean;
}) => {
  const router = useRouter();
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    props.video?.url && setUrl(props.video.url);
  }, [props.video?.url]);

  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    props.video?.title && setTitle(props.video.title);
  }, [props.video?.title]);

  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    props.video?.description && setDescription(props.video.description);
  }, [props.video?.description]);

  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const [showForbiddenVideoView, setShowForbiddenVideoView] =
    useState<boolean>(false);

  const [showInvalidUrlView, setShowInvalidUrlView] = useState<boolean>(false);

  const [originalUrl, setOriginalUrl] = useState<string>("");
  useEffect(
    () => props.video && setOriginalUrl(props.video.url),
    [props.video?.id]
  );

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
          !title && setTitle(details.title);
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
    !props.video && duration && setRange([0, duration]);
  }, [Math.floor((duration ?? 0) / 3)]);

  useEffect(() => {
    if (
      props.video &&
      _.isNumber(props.video?.startTime) &&
      props.video.endTime
    ) {
      setRange([props.video?.startTime, props.video.endTime]);
      setDuration(props.video.endTime - props.video.startTime);
    }
  }, [props.video?.id]);

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

  const notificationCtx = useContext(NotificationContext);
  const submitCreation = () => {
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

  const submitUpdate = () => {
    setLoading(true);
    props.video?.id &&
      ApiController.updateVideo(props.video.id, {
        title,
        description,
        url,
        thumbnailUrl,
        startTime: range?.[0],
        endTime: range?.[1],
      }).then(async (v) => {
        setLoading(false);
        props.editingCallback?.();
        props.closeCallback();
        notificationCtx.success("Video updated.");
      });
  };

  const [signupPromptDialogOpen, setSignupPromptDialogOpen] =
    useState<boolean>(false);

  const userDetails = useUserContext();

  return (
    <>
      <UrsorDialog
        supertitle={
          isMobile
            ? undefined
            : props.video
            ? "Edit safe video link"
            : "Create safe video link"
        }
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
        width={props.noPlayer ? "560px" : "926px"}
        maxWidth={props.noPlayer ? "560px" : "926px"}
        noPadding
        dynamicHeight
        paddingTop="52px"
        paddingX={isMobile ? undefined : "32px"}
      >
        <Stack
          flex={1}
          direction={isMobile || props.noPlayer ? "column" : "row"}
          spacing="40px"
          // width={isMobile ? "100%" : "95%"}
          overflow="hidden"
          px={isMobile ? "16px" : "40px"}
          py={isMobile ? "20px" : "40px"}
          boxSizing="border-box"
        >
          <Stack
            spacing="20px"
            flex={1}
            width={props.noPlayer ? "480px" : "358px"}
          >
            <Captioned text="Video URL">
              <Stack
                sx={{
                  opacity: props.video ? 0.5 : 1,
                  pointerEvents: props.video ? "none" : undefined,
                }}
              >
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
              </Stack>
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
                height={props.video ? "100px" : "179px"}
                boldValue
              />
            </Captioned>
            {isMobile || props.noPlayer ? (
              <TimeRange
                range={range}
                duration={duration}
                setRange={setRange}
                originalUrl={originalUrl}
              />
            ) : null}
          </Stack>
          {!isMobile ? (
            <Stack width={VIDEO_WIDTH} spacing="6px">
              {provider && !props.noPlayer ? (
                <Player
                  url={url}
                  provider={provider}
                  width={Math.min(playerWidth, VIDEO_WIDTH)}
                  height={
                    Math.min(playerWidth, VIDEO_WIDTH) *
                    (VIDEO_HEIGHT / VIDEO_WIDTH)
                  }
                  setDuration={(d) => {
                    d && setDuration(d);
                  }}
                  noKitemark
                  top="120px"
                  playingCallback={(p) => setPlaying(p)}
                  smallPlayIcon
                  noBackdrop
                />
              ) : null}
              {!props.noPlayer ? (
                <>
                  <TimeRange
                    range={range}
                    duration={duration}
                    setRange={setRange}
                    originalUrl={originalUrl}
                  />
                  <UrsorButton
                    onClick={() => {
                      props.video ? submitUpdate() : submitCreation();
                    }}
                    disabled={!url}
                    dark
                    variant="tertiary"
                    endIcon={props.video ? PencilIcon : RocketIcon}
                    width="100%"
                  >
                    {props.video ? "Update" : "Create"}
                  </UrsorButton>
                </>
              ) : null}
            </Stack>
          ) : null}
          {isMobile || props.noPlayer ? (
            <UrsorButton
              onClick={() => {
                props.video ? submitUpdate() : submitCreation();
              }}
              disabled={!url}
              dark
              variant="tertiary"
              endIcon={props.video ? PencilIcon : RocketIcon}
              width="100%"
            >
              {props.video ? "Update" : "Create"}
            </UrsorButton>
          ) : null}
        </Stack>
      </UrsorDialog>
      <VideoSignupPromptDialog
        open={signupPromptDialogOpen}
        closeCallback={() => setSignupPromptDialogOpen(false)}
        createCallback={submitCreation}
        //signinCallback={() => setLandInDashboardAfterCreation(true)}
        mobile={false}
      />
    </>
  );
};

export default VideoCreationDialog;
