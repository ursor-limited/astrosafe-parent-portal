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

  return (
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

        <Captioned text="Title">
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
        <Captioned text="Description">
          <UrsorTextField
            value={props.description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              props.setDescription(event.target.value)
            }
            placeholder="Optional"
            width="100%"
            height={isMobile ? "60px" : "334px"}
            boldValue
          />
        </Captioned>
      </Stack>
      <Stack
        width={`${isMobile ? 0 : VIDEO_WIDTH}px`}
        //height={`${isMobile ? 0 : VIDEO_HEIGHT}px`}
        overflow={isMobile ? "hidden" : undefined}
        position="relative"
      >
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

        <Player
          playerId="creation"
          url={props.url}
          provider={props.provider}
          width={
            Math.min(playerWidth, VIDEO_WIDTH) -
            (props.provider === "youtube" ? 0 : 10)
          }
          height={
            Math.min(playerWidth, VIDEO_WIDTH) * (VIDEO_HEIGHT / VIDEO_WIDTH)
          }
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
