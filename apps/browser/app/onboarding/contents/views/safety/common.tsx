import { Stack } from "@mui/system";
import _ from "lodash";
import { useState } from "react";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import Image from "next/image";
import { DesktopOnBoardingViewLayout } from "../../layout/desktop";

const AgeCard = (props: {
  title: string;
  ages: string;
  selected: boolean;
  faded: boolean;
  subtitle: string;
  imageUrl: string;
  items: string[];
  onClick: () => void;
}) => (
  <Stack
    width="251px"
    height="317px"
    borderRadius="12px"
    alignItems="center"
    justifyContent="space-between"
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
    <Stack alignItems="center">
      <Typography variant="h4" color={PALETTE.secondary.purple[2]}>
        {props.title}
      </Typography>
      <Typography bold variant="small" color={PALETTE.secondary.purple[1]}>
        {props.ages}
      </Typography>
    </Stack>
    <Image
      src={props.imageUrl}
      height={70}
      width={118}
      alt="age illustration"
    />
    <Typography
      bold
      color={PALETTE.secondary.grey[5]}
      sx={{ textAlign: "center" }}
    >
      {props.subtitle}
    </Typography>
    <Stack spacing="8px" alignItems="center">
      {props.items.map((x, i) => (
        <Typography
          key={i}
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

const SafetyStepView = (props: { onNext: () => void; isMobile?: boolean }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<
    number | undefined
  >();
  return (
    <DesktopOnBoardingViewLayout
      title="Pick a setting that matches your child’s age"
      subtitle="Different settings have different freedom levels, you can change this as they grow."
      button={
        <Stack alignItems="center" spacing="24px">
          <Typography color="rgb(255,255,255)" bold>
            {"Don't worry, you can change this later"}
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
      }
    >
      <Stack direction="row" spacing="32px" flex={1} alignItems="center">
        <AgeCard
          title="Adventurer"
          ages="For age 3 to 7"
          subtitle="Ideal for the youngest of children"
          items={[
            "Disabled search engine",
            "Only browse content approved by you",
            "A focused ad-free video player",
          ]}
          imageUrl="https://ursorassets.s3.eu-west-1.amazonaws.com/adventurer.png"
          selected={selectedCardIndex === 0}
          faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 0}
          onClick={() => setSelectedCardIndex(0)}
        />
        <AgeCard
          title="Explorer"
          ages="For age 8 to 12"
          subtitle="Ideal for children that use the internet"
          items={[
            "Enabled safe search engine",
            "Custom built filter  for kid-first content",
            "A focused ad-free video player",
          ]}
          imageUrl="https://ursorassets.s3.eu-west-1.amazonaws.com/explorer.png"
          selected={selectedCardIndex === 1}
          faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 1}
          onClick={() => setSelectedCardIndex(1)}
        />
        <AgeCard
          title="Navigator"
          ages="For age 12+"
          subtitle="Ideal for independent use by older teens"
          items={[
            "A search engine that returns safe content",
            "A broader filter for more internet access",
            "A focused ad-free video player",
          ]}
          imageUrl="https://ursorassets.s3.eu-west-1.amazonaws.com/navigator.png"
          selected={selectedCardIndex === 2}
          faded={_.isNumber(selectedCardIndex) && selectedCardIndex !== 2}
          onClick={() => setSelectedCardIndex(2)}
        />
      </Stack>
    </DesktopOnBoardingViewLayout>
  );
};

export default SafetyStepView;
