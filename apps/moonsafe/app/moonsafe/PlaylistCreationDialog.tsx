import { Stack } from "@mui/system";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { useState } from "react";
import UrsorDialog, {
  BACKDROP_STYLE,
  BORDER_RADIUS,
} from "../components/UrsorDialog";
import { Dialog } from "@mui/material";
import { IVideo } from "../api";
import _ from "lodash";
import Image from "next/image";
import CheckIcon from "@/images/icons/CheckIcon.svg";

const WIDTH = "943px";
const HEIGHT = "597px";
const ILLUSTRATION_URL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321192.png";

type PlaylistCreationStep = "name" | "duration" | "selection" | "finish";

const STEP_TITLES: Record<PlaylistCreationStep, string> = {
  name: "What is the Playlist about?",
  duration: "How long should the playlist be?",
  selection: "What shows do you want in the playlist?",
  finish: "Your playlist is ready!",
};

const STEP_BUTTON_TEXTS: Record<PlaylistCreationStep, string> = {
  name: "Next",
  duration: "Next",
  selection: "Create",
  finish: "Go to Playlist",
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

const PlaylistCreationVideoCard = (
  props: IVideo & { selected: boolean; flipSelection: () => void }
) => (
  <Stack
    borderRadius="12px"
    bgcolor="rgb(255,255,255)"
    border={`1px solid ${PALETTE.secondary.grey[2]}`}
    flex={1}
    p="4px"
    spacing="6px"
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
      boxSizing="border-box"
      borderRadius="8px"
    >
      <Image
        src={props.thumbnailUrl ?? ""}
        fill
        style={{ objectFit: "cover" }}
        alt="video thumbnail"
      />
      <Stack
        position="absolute"
        top="8px"
        right="8px"
        height="28px"
        width="28px"
        bgcolor="rgb(255,255,255)"
        borderRadius="100%"
        alignItems="center"
        justifyContent="center"
        sx={{
          cursor: "pointer",
          "&:hover": { transform: "scale(1.1)" },
          transition: "0.2s",
          svg: {
            path: {
              fill: props.selected
                ? PALETTE.secondary.purple[2]
                : "rgb(186, 186, 186)",
            },
          },
        }}
        onClick={props.flipSelection}
      >
        <CheckIcon width="14px" heigh="14px" />
      </Stack>
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
  selected: string[];
  flipVideoSelection: (id: string) => void;
  videos: IVideo[];
}) => (
  <Stack spacing="20px" width="100%" height="100%">
    {_.chunk(props.videos.slice(0, 6), 3).map((row, i) => (
      <Stack key={i} spacing="20px" flex={1} direction="row">
        {[
          ...row.map((video) => (
            <PlaylistCreationVideoCard
              {...video}
              selected={props.selected.includes(video.id)}
              flipSelection={() => props.flipVideoSelection(video.id)}
            />
          )),
          ...[...Array(3 - row.length).keys()].map(() => <Stack flex={1} />),
        ]}
      </Stack>
    ))}
  </Stack>
);

const FinishView = () => (
  <Stack flex={1} justifyContent="center" alignItems="center">
    <UrsorFadeIn duration={800} key="device-name" fullWidth>
      <Image
        src={ILLUSTRATION_URL}
        width={638}
        height={428}
        alt="finish illustration"
      />
    </UrsorFadeIn>
  </Stack>
);

const PlaylistCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState<PlaylistCreationStep>("name");
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [selectedVideos, setSelectedVideos] = useState<string[]>(
    DUMMY_VIDEOS.map((v) => v.id)
  );

  const stepButtonCallbacks: Record<PlaylistCreationStep, () => void> = {
    name: () => setStep("duration"),
    duration: () => setStep("selection"),
    selection: () => {
      setStep("finish");
    },
    finish: props.onClose,
  };

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
            selected={selectedVideos}
            flipVideoSelection={(id) =>
              setSelectedVideos(
                selectedVideos.includes(id)
                  ? selectedVideos.filter((videoId) => videoId !== id)
                  : [...selectedVideos, id]
              )
            }
            videos={DUMMY_VIDEOS}
          />
        ) : (
          <FinishView />
        )}

        <Stack>
          <UrsorButton
            height="42px"
            width="358px"
            dark
            variant="tertiary"
            onClick={stepButtonCallbacks[step]}
          >
            {STEP_BUTTON_TEXTS[step]}
          </UrsorButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default PlaylistCreationDialog;
