import { useEffect, useState } from "react";
import { DesktopOnBoardingViewLayout } from "../../layout/desktop";
import { Stack } from "@mui/system";
import { PlusButton, XButton } from "./common";
import CardStack from "./card-stack";
import { Typography } from "ui";

const ContentSelectionViewDesktopBody = (props: {
  cards: React.ReactNode[];
  title: { value: string; color?: string }[];
  onNext: () => void;
  isMobile?: boolean;
}) => {
  const [stackIndex, setStackIndex] = useState<number>(0);
  useEffect(() => {
    props.cards.length && stackIndex === props.cards.length && props.onNext();
  }, [stackIndex]);
  const [latestDecision, setLatestDecision] = useState<
    "added" | "removed" | undefined
  >();
  return (
    <DesktopOnBoardingViewLayout
      title={props.title}
      subtitle="43 added"
      //   button={
      //     <UrsorButton
      //       dark
      //       variant="tertiary"
      //       size="large"
      //       iconSize={22}
      //       endIcon={ChevronRightIcon}
      //       onClick={props.onNext}
      //       disabled={stackIndex < props.cards.length}
      //     >
      //       Next
      //     </UrsorButton>
      //   }
    >
      <Stack flex={1} height="100%" justifyContent="center" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            transform: "translateY(-70px)",
          }}
          height="430px"
        >
          <Stack
            onClick={() => {
              setStackIndex(stackIndex + 1);
              setLatestDecision("removed");
            }}
          >
            <XButton />
          </Stack>
          <CardStack
            cards={props.cards}
            stackIndex={stackIndex}
            latestDecision={latestDecision}
          />
          <Stack
            onClick={() => {
              setStackIndex(stackIndex + 1);
              setLatestDecision("added");
            }}
          >
            <PlusButton />
          </Stack>
        </Stack>
        <Stack width="466px" sx={{ textAlign: "center" }}>
          <Typography color="rgb(255,255,255)" variant="medium" bold>
            {`Mark Rober's channel features fun and educational science and
              engineering projects.`}
          </Typography>
        </Stack>
      </Stack>
    </DesktopOnBoardingViewLayout>
  );
};

export default ContentSelectionViewDesktopBody;
