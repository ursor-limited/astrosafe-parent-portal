import { Stack } from "@mui/system";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useRouter } from "next/navigation";
import UrsorDialog from "../components/UrsorDialog";
import { useContext, useEffect, useState } from "react";
import {
  PALETTE,
  Typography,
  UrsorButton,
  UrsorInputField,
  UrsorTextField,
} from "ui";
import Player from "../components/player";
import { deNoCookiefy } from "../components/utils";
import ApiController, { IVideo_DEPRECATED, IVideoComment } from "../api";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { useUserContext } from "../components/UserContext";
import VideoSignupPromptDialog from "../components/VideoSignupPromptDialog";
import _ from "lodash";
import { isMobile } from "react-device-detect";
import NotificationContext from "../components/NotificationContext";
import { extractUrl } from "./VideoCreationDialog";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";

export const VIDEO_WIDTH = 940; //390;
//export const VIMEO_VIDEO_WIDTH = 970; //390;
export const VIDEO_HEIGHT = 522;

const MobileVideoCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  creationCallback?: (videoId: string, title: string) => void;
  editingCallback?: () => void;
  video?: IVideo_DEPRECATED;
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
      comments,
    }).then(async (v) => {
      setLoading(false);
      setFreeVideoCreationCount(freeVideoCreationCount + 1);
      !userDetails.user && setFreeVideoIds([...freeVideoIds, v.id]);
      props.creationCallback
        ? props.creationCallback(v.id, v.title)
        : router.push(`/video/${v.id}`);
      setTitle("");
      setDescription("");
      setUrl("");
      setOriginalUrl("");
      setSelectedTab("details");
      setComments([]);
      setRange(undefined);
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
        startTime: range?.[0],
        endTime: range?.[1],
        comments,
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

  const [comments, setComments] = useState<IVideoComment[]>([]);
  useEffect(() => {
    props.video?.comments && setComments(props.video.comments);
  }, [props.video?.comments]);

  const [playerWidthRef, setPlayerWidthRef] = useState<HTMLElement | null>(
    null
  );

  const [playerWidth, setPlayerWidth] = useState<number>(VIDEO_WIDTH);
  useEffect(
    () =>
      setPlayerWidth(
        playerWidthRef?.getBoundingClientRect().width ?? VIDEO_WIDTH
      ),
    [playerWidthRef?.getBoundingClientRect().width]
  );

  const [playing, setPlaying] = useState<boolean>(false);

  const [playerContainerRef, setPlayerContainerRef] =
    useState<HTMLElement | null>(null);

  const [playerContainerWidth, setPlayerContainerWidth] =
    useState<number>(VIDEO_WIDTH);
  const [playerContainerHeight, setPlayerContainerHeight] =
    useState<number>(VIDEO_HEIGHT);
  useEffect(() => {
    setPlayerContainerWidth(
      playerContainerRef?.getBoundingClientRect().width ?? VIDEO_WIDTH
    );
    setPlayerContainerHeight(
      playerContainerRef?.getBoundingClientRect().height ?? VIDEO_HEIGHT
    );
  }, [
    playerContainerRef?.getBoundingClientRect().width,
    playerContainerRef?.getBoundingClientRect().height,
  ]);

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
        <Stack width="100%" spacing="24px" p="12px" boxSizing="border-box">
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

              <Stack
                ref={setPlayerContainerRef}
                width="100%"
                height={playerContainerWidth * (VIDEO_HEIGHT / VIDEO_WIDTH)}
                position="relative"
              >
                <Stack position="absolute" top={0} left={0}>
                  <Player
                    playerId="creation"
                    url={url}
                    provider={provider}
                    width={
                      playerContainerWidth - (provider === "youtube" ? 0 : 10)
                    }
                    height={playerContainerHeight}
                    setDuration={(d) => {
                      d && setDuration(d);
                    }}
                    startTime={range?.[0] ?? 0}
                    endTime={range?.[1] ?? 10}
                    noKitemark
                    playingCallback={setPlaying}
                    smallPlayIcon
                    noBackdrop
                    noUrlStartTime
                  />
                </Stack>
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
                  height={isMobile ? "60px" : "334px"}
                  boldValue
                />
              </Captioned>
            </Stack>
            <Stack
              ref={setPlayerWidthRef}
              width="100%"
              //height={`${isMobile ? 0 : VIDEO_HEIGHT}px`}
              overflow={isMobile ? "hidden" : undefined}
              position="relative"
            >
              {showForbiddenVideoView ? (
                <Stack
                  width="91%"
                  height={`${isMobile ? 0 : VIDEO_HEIGHT}px`}
                  position="absolute"
                  bgcolor="rgba(0,0,0,0.5)"
                  borderRadius="12px"
                  left={0}
                  zIndex={5}
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
              <Stack flex={1} justifyContent="flex-end" alignItems="flex-end">
                <UrsorButton
                  onClick={() =>
                    props.video ? submitUpdate() : submitCreation()
                  }
                  disabled={!url}
                  dark
                  variant="tertiary"
                  endIcon={PencilIcon}
                  width="100%"
                >
                  Publish
                </UrsorButton>
              </Stack>
            </Stack>
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

export default MobileVideoCreationDialog;
