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
  creationCallback?: (videoId: string, title: string) => void;
  editingCallback?: () => void;
  video?: IVideo;
}) => {
  const router = useRouter();

  const [video, setVideo] = useState<IVideo | undefined>();
  useEffect(() => setVideo(props.video), [props.video]);

  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    video?.url && setUrl(video.url);
  }, [video?.url]);

  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    video?.title && setTitle(video.title);
  }, [video?.title]);

  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    video?.description && setDescription(video.description);
  }, [video?.description]);

  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const [showForbiddenVideoView, setShowForbiddenVideoView] =
    useState<boolean>(false);

  const [showInvalidUrlView, setShowInvalidUrlView] = useState<boolean>(false);

  const [originalUrl, setOriginalUrl] = useState<string>("");
  useEffect(() => video && setOriginalUrl(video.url), [video?.url]);

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
    !video && duration && setRange([0, duration]);
  }, [Math.floor((duration ?? 0) / 3)]);

  useEffect(() => {
    if (video && _.isNumber(video?.startTime) && video.endTime) {
      setRange([video?.startTime, video.endTime]);
      setDuration(video.endTime - video.startTime);
    }
  }, [video?.id]);

  const { width } = useWindowSize();

  const [loading, setLoading] = useState<boolean>(false);

  const clear = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setOriginalUrl("");
    setSelectedTab("details");
    setComments([]);
    setRange(undefined);
  };

  const notificationCtx = useContext(NotificationContext);
  const submitCreation = () => {
    setLoading(true);
    return ApiController.createVideo({
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
      setVideo(v);
      // setFreeVideoCreationCount(freeVideoCreationCount + 1);
      // !userDetails.user && setFreeVideoIds([...freeVideoIds, v.id]);
      props.creationCallback
        ? props.creationCallback(v.id, v.title)
        : router.push(`/video/${v.id}`);
      // clear();
      notificationCtx.success("Created Safe Video Link");
    });
  };

  const submitUpdate = () => {
    setLoading(true);
    return (
      video &&
      ApiController.updateVideo(video.id, {
        title,
        description,
        startTime: range?.[0],
        endTime: range?.[1],
        comments,
      }).then(async (v) => {
        setLoading(false);
        props.editingCallback?.();
        // props.closeCallback();
        notificationCtx.success("Video updated.");
      })
    );
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
    video?.comments && setComments(video.comments);
  }, [video?.comments]);

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
                onClick={() => {
                  setSelectedTab("comments"); // sumit creation here
                  video
                    ? submitUpdate()
                    : submitCreation().then(() => setSelectedTab("comments"));
                }}
                sx={{
                  opacity: !url ? 0.5 : 1,
                  pointerEvents: url ? undefined : "none",
                }}
              >
                <VideoCreationDialogTabButton
                  text="Add Comments"
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
                video={video}
                title={title}
                setTitle={setTitle}
                setEditedTitle={() => setEditedTitle(true)}
                description={description}
                setDescription={setDescription}
                mainButtonCallback={() => {
                  setSelectedTab("comments"); // sumit creation here
                  video
                    ? submitUpdate()
                    : submitCreation().then(() => setSelectedTab("comments"));
                }}
                mainButtonText={props.video ? "Update" : "Publish"}
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
                video={video}
                mainButtonCallback={() =>
                  submitUpdate()?.then(props.closeCallback)
                }
                mainButtonText={props.video ? "Update" : "Publish"}
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
