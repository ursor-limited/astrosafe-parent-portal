import { Stack } from "@mui/system";
import { isMobile } from "react-device-detect";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import {
  PALETTE,
  Typography,
  UrsorButton,
  UrsorInputField,
  UrsorTextField,
} from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "./VideoCreationDialog";
import Player from "../components/player";
import { useEffect, useState } from "react";
import ApiController, { IVideo } from "../api";

const VideoDialogDetailsTab = (props: {
  url: string;
  originalUrl: string;
  setOriginalUrl: (url: string) => void;
  video?: IVideo;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  setEditedTitle: () => void;
  mainButtonCallback: () => void;
  showForbiddenVideoView: boolean;
  provider?: "youtube" | "vimeo";
  setDuration: (duration: number) => void;
  range?: [number, number];
  setThumbnailUrl: (url: string) => void;
  //setPlaying?: (playing: boolean) => void;
}) => {
  const [playing, setPlaying] = useState<boolean>(false);
  useEffect(() => {
    setPlaying(false);
    props.provider === "youtube" &&
      ApiController.getYoutubeVideoDetails(
        props.url.split("/").slice(-1)[0]
      ).then((result) => {
        //setDescription(result.description);
        props.setThumbnailUrl(result.thumbnailUrl);
      });
  }, [props.url]);

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

  const [playerHeight, setPlayerHeight] = useState<number>(0);
  const [playerWidth, setPlayerWidth] = useState<number>(0);
  useEffect(() => {
    if (
      playerContainerWidth /
        playerContainerWidth /
        (VIDEO_WIDTH / VIDEO_HEIGHT) <
      1
    ) {
      setPlayerWidth(
        Math.min(
          playerContainerHeight * // - (props.provider === "youtube" ? 0 : 10)) *
            (VIDEO_WIDTH / VIDEO_HEIGHT),
          playerContainerWidth
        )
      );
      setPlayerHeight(Math.min(playerContainerHeight, VIDEO_HEIGHT));
    } else {
      setPlayerHeight(
        Math.min(
          playerContainerWidth * (VIDEO_HEIGHT / VIDEO_WIDTH),
          playerContainerHeight
        )
      );
      setPlayerWidth(Math.min(playerContainerWidth, VIDEO_WIDTH));
    }
  }, [playerContainerWidth, playerContainerHeight]);

  return (
    <Stack
      flex={1}
      direction={isMobile ? "column" : "row"}
      spacing="40px"
      width="100%"
      overflow="hidden"
      boxSizing="border-box"
    >
      <Stack spacing="18px" flex={1} maxWidth="308px" height="100%">
        <Captioned text="Video URL" noFlex>
          <Stack
            sx={{
              opacity: props.video ? 0.5 : 1,
              pointerEvents: props.video ? "none" : undefined,
            }}
          >
            <UrsorInputField
              value={props.originalUrl}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                props.setOriginalUrl(event.target.value)
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

        <Captioned text="Title" noFlex>
          <UrsorInputField
            value={props.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.setTitle(event.target.value);
              props.setEditedTitle();
            }}
            placeholder="Title"
            width="100%"
            leftAlign
            boldValue
            autoFocus={!!props.video}
          />
        </Captioned>

        <Captioned text="Description" height="100%">
          <UrsorTextField
            value={props.description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              props.setDescription(event.target.value)
            }
            placeholder="Optional"
            width="100%"
            height="100%"
            boldValue
          />
        </Captioned>
      </Stack>
      <Stack position="relative" spacing="18px" flex={1}>
        {props.showForbiddenVideoView ? (
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
              Unfortunately, this video is not available to be embedded in 3rd
              party platforms.
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

        <Stack
          ref={setPlayerContainerRef}
          // maxHeight={VIDEO_HEIGHT}
          // maxWidth={VIDEO_WIDTH}
          width="100%"
          height="100%"
          position="relative"
        >
          <Stack position="absolute" top={0} left={0}>
            <Player
              playerId="creation"
              url={props.url}
              provider={props.provider}
              width={Math.min(VIDEO_WIDTH, playerContainerWidth)}
              height={Math.min(VIDEO_HEIGHT, playerContainerHeight)}
              setDuration={(d) => {
                d && props.setDuration(d);
              }}
              startTime={props.range?.[0] ?? 0}
              endTime={props.range?.[1] ?? 10}
              noKitemark
              playingCallback={setPlaying}
              smallPlayIcon
              noBackdrop
              noUrlStartTime
            />
          </Stack>
        </Stack>

        <Stack flex={1} justifyContent="flex-end" alignItems="flex-end">
          <UrsorButton
            onClick={props.mainButtonCallback}
            disabled={!props.url}
            dark
            variant="tertiary"
            endIcon={props.video ? PencilIcon : ChevronRightIcon}
            width="264px"
          >
            Next
          </UrsorButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoDialogDetailsTab;
