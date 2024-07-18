import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import DeleteIcon from "@/images/icons/DeleteIcon.svg";
import XIcon from "@/images/icons/X.svg";
import { Grid } from "@mui/material";
import { useState } from "react";
import TimeLimitSelector from "./TimeLimitSelector";

const PIN_KEY_SEPARATION = "25px";

const DUMMY_TOPICS = [
  "boo",
  "guu",
  "cats",
  "dogs",
  "caterpillars",
  "architecture",
  "aaaa",
];

const MAX_DURATION = 5 * 3600;

const PinPad = (props: {
  pin: number[];
  onAdd: (n: number) => void;
  onRemove: () => void;
}) => (
  <Stack spacing="46px">
    <Stack direction="row" spacing="24px" justifyContent="center">
      {[...Array(4).keys()].map((i) => (
        <Stack
          height="16px"
          width="16px"
          sx={{ opacity: 0.9 }}
          border={`2px solid white`}
          bgcolor={props.pin.length >= i + 1 ? "white" : "transparent"}
          borderRadius="100%"
        />
      ))}
    </Stack>
    <Stack spacing={PIN_KEY_SEPARATION}>
      <Stack direction="row" spacing={PIN_KEY_SEPARATION}>
        <PinKey n={1} onClick={() => props.onAdd(1)} />
        <PinKey n={2} onClick={() => props.onAdd(2)} />
        <PinKey n={3} onClick={() => props.onAdd(3)} />
      </Stack>
      <Stack direction="row" spacing={PIN_KEY_SEPARATION}>
        <PinKey n={4} onClick={() => props.onAdd(4)} />
        <PinKey n={5} onClick={() => props.onAdd(5)} />
        <PinKey n={6} onClick={() => props.onAdd(6)} />
      </Stack>
      <Stack direction="row" spacing={PIN_KEY_SEPARATION}>
        <PinKey n={7} onClick={() => props.onAdd(7)} />
        <PinKey n={8} onClick={() => props.onAdd(8)} />
        <PinKey n={9} onClick={() => props.onAdd(9)} />
      </Stack>
      <Stack direction="row" spacing={PIN_KEY_SEPARATION}>
        <Stack flex={1} />
        <PinKey n={0} onClick={() => props.onAdd(0)} />
        <Stack
          flex={1}
          justifyContent="center"
          alignItems="center"
          sx={{
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.8 },
          }}
          onClick={props.onRemove}
        >
          <DeleteIcon height="30px" width="30px" />
        </Stack>
      </Stack>
    </Stack>
  </Stack>
);

const TopicTag = (props: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Stack
    height="39px"
    px="16px"
    bgcolor={props.selected ? PALETTE.secondary.purple[2] : "rgb(255,255,255)"}
    borderRadius="12px"
    direction="row"
    spacing="10px"
    alignItems="center"
    sx={{
      cursor: "pointer",
      "&:hover": { opacity: 0.7 },
      transition: "0.2s",
      svg: {
        path: {
          fill: props.selected ? "rgb(255,255,255)" : PALETTE.primary.navy,
        },
      },
    }}
    onClick={props.onClick}
  >
    <Typography
      bold
      color={props.selected ? "rgb(255,255,255)" : PALETTE.primary.navy}
    >
      {props.children}
    </Typography>
    {props.selected ? (
      <XIcon width="20px" height="20px" />
    ) : (
      <PlusIcon width="20px" height="20px" />
    )}
  </Stack>
);

const getFormattedDuration = (duration: number) =>
  `${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`;

const PinKey = (props: { n: number; onClick: () => void }) => (
  <Stack
    width="66px"
    height="66px"
    justifyContent="center"
    alignItems="center"
    onClick={props.onClick}
    border="2px solid rgba(255,255,255,0.86)"
    borderRadius="100%"
    sx={{
      cursor: "pointer",
      transition: "0.2s",
      "&:hover": { opacity: 0.8, background: "rgba(255,255,255,0.1)" },
    }}
  >
    <Typography variant="h5" color="rgb(255,255,255)">
      {props.n}
    </Typography>
  </Stack>
);

export const CONTENT_STEP_VIEWS: {
  title: string;
  component: React.FC<{ onNext: () => void }>;
}[] = [
  {
    title: "What are your kids interested in?",
    component: (props: { onNext: () => void }) => {
      const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
      return (
        <>
          <Grid container gap="12px" width={692} justifyContent="center">
            {DUMMY_TOPICS.map((topic, i) => (
              <Grid key={i} item>
                <TopicTag
                  selected={selectedTopics.includes(topic)}
                  onClick={() =>
                    setSelectedTopics(
                      selectedTopics.includes(topic)
                        ? selectedTopics.filter((t) => t !== topic)
                        : [...selectedTopics, topic]
                    )
                  }
                >
                  {topic}
                </TopicTag>
              </Grid>
            ))}
          </Grid>
          <UrsorButton
            dark
            variant="tertiary"
            size="large"
            endIcon={ChevronRightIcon}
            onClick={props.onNext}
            disabled={selectedTopics.length === 0}
          >
            Next
          </UrsorButton>
        </>
      );
    },
  },
  {
    title: "Set your device time limits",
    component: (props: { onNext: () => void }) => {
      const [selectorValue, setSelectorValue] = useState<number>(35);
      return (
        <>
          <Stack alignItems="center" spacing="50px">
            <Stack alignItems="center" spacing="8px">
              <Typography variant="h0" color={PALETTE.secondary.purple[1]}>
                {getFormattedDuration((selectorValue / 100) * MAX_DURATION)}
              </Typography>
              <Typography variant="h5" color="rgba(255,255,255,0.87)">
                Daily
              </Typography>
            </Stack>
            <TimeLimitSelector
              value={selectorValue}
              setValue={setSelectorValue}
            />
          </Stack>
          <UrsorButton
            dark
            variant="tertiary"
            size="large"
            endIcon={ChevronRightIcon}
            onClick={props.onNext}
          >
            Next
          </UrsorButton>
        </>
      );
    },
  },
  {
    title: "Set your parental pin to keep this safe!",
    component: (props: { onNext: () => void }) => {
      const [pin, setPin] = useState<number[]>([]);
      const addToPin = (n: number) => pin.length < 4 && setPin([...pin, n]);
      return (
        <>
          <PinPad
            pin={pin}
            onAdd={addToPin}
            onRemove={() => setPin(pin.slice(0, -1))}
          />
          <Stack />
        </>
      );
    },
  },
];
