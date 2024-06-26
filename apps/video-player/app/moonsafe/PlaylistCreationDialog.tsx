import { Stack } from "@mui/system";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { useEffect, useState } from "react";
import UrsorDialog, {
  BACKDROP_STYLE,
  BORDER_RADIUS,
} from "../components/UrsorDialog";
import { Dialog } from "@mui/material";
import ApiController, { IVideo } from "../api";
import _ from "lodash";
import Image from "next/image";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import { useUserContext } from "../components/UserContext";

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
];
// CoComelon, UCbCmjCuTUZos6Inko4u57UQ, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/cocomelon.webp,
// Blippi, UC5PYHgAzJ1wLEidB58SK6Xw, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/blippi.webp,
// Morphle, UC5Ti4_DVp7LW34PjEwB13Xg, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/morphle.webp,
// Little angel, UCNzsYU0aWwjERj-9Y9HUEng, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/littleAngel.webp,
// Oddbods, UCtlth0w7_mYqpHPViMhQ99Q, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/oddbods.webp,
// ARPO, UCrSx8rek9EuC3YGHvG8aalw, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/arpo.webp,
// Lellobee city farm, UCqbLFYZfANp88Rn-dIN_Dsg, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/lellobee.webp,
// Go Buster, UCnEHS4Wa8WOxvQiKX4Vd-5g,https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/goBuster.webp,
// Mia's magic playground, UCTAK0ka811-5WYi9Z-3ByAg, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/mia.webp,
// Little Baby Bum, UCKAqou7V9FAWXpZd9xtOg3Q, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/littlebabyb.webp,
// Gecko's Garage, UChULBXQf9VDYAi3vRLu_U-w, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/geckosGarage.webp,
// Supa Strikas, UCdtojT_ZwTRlZThoBSMVhoQ, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/supaStrikas.webp,
// T-rex Ranch, UCJykHJfN9FHtf79IgYE00zg, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/TRexRanch.webp,
// Mini bods, UCLuxe6t2GvCj2EM0TAwIZJA, https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug/minibods.webp,

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
        boxShadow="0 0 40px rgba(0,0,0,0.15)"
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
  channels: IPlaylistCreationChannel[];
}) => (
  <Stack spacing="20px" width="100%" height="100%" overflow="scroll">
    {_.chunk(props.channels, 3).map((row, i) => (
      <Stack key={i} spacing="20px" flex={1} direction="row">
        {[
          ...row.map((playlist) => (
            <PlaylistCreationChannelCard
              {...playlist}
              selected={props.selected.includes(playlist.id)}
              flipSelection={() => props.flipVideoSelection(playlist.id)}
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
  const [duration, setDuration] = useState<number>(0);

  const [channels, setChannels] =
    useState<IPlaylistCreationChannel[]>(CHANNELS);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  useEffect(() => setSelectedVideos(channels.map((c) => c.id)), [channels]);

  const userDetails = useUserContext().user;

  const stepButtonCallbacks: Record<PlaylistCreationStep, () => void> = {
    name: () => setStep("duration"),
    duration: () => setStep("selection"),
    selection: () => {
      setStep("finish");
      // ApiController.createPlaylist({
      //   userId: userDetails?.id ?? "",
      //   title: name,
      //   channels: channels.filter((v) => selectedVideos.includes(v.id)),
      // }).then(() => props.refreshLessons);
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
          >
            {STEP_BUTTON_TEXTS[step]}
          </UrsorButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default PlaylistCreationDialog;
