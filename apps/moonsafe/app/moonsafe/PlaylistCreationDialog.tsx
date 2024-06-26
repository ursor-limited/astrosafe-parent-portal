import { Stack } from "@mui/system";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { useState } from "react";
import UrsorDialog, {
  BACKDROP_STYLE,
  BORDER_RADIUS,
} from "../components/UrsorDialog";
import { Dialog, Grid } from "@mui/material";
import { IVideo } from "../api";
import _ from "lodash";
import Image from "next/image";

const WIDTH = "943px";
const HEIGHT = "597px";

type PlaylistCreationStep = "name" | "duration" | "selection" | "finish";

const STEP_TITLES: Record<PlaylistCreationStep, string> = {
  name: "What is the Playlist about?",
  duration: "How long should the playlist be?",
  selection: "What shows do you want in the playlist?",
  finish: "Your playlist is ready!",
};

const DUMMY_VIDEOS = [
  {
    id: "6658dd53d54478910600b2ac",
    title: "Coolest kids",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame_427320551.webp",
    creatorId: "",
    comments: [],
    createdAt: "",
    updatedAt: "",
    url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
  },
  {
    id: "6659d2b1b66f5d5ee1349b01",
    title: "Star Wars",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/seals2.png",
    creatorId: "",
    comments: [],
    createdAt: "",
    updatedAt: "",
    url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
  },
  {
    id: "6659d2b4b886df523356cb13",
    title: "Pokemon",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
    creatorId: "",
    comments: [],
    createdAt: "",
    updatedAt: "",
    url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
  },
  {
    id: "667bda40bfbe6aca34a82382",
    title: "Mario",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
    creatorId: "",
    comments: [],
    createdAt: "",
    updatedAt: "",
    url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
  },
  {
    id: "667bda4700c411f249ddf0cc",
    title: "Digimon",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
    creatorId: "",
    comments: [],
    createdAt: "",
    updatedAt: "",
    url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
  },
];

const PlaylistCreationVideoCard = (props: IVideo) => (
  <Stack
    borderRadius="12px"
    bgcolor="rgb(255,255,255)"
    border={`1px solid ${PALETTE.secondary.grey[2]}`}
    flex={1}
    p="4px"
    boxSizing="border-box"
  >
    <Stack
      alignItems="center"
      justifyContent="center"
      p="12px"
      height="144px"
      width="100%"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={props.thumbnailUrl ?? ""}
        fill
        style={{ objectFit: "cover" }}
        alt="video thumbnail"
      />
    </Stack>
    <Typography bold maxLines={1}>
      {props.title}
    </Typography>
  </Stack>
);

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

const SelectionView = (props: {
  // value: string;
  //setValue: (name: number) => void;
  videos: IVideo[];
  proceed: () => void;
}) => (
  <Stack spacing="20px" width="100%" height="100%">
    <Grid container gap="12px">
      {props.videos.map((video) => (
        <Grid item>
          <PlaylistCreationVideoCard {...video} />
        </Grid>
      ))}
    </Grid>
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
      <Stack height="100%" width="100%" alignItems="center" spacing="24px">
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
            value={duration.toString()}
            setValue={(value) => setDuration(value)}
            proceed={() => setStep("selection")}
          />
        ) : step === "selection" ? (
          <SelectionView
            //value={name}
            //setValue={(value) => setDuration(value)}
            videos={DUMMY_VIDEOS}
            proceed={() => setStep("finish")}
          />
        ) : null}

        <Stack>
          <UrsorButton height="42px" width="358px" dark variant="tertiary">
            Next
          </UrsorButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default PlaylistCreationDialog;
