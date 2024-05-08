import { Stack } from "@mui/system";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import MultipleCommentsIcon from "@/images/icons/MultipleCommentsIcon.svg";
import { useRouter } from "next/navigation";
import UrsorDialog from "../components/UrsorDialog";
import { useContext, useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";
import Player from "../components/player";
import { deNoCookiefy } from "../components/utils";
import ApiController, { IVideo, IVideoComment } from "../api";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { useUserContext } from "../components/UserContext";
import VideoSignupPromptDialog from "../components/VideoSignupPromptDialog";
import _ from "lodash";
import { isMobile } from "react-device-detect";
import NotificationContext from "../components/NotificationContext";
import TimeRange from "./TimeRange";
import VideoDialogDetailsTab from "./VideoDialogDetailsTab";
import VideoDialogCommentsTab from "./VideoDialogCommentsTab";
import MobileVideoCreationDialog from "./MobileVideoCreationDialog";

export const VIDEO_WIDTH = 880; //390;
//export const VIMEO_VIDEO_WIDTH = 970; //390;
export const VIDEO_HEIGHT = 522;

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

        svg: {
          path: {
            transition: "0.2s",
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

export const extractUrl = (html: string) =>
  html.split('src="')[1].split("?")[0];

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

  useEffect(() => {
    originalUrl &&
      zetProvider(originalUrl.includes("vimeo") ? "vimeo" : "youtube");
  }, [originalUrl]);
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
        ? props.creationCallback(v.id)
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

  return (
    <>
      {isMobile ? (
        <MobileVideoCreationDialog {...props} />
      ) : (
        <UrsorDialog
          open={props.open}
          onCloseCallback={props.closeCallback}
          width="1308px"
          maxWidth="1308px"
          noPadding
          height="780px"
          paddingY={isMobile ? "0px" : "40px"}
          paddingX={isMobile ? undefined : "40px"}
          noCloseButton={isMobile}
        >
          <Stack width="100%" flex={1} spacing="24px" overflow="hidden">
            <Stack direction="row" spacing="12px">
              <Stack onClick={() => setSelectedTab("details")}>
                <VideoCreationDialogTabButton
                  text="Video details"
                  icon={PencilIcon}
                  selected={selectedTab === "details"}
                />
              </Stack>
              <Stack
                onClick={() => setSelectedTab("comments")}
                sx={{
                  opacity: !url ? 0.5 : 1,
                  pointerEvents: url ? undefined : "none",
                }}
              >
                <VideoCreationDialogTabButton
                  text="Comments"
                  icon={MultipleCommentsIcon}
                  selected={selectedTab === "comments"}
                />
              </Stack>
            </Stack>
            {selectedTab === "details" ? (
              <VideoDialogDetailsTab
                url={url}
                originalUrl={originalUrl}
                setOriginalUrl={setOriginalUrl}
                video={props.video}
                title={title}
                setTitle={setTitle}
                setEditedTitle={() => setEditedTitle(true)}
                description={description}
                setDescription={setDescription}
                mainButtonCallback={() => {
                  setSelectedTab("comments");
                }}
                showForbiddenVideoView={showForbiddenVideoView}
                provider={provider}
                setDuration={setDuration}
                range={range}
                setThumbnailUrl={setThumbnailUrl}
              />
            ) : (
              <VideoDialogCommentsTab
                url={url}
                originalUrl={originalUrl}
                setOriginalUrl={setOriginalUrl}
                video={props.video}
                mainButtonCallback={() => {
                  props.video ? submitUpdate() : submitCreation();
                }}
                provider={provider}
                duration={duration}
                setDuration={setDuration}
                range={range}
                setRange={setRange}
                setThumbnailUrl={setThumbnailUrl}
                comments={comments}
                setComments={setComments}
              />
            )}
          </Stack>
        </UrsorDialog>
      )}
      <VideoSignupPromptDialog
        open={signupPromptDialogOpen}
        closeCallback={() => setSignupPromptDialogOpen(false)}
        createCallback={submitCreation}
        mobile={false}
      />
    </>
  );
};

export default VideoCreationDialog;
