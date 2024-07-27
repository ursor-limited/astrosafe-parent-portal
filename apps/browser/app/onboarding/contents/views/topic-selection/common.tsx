import { useState } from "react";
import { DesktopOnBoardingViewLayout } from "../../layout/desktop";
import { DynamicContainer, PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import { Stack } from "@mui/system";
import { Grid } from "@mui/material";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import XIcon from "@/images/icons/X.svg";
import TopicSelectionViewDesktopBody from "./body-desktop";
import TopicSelectionViewMobileBody from "./body-mobile";

const DUMMY_TOPICS = [
  "boo",
  "guu",
  "cats",
  "dogs",
  "caterpillars",
  "architecture",
  "aaaa",
];

export const TopicTag = (props: {
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

const TopicSelectionView = (props: {
  onNext: () => void;
  isMobile?: boolean;
}) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  return props.isMobile ? (
    <TopicSelectionViewMobileBody
      onNext={props.onNext}
      selectedTopics={selectedTopics}
      addOrRemoveTopic={(topic) =>
        setSelectedTopics(
          selectedTopics.includes(topic)
            ? selectedTopics.filter((t) => t !== topic)
            : [...selectedTopics, topic]
        )
      }
    />
  ) : (
    <TopicSelectionViewDesktopBody
      onNext={props.onNext}
      selectedTopics={selectedTopics}
      addOrRemoveTopic={(topic) =>
        setSelectedTopics(
          selectedTopics.includes(topic)
            ? selectedTopics.filter((t) => t !== topic)
            : [...selectedTopics, topic]
        )
      }
    />
  );
};

export default TopicSelectionView;
