import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import { Grid } from "@mui/material";
import { useState } from "react";

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

const getFormattedDuration = (duration: number) =>
  `${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`;

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
      const [duration, setDuration] = useState<number>(3600);
      return (
        <Stack>
          <Typography variant="h0" color={PALETTE.secondary.purple[1]}>
            {getFormattedDuration(duration)}
          </Typography>
        </Stack>
      );
    },
  },
];
