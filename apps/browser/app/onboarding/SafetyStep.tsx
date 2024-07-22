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
  items: string[];
  onClick: () => void;
}) => (
  <Stack
    width="251px"
    height="317px"
    borderRadius="12px"
    alignItems="center"
    p="16px"
    py="26px"
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
    <Typography
      bold
      variant="small"
      color={
        props.faded ? PALETTE.secondary.purple[1] : PALETTE.secondary.grey[5]
      }
    >
      {props.ages}
    </Typography>
    <Stack
      height="73px"
      width="100%"
      bgcolor={PALETTE.secondary.grey[2]}
      justifyContent="center"
      alignItems="center"
    >
      <Typography bold color={PALETTE.secondary.grey[3]}>
        VISUAL
      </Typography>
    </Stack>
    <Typography
      bold
      variant="small"
      color={PALETTE.secondary.grey[5]}
      sx={{ textAlign: "center" }}
    >
      {props.subtitle}
    </Typography>
    <Stack spacing="8px" alignItems="center">
      {props.items.map((x) => (
        <Typography
          variant="tiny"
          bold
          color={PALETTE.secondary.grey[4]}
          sx={{ textAlign: "center" }}
        >
          {x}
        </Typography>
      ))}
    </Stack>
  </Stack>
);

export const SAFETY_STEP_TITLE =
  "First, select a Browser pre-set that matches your child's age";
const SafetyStepView = (props: { onNext: () => void }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<
    number | undefined
  >();
  return (
    <>
      <Stack direction="row" spacing="32px">
        <AgeCard
          title="Adventurer"
          ages="For age 3 to 7"
          subtitle="Provide a limited and curated internet experience."
          items={[
            "Search & internet access is not allowed",
            "Browse safe Videos and Links from our library",
            "XXX",
          ]}
          selected={selectedCardIndex === 0}
          faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 0}
          onClick={() => setSelectedCardIndex(0)}
        />
        <AgeCard
          title="Explorer"
          ages="For age 7 to 10"
          subtitle="An exploratory internet experience for older kids."
          items={[
            "Access to Search with 20+ Filters",
            "Browse Links, Apps and Videos",
            "Browse from an encyclopaedic repository",
          ]}
          selected={selectedCardIndex === 1}
          faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 1}
          onClick={() => setSelectedCardIndex(1)}
        />
        <AgeCard
          title="Navigator"
          ages="For ages 11+"
          subtitle="A braver and wider, independent Browser"
          items={[
            "Access to Search with 40+ Filters",
            "Access to Search with more inclusive Filters",
            "Videos from our library",
          ]}
          selected={selectedCardIndex === 2}
          faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 2}
          onClick={() => setSelectedCardIndex(2)}
        />
      </Stack>
      <Stack alignItems="center" spacing="24px">
        <Typography color="rgb(255,255,255)" bold>
          Don't worry, you can change this later
        </Typography>
        <UrsorButton
          dark
          variant="tertiary"
          size="large"
          endIcon={ChevronRightIcon}
          iconSize={22}
          onClick={props.onNext}
          disabled={!_.isNumber(selectedCardIndex)}
        >
          Next
        </UrsorButton>
      </Stack>
    </>
  );
};

export default SafetyStepView;
