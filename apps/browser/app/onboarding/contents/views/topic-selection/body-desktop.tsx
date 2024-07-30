import { DesktopOnBoardingViewLayout } from "../../layout/desktop";
import { DynamicContainer, PALETTE, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import { Stack } from "@mui/system";
import { Grid } from "@mui/material";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { TopicTag } from "./common";

const DUMMY_TOPICS = [
  "boo",
  "guu",
  "cats",
  "dogs",
  "caterpillars",
  "architecture",
  "aaaa",
];

const TopicSelectionViewDesktopBody = (props: {
  onNext: () => void;
  selectedTopics: string[];
  addOrRemoveTopic: (topic: string) => void;
}) => {
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
          disabled={props.selectedTopics.length === 0}
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
            {props.selectedTopics.map((topic, i) => (
              <UrsorFadeIn key={i} duration={600}>
                <Grid item>
                  <TopicTag
                    selected
                    onClick={() => props.addOrRemoveTopic(topic)}
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
              sx={{ opacity: props.selectedTopics.includes(topic) ? 0.4 : 1 }}
            >
              <TopicTag
                selected={props.selectedTopics.includes(topic)}
                onClick={() => props.addOrRemoveTopic(topic)}
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

export default TopicSelectionViewDesktopBody;
