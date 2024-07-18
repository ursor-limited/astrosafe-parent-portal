import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import DeleteIcon from "@/images/icons/DeleteIcon.svg";
import XIcon from "@/images/icons/X.svg";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import TimeLimitSelector from "./TimeLimitSelector";
import { FADE_DURATION, OnBoardingViewLayout } from "./OnboardingFlow";
import { fadeIn, fadeOut } from "../components/UrsorDialog";

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

const SHOW_RED_DURATION = 1200;

const PinPad = (props: {
  pin: number[];
  onAdd: (n: number) => void;
  onRemove: () => void;
  wrong: boolean;
}) => {
  const [red, setRed] = useState<boolean>(false);
  useEffect(() => {
    if (props.wrong) {
      setRed(props.wrong);
      setTimeout(() => setRed(false), SHOW_RED_DURATION);
    }
  }, [props.wrong]);
  return (
    <Stack spacing="46px">
      <Stack direction="row" spacing="24px" justifyContent="center">
        {[...Array(4).keys()].map((i) => (
          <Stack
            height="16px"
            width="16px"
            sx={{ opacity: 0.9, transition: "0.2s" }}
            border={`2px solid ${red ? PALETTE.system.red : "white"}`}
            bgcolor={
              red
                ? PALETTE.system.red
                : props.pin.length >= i + 1
                ? "white"
                : "transparent"
            }
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
};

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

export const CONTENT_STEP_VIEWS: React.FC<{ onNext: () => void }>[] = [
  (props: { onNext: () => void }) => {
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    return (
      <OnBoardingViewLayout
        title="What are your kids interested in?"
        button={
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
        }
      >
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
      </OnBoardingViewLayout>
    );
  },
  (props: { onNext: () => void }) => {
    const [selectorValue, setSelectorValue] = useState<number>(35);
    return (
      <OnBoardingViewLayout
        title="Set your Device time limits"
        button={
          <UrsorButton
            dark
            variant="tertiary"
            size="large"
            endIcon={ChevronRightIcon}
            onClick={props.onNext}
          >
            Next
          </UrsorButton>
        }
      >
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
      </OnBoardingViewLayout>
    );
  },
  (props: { onNext: () => void }) => {
    const [pin, setPin] = useState<number[]>([]);
    const [confirmationPin, setConfirmationPin] = useState<number[]>([]);
    const [confirming, setConfirming] = useState<boolean>(false);

    const [wrong, setWrong] = useState<boolean>(false);
    const [displayIncorrectnessTitle, setDisplayIncorrectnessTitle] =
      useState<boolean>(false);
    useEffect(() => {
      if (pin.length === 4 && confirmationPin.length === 4) {
        setWrong(true);
        setDisplayIncorrectnessTitle(true);
        setTimeout(() => {
          setWrong(false);
          setConfirmationPin([]);
        }, SHOW_RED_DURATION);
      }
    }, [pin, confirmationPin]);

    const [fade, setFade] = useState<"in" | "out">("in");
    useEffect(() => {
      if (pin.length === 4) {
        setFade("out");
        setTimeout(() => {
          setConfirming(true);
          setFade("in");
        }, FADE_DURATION);
      }
    }, [pin]);
    useEffect(() => {
      pin.length > 0 && pin === confirmationPin && props.onNext();
    }, [pin, confirmationPin]);

    const addToPin = (n: number) =>
      (confirming ? confirmationPin : pin).length < 4 &&
      (confirming ? setConfirmationPin : setPin)([
        ...(confirming ? confirmationPin : pin),
        n,
      ]);
    return (
      <Stack
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
        sx={{
          animation: `${
            fade === "in" ? fadeIn : fadeOut
          } ${FADE_DURATION}ms ease-out`,
          animationFillMode: "forwards",
        }}
      >
        <OnBoardingViewLayout
          title={
            displayIncorrectnessTitle
              ? "The pin you entered is incorrect, please try again"
              : confirming
              ? "Confirm your super safe pin"
              : "Set your parental pin to keep this safe!"
          }
        >
          <PinPad
            pin={confirming ? confirmationPin : pin}
            onAdd={addToPin}
            onRemove={() =>
              setPin((confirming ? confirmationPin : pin).slice(0, -1))
            }
            wrong={wrong}
          />
        </OnBoardingViewLayout>
      </Stack>
    );
  },
];
