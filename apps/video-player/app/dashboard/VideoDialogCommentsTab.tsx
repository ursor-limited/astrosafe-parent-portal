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
import { IVideo } from "./AstroContentColumns";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "./VideoCreationDialog";
import Player from "../components/player";
import { useState } from "react";

const VideoDialogCommentsTab = (props: {
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
  playerWidth: number;
  setDuration: (duration: number) => void;
  range?: [number, number];
  // setPlaying?: (playing: boolean) => void;
}) => {
  const [playing, setPlaying] = useState<boolean>(false);
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
        {props.showForbiddenVideoView ? (
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
        {props.provider ? (
          <Player
            playerId="creation"
            url={props.url}
            provider={props.provider}
            width={Math.min(props.playerWidth, VIDEO_WIDTH)}
            height={
              Math.min(props.playerWidth, VIDEO_WIDTH) *
              (VIDEO_HEIGHT / VIDEO_WIDTH)
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

export default VideoDialogCommentsTab;
