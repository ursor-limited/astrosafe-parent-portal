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
import { useEffect, useState } from "react";
import TimeRange from "./TimeRange";

const VideoDialogCommentsTab = (props: {
  url: string;
  originalUrl: string;
  setOriginalUrl: (url: string) => void;
  video?: IVideo;
  mainButtonCallback: () => void;
  provider?: "youtube" | "vimeo";
  duration?: number;
  setDuration: (duration: number) => void;
  range?: [number, number];
  setRange: (range?: [number, number]) => void;
  setThumbnailUrl: (url: string) => void;
  // setPlaying?: (playing: boolean) => void;
}) => {
  const [playing, setPlaying] = useState<boolean>(false);

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

  const [currentTime, setCurrentTime] = useState<number>(0);

  const [currentTimeSetter, setCurrentTimeSetter] = useState<
    undefined | ((time: number) => void)
  >();

  return (
    <Stack
      flex={1}
      direction={isMobile ? "column" : "row"}
      spacing="40px"
      width="100%"
      overflow="hidden"
      boxSizing="border-box"
    >
      <Stack
        width={isMobile ? 0 : VIDEO_WIDTH}
        height={isMobile ? 0 : undefined}
        overflow={isMobile ? "hidden" : undefined}
        spacing="6px"
        position="relative"
      >
        {props.provider ? (
          <Player
            playerId="creation"
            url={props.url}
            provider={props.provider}
            width={Math.min(playerWidth, VIDEO_WIDTH)}
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
            setCurrentTime={setCurrentTime}
            setCurrentTimeSetter={(f) => setCurrentTimeSetter(() => f)}
          />
        ) : null}
        {props.duration ? (
          <TimeRange
            range={props.range}
            duration={props.duration}
            setRange={props.setRange}
            originalUrl={props.originalUrl}
            currentTime={currentTime}
            setCurrentTime={(time) => currentTimeSetter?.(time)}
          />
        ) : null}
      </Stack>
      <Stack flex={1} height="100%" alignItems="flex-end">
        <UrsorButton
          onClick={props.mainButtonCallback}
          disabled={!props.url}
          dark
          variant="tertiary"
          endIcon={props.video ? PencilIcon : ChevronRightIcon}
          width="264px"
        >
          Publish
        </UrsorButton>
      </Stack>
    </Stack>
  );
};

export default VideoDialogCommentsTab;
