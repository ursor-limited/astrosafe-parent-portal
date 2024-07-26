import { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { PlusButton, XButton } from "./common";
import CardStack from "./card-stack";
import { Typography } from "ui";
import { MobileOnBoardingViewLayout } from "../../layout/mobile";

const ContentSelectionViewMobileBody = (props: {
  cards: React.ReactNode[];
  title: { value: string; color?: string }[];
  onNext: () => void;
}) => {
  const [stackIndex, setStackIndex] = useState<number>(0);
  useEffect(() => {
    props.cards.length && stackIndex === props.cards.length && props.onNext();
  }, [stackIndex]);
  const [latestDecision, setLatestDecision] = useState<
    "added" | "removed" | undefined
  >();
  return (
    <MobileOnBoardingViewLayout title={props.title} subtitle="43 added">
      <Stack flex={1} height="100%" justifyContent="center" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          height="300px"
          sx={{ transform: "translateY(-36px)" }}
        >
          <CardStack
            cards={props.cards}
            stackIndex={stackIndex}
            latestDecision={latestDecision}
            isMobile
          />
        </Stack>
        <Stack sx={{ textAlign: "center" }}>
          <Typography color="rgb(255,255,255)" variant="small" bold>
            {`Mark Rober's channel features fun and educational science and
              engineering projects.`}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="20px" pt="24px">
          <Stack
            onClick={() => {
              setStackIndex(stackIndex + 1);
              setLatestDecision("removed");
            }}
          >
            <XButton />
          </Stack>
          <Stack
            onClick={() => {
              setStackIndex(stackIndex + 1);
              setLatestDecision("added");
            }}
          >
            <PlusButton />
          </Stack>
        </Stack>
      </Stack>
    </MobileOnBoardingViewLayout>
  );
};

export default ContentSelectionViewMobileBody;
