import { Stack } from "@mui/system";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { useEffect, useState } from "react";
import UrsorDialog, {
  BACKDROP_STYLE,
  BORDER_RADIUS,
} from "../components/UrsorDialog";
import { Dialog, Slider } from "@mui/material";
import ApiController, { IVideo } from "../api";
import _ from "lodash";
import Image from "next/image";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import XIcon from "@/images/icons/X.svg";
import { useUserContext } from "../components/UserContext";
import { MoonsafeDurationIndicator } from "../moonSafePlaylist/[subdirectory]/MoonsafePageCard";
import { useRouter } from "next/navigation";

const WIDTH = "943px";
const HEIGHT = "597px";
export const MOONSAFE_ILLUSTRATION_URL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321192.png";

const MAX_DURATION = 2 * 60 * 60;

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

interface IPlaylistCreationChannel {
  title: string;
  id: string;
  imageUrl: string;
}

const CHANNELS: IPlaylistCreationChannel[] = [
  {
    title: "CoComelon",
    id: "UCbCmjCuTUZos6Inko4u57UQ",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/cocomelon.webp",
  },
  {
    title: "Blippi",
    id: "UC5PYHgAzJ1wLEidB58SK6Xw",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/blippi.webp",
  },
  {
    title: "Morphle",
    id: "UC5Ti4_DVp7LW34PjEwB13Xg",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/morphle.webp",
  },
  {
    title: "Little angel",
    id: "UCNzsYU0aWwjERj-9Y9HUEng",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/littleAngel.webp",
  },
  {
    title: "Oddbods",
    id: "UCtlth0w7_mYqpHPViMhQ99Q",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/oddbods.webp",
  },
  {
    title: "ARPO",
    id: "UCrSx8rek9EuC3YGHvG8aalw",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/arpo.webp",
  },
  {
    title: "Lellobee city farm",
    id: "UCqbLFYZfANp88Rn-dIN_Dsg",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/lellobee.webp",
  },
  {
    title: "Go Buster",
    id: "UCnEHS4Wa8WOxvQiKX4Vd-5g",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/goBuster.webp",
  },
  {
    title: "Mia's magic playground",
    id: "UCTAK0ka811-5WYi9Z-3ByAg",
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/mia.webp",
  },
  {
    title: "Little Baby Bum",
    id: "UCKAqou7V9FAWXpZd9xtOg3Q",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/littlebabyb.webp",
  },
  {
    title: "Gecko's Garage",
    id: "UChULBXQf9VDYAi3vRLu_U-w",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/geckosGarage.webp",
  },
  {
    title: "Supa Strikas",
    id: "UCdtojT_ZwTRlZThoBSMVhoQ",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/supaStrikas.webp",
  },
  {
    title: "T-rex Ranch",
    id: "UCJykHJfN9FHtf79IgYE00zg",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/TRexRanch.webp",
  },
  {
    title: " Mini bods",
    id: "UCLuxe6t2GvCj2EM0TAwIZJA",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/minibods.webp",
  },
];

// const DUMMY_VIDEOS = [
//   {
//     id: "6658dd53d54478910600b2ac",
//     title: "Coolest kids",
//     videoChannelId: "6659a32823838b9510e565e2",
//     thumbnailUrl:
//       "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame_427320551.webp",
//     creatorId: "",
//     comments: [],
//     createdAt: "",
//     updatedAt: "",
//     url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
//   },
//   {
//     id: "6659d2b1b66f5d5ee1349b01",
//     title: "Star Wars",
//     videoChannelId: "6659a32823838b9510e565e2",
//     thumbnailUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/seals2.png",
//     creatorId: "",
//     comments: [],
//     createdAt: "",
//     updatedAt: "",
//     url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
//   },
//   {
//     id: "6659d2b4b886df523356cb13",
//     title: "Pokemon",
//     videoChannelId: "6659a32823838b9510e565e2",
//     thumbnailUrl:
//       "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
//     creatorId: "",
//     comments: [],
//     createdAt: "",
//     updatedAt: "",
//     url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
//   },
//   {
//     id: "667bda40bfbe6aca34a82382",
//     title: "Mario",
//     videoChannelId: "6659a32823838b9510e565e2",
//     thumbnailUrl:
//       "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
//     creatorId: "",
//     comments: [],
//     createdAt: "",
//     updatedAt: "",
//     url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
//   },
//   {
//     id: "667bda4700c411f249ddf0cc",
//     title: "Digimon",
//     videoChannelId: "6659a32823838b9510e565e2",
//     thumbnailUrl:
//       "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
//     creatorId: "",
//     comments: [],
//     createdAt: "",
//     updatedAt: "",
//     url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
//   },
// ];

const PlaylistCreationChannelCard = (
  props: IPlaylistCreationChannel & {
    selected: boolean;
    flipSelection: () => void;
  }
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
      bgcolor={PALETTE.secondary.grey[1]}
    >
      <Image
        src={props.imageUrl ?? ""}
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
        border={`1px solid ${PALETTE.secondary.purple[2]}`}
        alignItems="center"
        justifyContent="center"
        sx={{
          cursor: "pointer",
          "&:hover": { transform: "scale(1.1)" },
          transition: "0.2s",

          svg: {
            path: {
              fill: PALETTE.secondary.purple[2],
            },
          },
        }}
        onClick={props.flipSelection}
        boxShadow="0 0 40px rgba(0,0,0,0.15)"
      >
        <Stack sx={{ opacity: props.selected ? 1 : 0 }}>
          <CheckIcon width="14px" heigh="14px" />
        </Stack>
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
    <UrsorFadeIn duration={800} fullWidth>
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
  value: number;
  setValue: (name: number) => void;
  proceed: () => void;
}) => (
  <Stack flex={1} width="70%" justifyContent="center" alignItems="center">
    <UrsorFadeIn duration={800}>
      <MoonsafeDurationIndicator value={props.value * 2 * 36} />
    </UrsorFadeIn>
    <UrsorFadeIn delay={400} duration={800}>
      <Stack
        width="482px"
        sx={{
          ".MuiSlider-thumb": {
            background: PALETTE.secondary.purple[2],
          },
          ".MuiSlider-track": {
            background: PALETTE.secondary.purple[1],
            border: "none",
          },
          ".MuiSlider-rail": {
            height: "4px",
            borderRadius: "2px",
            background: PALETTE.secondary.grey[2],
            opacity: 1,
          },
        }}
      >
        <Slider
          value={props.value}
          onChange={(event: Event, newValue: number | number[]) => {
            props.setValue(newValue as number);
          }}
        />
      </Stack>
    </UrsorFadeIn>
    {/* <Stack width='482px'>

      </Stack> */}
    {/* <UrsorInputField
        value={props.value}
        placeholder="Duration"
        width="100%"
        height="74px"
        fontSize={"28px"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(parseInt(event.target.value))
        }
        onEnterKey={props.proceed}
      /> */}
  </Stack>
);

const SelectionView = (props: {
  selected: string[];
  flipVideoSelection: (id: string) => void;
  channels: IPlaylistCreationChannel[];
}) => (
  <Stack spacing="20px" width="100%" height="100%" overflow="scroll">
    {_.chunk(props.channels, 3).map((row, i) => (
      <Stack key={i} spacing="20px" flex={1} direction="row">
        {[
          ...row.map((playlist, j) => (
            <PlaylistCreationChannelCard
              key={j}
              {...playlist}
              selected={props.selected.includes(playlist.id)}
              flipSelection={() => props.flipVideoSelection(playlist.id)}
            />
          )),
          ...[...Array(3 - row.length).keys()].map((k) => (
            <Stack key={k} flex={1} />
          )),
        ]}
      </Stack>
    ))}
  </Stack>
);

const FinishView = () => (
  <Stack flex={1} justifyContent="center" alignItems="center">
    <UrsorFadeIn duration={800} fullWidth>
      <Image
        src={MOONSAFE_ILLUSTRATION_URL}
        width={581}
        height={390}
        alt="finish illustration"
      />
    </UrsorFadeIn>
  </Stack>
);

const PlaylistCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
  refreshLessons: () => void;
}) => {
  const [step, setStep] = useState<PlaylistCreationStep>("name");
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState<number>(50);

  const [channels, setChannels] =
    useState<IPlaylistCreationChannel[]>(CHANNELS);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  useEffect(() => setSelectedChannels(channels.map((c) => c.id)), [channels]);

  const userDetails = useUserContext().user;

  const [createdPlaylistId, setCreatedPlaylistId] = useState<
    string | undefined
  >();

  const router = useRouter();

  const stepButtonCallbacks: Record<PlaylistCreationStep, () => void> = {
    name: () => setStep("duration"),
    duration: () => setStep("selection"),
    selection: () => {
      setStep("finish");
      ApiController.createPlaylist({
        creatorId: userDetails?.id ?? "",
        title: name,
        channels: selectedChannels,
        duration: (duration / 100) * MAX_DURATION,
      }).then((response) => {
        props.refreshLessons();
        setCreatedPlaylistId(response.id);
      });
    },
    finish: () => router.push(`/moonSafePlaylist/${createdPlaylistId}`),
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
      <Stack
        position="absolute"
        top="41px"
        right="41px"
        onClick={props.onClose}
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
        }}
        zIndex={3}
      >
        <XIcon height="28px" width="28px" />
      </Stack>
      <Stack
        height="100%"
        width="100%"
        alignItems="center"
        spacing="24px"
        position="relative"
      >
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
            value={duration}
            setValue={(value) => setDuration(value)}
            proceed={() => setStep("selection")}
          />
        ) : step === "selection" ? (
          <SelectionView
            selected={selectedChannels}
            flipVideoSelection={(id) =>
              setSelectedChannels(
                selectedChannels.includes(id)
                  ? selectedChannels.filter((videoId) => videoId !== id)
                  : [...selectedChannels, id]
              )
            }
            channels={CHANNELS}
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
            disabled={step === "finish" && !createdPlaylistId}
          >
            {STEP_BUTTON_TEXTS[step]}
          </UrsorButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default PlaylistCreationDialog;
