import { Stack } from "@mui/system";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import CommentIcon from "@/images/icons/CommentIcon.svg";
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
import Player from "../components/player";
import { deNoCookiefy } from "../components/utils";
import ApiController from "../api";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { useUserContext } from "../components/UserContext";
import VideoSignupPromptDialog from "../components/VideoSignupPromptDialog";
import _ from "lodash";
import { isMobile } from "react-device-detect";
import { IVideo } from "./AstroContentColumns";
import NotificationContext from "../components/NotificationContext";
import TimeRange from "./TimeRange";

export const VIDEO_WIDTH = 778; //390;
export const VIDEO_HEIGHT = 428;

const VideoCreationDialogTabButton = (props: {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  selected: boolean;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      height="42px"
      direction="row"
      spacing="8px"
      alignItems="center"
      justifyContent="center"
      paddingX="16px"
      borderRadius="8px"
      bgcolor={PALETTE.secondary.grey[1]}
      sx={{
        cursor: "pointer",
        // outline: `2px solid ${
        //   hovering ? PALETTE.secondary.purple[2] : "transparent"
        // }`,
        transition: "0.2s",
        svg: {
          path: {
            fill: props.selected
              ? PALETTE.secondary.purple[2]
              : hovering
              ? PALETTE.secondary.purple[1]
              : PALETTE.secondary.grey[4],
          },
        },
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <props.icon height="20px" width="20px" />
      <Typography
        bold
        variant="medium"
        color={
          props.selected
            ? PALETTE.secondary.purple[2]
            : hovering
            ? PALETTE.secondary.purple[1]
            : PALETTE.secondary.grey[4]
        }
        sx={{
          transition: "0.2s",
        }}
      >
        {props.text}
      </Typography>
    </Stack>
  );
};

const extractUrl = (html: string) => html.split('src="')[1].split("?")[0];

const VideoCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  creationCallback?: (videoId: string) => void;
  editingCallback?: () => void;
  video?: IVideo;
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
        if (
          !details.html ||
          details.error?.includes("403") ||
          details.error?.includes("401")
        ) {
          setShowForbiddenVideoView(true);
        } else {
          setShowForbiddenVideoView(false);
          setUrl(deNoCookiefy(extractUrl(details.html)));
          !editedTitle && setTitle(details.title);
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
      !userDetails.user && setFreeVideoIds([...freeVideoIds, v.id]);
      props.creationCallback
        ? props.creationCallback(v.id)
        : router.push(`/video/${v.id}`);
      setTitle("");
      setDescription("");
      setUrl("");
      setOriginalUrl("");
      props.closeCallback();
      notificationCtx.success("Created Safe Video Link");
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

  const [editedTitle, setEditedTitle] = useState<boolean>(false);

  const [selectedTab, setSelectedTab] = useState<"details" | "comments">(
    "details"
  );

  return (
    <>
      <UrsorDialog
        open={props.open}
        onCloseCallback={props.closeCallback}
        width="1308px"
        maxWidth="1308px"
        noPadding
        dynamicHeight
        paddingY={isMobile ? "0px" : "40px"}
        paddingX={isMobile ? undefined : "40px"}
        noCloseButton={isMobile}
      >
        <Stack width="100%" spacing="24px">
          <Stack direction="row" spacing="12px">
            <Stack onClick={() => setSelectedTab("details")}>
              <VideoCreationDialogTabButton
                text="Video details"
                icon={PencilIcon}
                selected={selectedTab === "details"}
              />
            </Stack>
            <Stack onClick={() => setSelectedTab("comments")}>
              <VideoCreationDialogTabButton
                text="Comments"
                icon={CommentIcon}
                selected={selectedTab === "comments"}
              />
            </Stack>
          </Stack>
          <Stack
            flex={1}
            direction={isMobile ? "column" : "row"}
            spacing="40px"
            width="100%"
            overflow="hidden"
            // px={isMobile ? "20px" : "40px"}
            // py={isMobile ? "20px" : "40px"}
            boxSizing="border-box"
          >
            <Stack spacing="18px" flex={1} width="100%">
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
                    autoFocus={!props.video}
                  />
                </Stack>
              </Captioned>

              <Stack height="20px" justifyContent="center" width="100%">
                <Stack
                  width="100%"
                  height="2px"
                  bgcolor={PALETTE.secondary.grey[2]}
                />
              </Stack>

              <Captioned text="Title">
                <UrsorInputField
                  value={title}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(event.target.value);
                    setEditedTitle(true);
                  }}
                  placeholder="Title"
                  width="100%"
                  leftAlign
                  boldValue
                  autoFocus={!!props.video}
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
                  height={isMobile ? "60px" : "356px"}
                  boldValue
                />
              </Captioned>
            </Stack>
            <Stack
              width={isMobile ? 0 : VIDEO_WIDTH}
              height={isMobile ? 0 : undefined}
              overflow={isMobile ? "hidden" : undefined}
              spacing="6px"
              position="relative"
            >
              {showForbiddenVideoView ? (
                <Stack
                  flex={1}
                  position="absolute"
                  bgcolor="rgba(0,0,0,0.5)"
                  top="20px"
                  left={0}
                  zIndex={5}
                  height="220px"
                  justifyContent="center"
                  alignItems="center"
                  px="40px"
                >
                  <Typography
                    color="rgb(255,255,255)"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Unfortunately, this video is not available to be embedded in
                    3rd party platforms.
                  </Typography>
                  <Typography
                    color="rgb(255,255,255)"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Please try another video.
                  </Typography>
                </Stack>
              ) : null}
              {provider ? (
                <Player
                  playerId="creation"
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
                  startTime={range?.[0] ?? 0}
                  endTime={range?.[1] ?? 10}
                  noKitemark
                  playingCallback={(p) => setPlaying(p)}
                  smallPlayIcon
                  noBackdrop
                />
              ) : null}
              {/* <TimeRange
              range={range}
              duration={duration}
              setRange={setRange}
              originalUrl={originalUrl}
            /> */}
              <Stack flex={1} justifyContent="flex-end" alignItems="flex-end">
                <UrsorButton
                  onClick={() => {
                    props.video ? submitUpdate() : submitCreation();
                  }}
                  disabled={!url}
                  dark
                  variant="tertiary"
                  endIcon={props.video ? PencilIcon : ChevronRightIcon}
                  width="264px"
                >
                  Next
                </UrsorButton>
              </Stack>
            </Stack>
            {isMobile ? (
              <UrsorButton
                onClick={() => {
                  props.video ? submitUpdate() : submitCreation();
                }}
                disabled={!url}
                dark
                variant="tertiary"
                endIcon={props.video ? PencilIcon : ChevronRightIcon}
                width="100%"
              >
                Next
              </UrsorButton>
            ) : null}
          </Stack>
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
