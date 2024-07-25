"use client";

import { Stack } from "@mui/system";
import { DynamicContainer, PALETTE, Typography, UrsorButton } from "ui";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { FADE_DURATION, OnBoardingViewLayout } from "./OnboardingFlow";
import { fadeIn, fadeOut } from "../components/UrsorDialog";
import UrsorFadeIn from "../components/UrsorFadeIn";
import {
  AppsAdditionView,
  ChannelAdditionView,
  VideoAdditionView,
} from "./ContentAdditionView";
import TimeLimitsView from "./TimeLimitsView";
import PinPad, { SHOW_RED_DURATION } from "../components/PinPad";

const DUMMY_TOPICS = [
  "boo",
  "guu",
  "cats",
  "dogs",
  "caterpillars",
  "architecture",
  "aaaa",
];

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

export const CONTENT_STEP_VIEWS: React.FC<{ onNext: () => void }>[] = [
  (props: { onNext: () => void }) => {
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    return (
      <OnBoardingViewLayout
        title="What type of content do you want to see?"
        subtitle="Please select 3 or more and we will help you and your child discover more great Content from the internet!"
        button={
          <UrsorButton
            dark
            variant="tertiary"
            size="large"
            endIcon={ChevronRightIcon}
            iconSize={22}
            onClick={props.onNext}
            disabled={selectedTopics.length === 0}
          >
            Next
          </UrsorButton>
        }
      >
        <Stack spacing="32px" alignItems="center">
          <DynamicContainer duration={400}>
            <Grid
              container
              gap="12px"
              width={692}
              alignItems="center"
              justifyContent="center"
              border={`2px solid ${PALETTE.secondary.grey[4]}`}
              p="12px"
              borderRadius="12px"
              maxWidth="686px"
            >
              {selectedTopics.map((topic, i) => (
                <UrsorFadeIn key={i} duration={600}>
                  <Grid item>
                    <TopicTag
                      selected
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
                </UrsorFadeIn>
              ))}
            </Grid>
          </DynamicContainer>
          <Grid container gap="12px" width={692} justifyContent="center">
            {DUMMY_TOPICS.map((topic, i) => (
              <Grid
                key={i}
                item
                sx={{ opacity: selectedTopics.includes(topic) ? 0.4 : 1 }}
              >
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
        </Stack>
      </OnBoardingViewLayout>
    );
  },
  VideoAdditionView,
  ChannelAdditionView,
  AppsAdditionView,
  TimeLimitsView,
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
              ? "Please confirm your pin"
              : "Set your parental pin to keep this safe!"
          }
          subtitle={
            displayIncorrectnessTitle
              ? "Please enter the same pin"
              : confirming
              ? "Enter your pin again to make sure it's correct! Keep this safe!"
              : "This is needed so you can manage your settings later. Ask your child to look away and note this down!"
          }
        >
          <PinPad
            pin={confirming ? confirmationPin : pin}
            onKey={addToPin}
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
