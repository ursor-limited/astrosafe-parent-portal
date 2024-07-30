import { DesktopOnBoardingViewLayout } from "../../layout/desktop";
import { DynamicContainer, PALETTE, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import { Stack } from "@mui/system";
import { Grid } from "@mui/material";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { TopicTag } from "./common";
import { MobileOnBoardingViewLayout } from "../../layout/mobile";

const DUMMY_TOPICS = [
  "boo",
  "guu",
  "cats",
  "dogs",
  "caterpillars",
  "architecture",
  "aaaa",
];

const TopicSelectionViewMobileBody = (props: {
  onNext: () => void;
  selectedTopics: string[];
  addOrRemoveTopic: (topic: string) => void;
}) => {
  return (
    <MobileOnBoardingViewLayout
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
            alignItems="center"
            justifyContent="center"
            border={`2px solid ${PALETTE.secondary.grey[4]}`}
            p="8px"
            borderRadius="12px"
            maxWidth="100%"
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
        <Grid container gap="12px" justifyContent="center">
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
    </MobileOnBoardingViewLayout>
  );
};

export default TopicSelectionViewMobileBody;
