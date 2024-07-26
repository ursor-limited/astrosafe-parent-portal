import { useState } from "react";
import { DesktopOnBoardingViewLayout } from "../../layout/desktop";
import { DynamicContainer, PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import { Stack } from "@mui/system";
import { Grid } from "@mui/material";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import XIcon from "@/images/icons/X.svg";

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

const TopicSelectionView = (props: {
  onNext: () => void;
  isMobile?: boolean;
}) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  return (
    <DesktopOnBoardingViewLayout
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
    </DesktopOnBoardingViewLayout>
  );
};

export default TopicSelectionView;
