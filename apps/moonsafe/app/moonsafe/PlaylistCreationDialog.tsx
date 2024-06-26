import { Stack } from "@mui/system";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { useState } from "react";
import UrsorDialog, {
  BACKDROP_STYLE,
  BORDER_RADIUS,
} from "../components/UrsorDialog";
import { Dialog } from "@mui/material";

const WIDTH = "943px";
const HEIGHT = "597px";

type PlaylistCreationStep = "name" | "duration" | "selection" | "finish";

const STEP_TITLES: Record<PlaylistCreationStep, string> = {
  name: "What is the Playlist about?",
  duration: "How long should the playlist be?",
  selection: "What shows do you want in the playlist?",
  finish: "Your playlist is ready!",
};

const NameView = (props: {
  value: string;
  setValue: (name: string) => void;
  proceed: () => void;
}) => (
  <Stack flex={1} width="70%" justifyContent="center" alignItems="center">
    <UrsorFadeIn duration={800} key="device-name" fullWidth>
      <UrsorInputField
        value={props.value}
        placeholder="Playlist title"
        width="100%"
        height="74px"
        fontSize={"28px"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(event.target.value)
        }
        onEnterKey={props.proceed}
      />
    </UrsorFadeIn>
  </Stack>
);

const DurationView = (props: {
  value: string;
  setValue: (name: number) => void;
  proceed: () => void;
}) => (
  <Stack flex={1} width="70%" justifyContent="center" alignItems="center">
    <UrsorFadeIn duration={800} key="device-name" fullWidth>
      <UrsorInputField
        value={props.value}
        placeholder="Duration"
        width="100%"
        height="74px"
        fontSize={"28px"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(parseInt(event.target.value))
        }
        onEnterKey={props.proceed}
      />
    </UrsorFadeIn>
  </Stack>
);

const PlaylistCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [step, setStep] = useState<PlaylistCreationStep>("name");
  return (
    <Dialog
      transitionDuration={400}
      open={props.open}
      onClose={() => {
        props.onClose?.();
      }}
      PaperProps={{
        style: {
          width: WIDTH,
          maxWidth: WIDTH,
          maxHeight: HEIGHT,
          height: HEIGHT,
          borderRadius: BORDER_RADIUS,
          margin: "20px",
          padding: "32px",
          boxSizing: "border-box",
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": {
          ...BACKDROP_STYLE,
        },
      }}
    >
      <Stack height="100%" width="100%" alignItems="center">
        <Stack height="52px" alignItems="center" justifyContent="center">
          <Typography color={PALETTE.secondary.purple[2]} variant="h4">
            {STEP_TITLES[step]}
          </Typography>
        </Stack>
        {step === "name" ? (
          <NameView
            value={name}
            setValue={(value) => setName(value)}
            proceed={() => setStep("duration")}
          />
        ) : step === "duration" ? (
          <DurationView
            value={name}
            setValue={(value) => setDuration(value)}
            proceed={() => setStep("selection")}
          />
        ) : null}
      </Stack>
    </Dialog>
  );
};

export default PlaylistCreationDialog;
