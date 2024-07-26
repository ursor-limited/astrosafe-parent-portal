import { Stack } from "@mui/system";
import _ from "lodash";
import { useState } from "react";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import { DynamicContainer, PALETTE, Typography, UrsorButton } from "ui";
import Image from "next/image";
import { MobileOnBoardingViewLayout } from "../../layout/mobile";

const AgeCard = (props: {
  title: string;
  ages: string;
  selected: boolean;
  faded: boolean;
  subtitle: string;
  imageUrl: string;
  items: string[];
  onClick: () => void;
}) => {
  const [showItems, setShowItems] = useState<boolean>(false);
  return (
    <DynamicContainer duration={600}>
      <Stack
        borderRadius="12px"
        justifyContent="space-between"
        px="16px"
        py="12px"
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
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5" color={PALETTE.secondary.purple[2]}>
              {props.title}
            </Typography>
            <Stack
              onClick={() => setShowItems(!showItems)}
              sx={{ transform: `rotate(${showItems ? 180 : 0}deg)` }}
            >
              <ChevronDownIcon height="24px" width="24px" />
            </Stack>
          </Stack>
          <Typography bold variant="small" color={PALETTE.secondary.purple[1]}>
            {props.ages}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing="8px">
          <Typography bold color={PALETTE.secondary.grey[5]}>
            {props.subtitle}
          </Typography>
          <Image
            src={props.imageUrl}
            height={63}
            width={106}
            alt="age illustration"
          />
        </Stack>
        {showItems ? (
          <Stack spacing="2px">
            {props.items.map((x, i) => (
              <Typography
                key={i}
                variant="small"
                bold
                color={PALETTE.secondary.grey[4]}
                sx={{ textAlign: "center" }}
              >
                {x}
              </Typography>
            ))}
          </Stack>
        ) : null}
      </Stack>
    </DynamicContainer>
  );
};

const SafetyStepViewMobileBody = (props: {
  onNext: () => void;
  isMobile?: boolean;
}) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<
    number | undefined
  >();
  return (
    <MobileOnBoardingViewLayout
      title="Pick a setting that matches your child's age"
      subtitle="Different settings have different freedom levels, you can change this as they grow."
      button={
        <Stack alignItems="center" spacing="24px">
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
      <Stack spacing="12px" flex={1} alignItems="center">
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
          subtitle="Ideal for children who use the internet"
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
    </MobileOnBoardingViewLayout>
  );
};

export default SafetyStepViewMobileBody;
