import { Stack } from "@mui/system";
import RocketIcon from "@/images/icons/RocketIcon.svg";
import { useRouter } from "next/navigation";
import UrsorDialog from "../components/UrsorDialog";
import { useEffect, useState } from "react";
import { Captioned } from "../landing/[urlId]/LandingPageContents";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { Slider } from "@mui/material";
import DurationLabel from "../editor/duration-label";
import Player from "../components/player";
import { deNoCookiefy } from "../components/utils";
import ApiController from "../api";
import { useWindowSize } from "usehooks-ts";

export const TITLE_CHARACTER_LIMIT = 40;
const VIDEO_WIDTH = 290;
const VIDEO_HEIGHT = 159;

const extractUrl = (html: string) => html.split('src="')[1].split("?")[0];

const VideoCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
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
          setDescription(details.description); // vimeo has the description here; youtube requires the youtube api
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

  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [range, setRange] = useState<number[] | undefined>(undefined);
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

  return (
    <UrsorDialog
      supertitle="Create video"
      title="Create a Safetube video"
      open={props.open}
      button={{
        text: "Create",
        callback: () => null,
        icon: RocketIcon,
      }}
      onCloseCallback={props.closeCallback}
      maxWidth="880px"
    >
      <Stack flex={1} direction="row" spacing="40px" width="86%">
        <Stack spacing="20px" flex={1}>
          <Captioned text="URL">
            <UrsorInputField
              value={originalUrl}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setOriginalUrl(event.target.value)
              }
              placeholder="URL"
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
                event.target.value.length < TITLE_CHARACTER_LIMIT &&
                setTitle(event.target.value)
              }
              placeholder="Title"
              width="100%"
              leftAlign
              boldValue
            />
          </Captioned>
          <Captioned text="Description">
            <UrsorInputField
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                event.target.value.length < TITLE_CHARACTER_LIMIT &&
                setDescription(event.target.value)
              }
              placeholder="Description"
              width="100%"
              leftAlign
              boldValue
            />
          </Captioned>
          <Captioned text="Start and end time">
            {duration && range ? (
              <Stack
                direction="row"
                // spacing={mobile ? "20px" : "44px"}
                spacing={"20px"}
                justifyContent="center"
                width="100%"
                sx={{
                  ".MuiSlider-root": {
                    color: "transparent !important",
                  },
                  ".MuiSlider-rail": {
                    opacity: 0.4,
                    background: "linear-gradient(90deg,#F279C5,#FD9B41)",
                  },
                  ".MuiSlider-track": {
                    background: "linear-gradient(90deg,#F279C5,#FD9B41)",
                  },
                  ".MuiSlider-thumb": {
                    "&:nth-of-type(3)": {
                      background: "#F279C5",
                    },
                    "&:nth-of-type(4)": {
                      background: "#FD9B41",
                    },
                  },
                }}
              >
                <DurationLabel
                  value={range[0]}
                  incrementCallback={() =>
                    setRange([Math.min(duration, range[0] + 1), range[1]])
                  }
                  decrementCallback={() =>
                    setRange([Math.max(0, range[0] - 1), range[1]])
                  }
                />
                <Slider
                  min={0}
                  max={duration}
                  valueLabelDisplay="off"
                  getAriaLabel={() => "Temperature range"}
                  value={range}
                  onChange={(event: Event, newValue: number | number[]) => {
                    setRange(newValue as number[]);
                  }}
                />
                <DurationLabel
                  value={range[1]}
                  incrementCallback={() =>
                    setRange([range[0], Math.min(duration, range[1] + 1)])
                  }
                  decrementCallback={() =>
                    setRange([range[0], Math.max(0, range[1] - 1)])
                  }
                />
              </Stack>
            ) : null}
          </Captioned>
        </Stack>
        <Stack
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          bgcolor="rgb(0,0,0)"
          spacing="10px"
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
              noKitemark={playerWidth < VIDEO_WIDTH}
              top="120px"
              playingCallback={(p) => setPlaying(p)}
            />
          ) : null}
          <Typography bold>{title}</Typography>
          <Typography variant="small">{description}</Typography>
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default VideoCreationDialog;
