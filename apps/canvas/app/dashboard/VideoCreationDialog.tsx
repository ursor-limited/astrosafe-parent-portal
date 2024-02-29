import { Stack } from "@mui/system";
import RocketIcon from "@/images/icons/RocketIcon.svg";
import { useRouter } from "next/navigation";
import UrsorDialog from "../components/UrsorDialog";
import { useEffect, useState } from "react";
import { Captioned } from "../landing/[urlId]/LandingPageContents";
import { PALETTE, UrsorInputField } from "ui";
import { Slider } from "@mui/material";
import DurationLabel from "../editor/duration-label";

export const TITLE_CHARACTER_LIMIT = 40;

const VideoCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
}) => {
  const router = useRouter();
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [range, setRange] = useState<number[] | undefined>(undefined);
  useEffect(() => {
    duration && setRange([0, duration]);
  }, [Math.floor((duration ?? 0) / 3)]);

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
      backButtonCallback={props.closeCallback}
      width="90%"
      maxWidth="880px"
    >
      <Stack flex={1} direction="row" spacing="40px">
        <Stack spacing="20px" flex={1}>
          <Captioned text="URL">
            <UrsorInputField
              value={url}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(event.target.value)
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
                spacing={"44px"}
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
      </Stack>
    </UrsorDialog>
  );
};

export default VideoCreationDialog;
