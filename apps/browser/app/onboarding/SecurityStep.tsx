import { Stack } from "@mui/system";
import _ from "lodash";
import { useState } from "react";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import { PALETTE, Typography, UrsorButton } from "ui";

const AgeCard = (props: {
  title: string;
  ages: string;
  selected: boolean;
  faded: boolean;
  subtitle: string;
  onClick: () => void;
}) => (
  <Stack
    width="251px"
    height="317px"
    borderRadius="12px"
    alignItems="center"
    p="16px"
    boxSizing="border-box"
    bgcolor="rgba(255,255,255,0.95)"
    sx={{
      opacity: props.faded ? 0.6 : 1,
      cursor: "pointer",
      "&:hover": { opacity: 0.8 },
      transition: "0.2s",
      pointerEvents: props.selected ? "none" : undefined,
      outline: `2px solid ${
        props.selected ? PALETTE.secondary.purple[2] : "transparent"
      }`,
    }}
    spacing="12px"
    onClick={props.onClick}
    boxShadow={`0 0 30px ${props.selected ? "#A594FF" : undefined}`}
  >
    <Typography variant="h4" color={PALETTE.secondary.purple[2]}>
      {props.title}
    </Typography>
    <Typography bold variant="small" color={PALETTE.secondary.grey[5]}>
      {props.ages}
    </Typography>
    <Typography bold variant="small" color={PALETTE.secondary.grey[5]}>
      {props.subtitle}
    </Typography>
  </Stack>
);

export const SECURITY_STEP_TITLE = "Set up the Browser, the basics...";
const SecurityStepView = (props: { onNext: () => void }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<
    number | undefined
  >();
  return (
    <>
      <Stack direction="row" spacing="32px">
        <AgeCard
          title="Adventurer"
          ages="For age 3 to 6"
          subtitle="Provide access to a safe version of the internet with safe links."
          selected={selectedCardIndex === 0}
          faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 0}
          onClick={() => setSelectedCardIndex(0)}
        />
        <AgeCard
          title="Explorer"
          ages="For age 7 to 10"
          subtitle="Provide access to a safe version of the internet with safe links."
          selected={selectedCardIndex === 1}
          faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 1}
          onClick={() => setSelectedCardIndex(1)}
        />
        <AgeCard
          title="Navigator"
          ages="For ages 11+"
          subtitle="Provide access to a safe version of the internet with safe links."
          selected={selectedCardIndex === 2}
          faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 2}
          onClick={() => setSelectedCardIndex(2)}
        />
      </Stack>
      <UrsorButton
        dark
        variant="tertiary"
        size="large"
        endIcon={ChevronRightIcon}
        onClick={props.onNext}
        disabled={!_.isNumber(selectedCardIndex)}
      >
        Next
      </UrsorButton>
    </>
  );
};

export default SecurityStepView;
