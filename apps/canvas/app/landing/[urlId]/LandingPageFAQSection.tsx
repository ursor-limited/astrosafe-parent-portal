import { Stack, keyframes } from "@mui/system";
import { useRouter } from "next/navigation";
import { PALETTE, Typography } from "ui";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import PinkPurpleStar from "@/images/PinkPurpleStar.svg";
import { useState } from "react";
import DynamicContainer from "../../components/DynamicContainer";

export const spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(180deg);
}
`;

const LandingPageFAQSectionItem = (props: {
  question: string;
  answer: string;
  small?: boolean;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Stack
      width="100%"
      minHeight={props.small ? "66px" : "82px"}
      borderRadius="12px"
      bgcolor="rgba(255,255,255)"
      justifyContent="center"
      alignItems="space-between"
      px="20px"
      py={props.small ? "18px" : "26px"}
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        svg: {
          path: {
            fill: hovering
              ? PALETTE.secondary.purple[1]
              : PALETTE.secondary.grey[5],
          },
        },
        outline: `${hovering ? 2 : 0}px solid ${PALETTE.secondary.purple[1]}`,
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      onClick={() => {
        setHovering(false);
        setOpen(!open);
      }}
    >
      <DynamicContainer duration={800} fullWidth>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          pb={open ? "18px" : undefined}
        >
          <Typography
            sx={{
              transition: "0.2s",
              fontWeight: 500,
            }}
            variant={props.small ? "medium" : "large"}
            bold
            color={
              hovering ? PALETTE.secondary.purple[1] : PALETTE.secondary.grey[5]
            }
          >
            {props.question}
          </Typography>

          <Stack
            sx={{
              transform: `rotate(${open ? 180 : 0}deg)`,
              transition: "0.3s",
            }}
          >
            <ChevronDownIcon
              height={props.small ? "25px" : "30px"}
              width={props.small ? "25px" : "30px"}
            />
          </Stack>
        </Stack>
        {open ? (
          <Typography
            sx={{
              transition: "0.2s",
              fontWeight: 400,
              width: "90%",
            }}
            bold
            color={PALETTE.secondary.grey[5]}
          >
            {props.answer}
          </Typography>
        ) : null}
      </DynamicContainer>
    </Stack>
  );
};

export const LandingPageFAQSection = (props: { mobile?: boolean }) => {
  const router = useRouter();
  return (
    <Stack width="100%" bgcolor={PALETTE.secondary.grey[1]} alignItems="center">
      <Stack
        maxWidth="calc(1320px + 2 * 24px)"
        width="100%"
        minHeight="570px"
        py="100px"
        spacing={props.mobile ? "12px" : "20px"}
        px="24px"
      >
        <Stack
          alignItems="center"
          spacing="12px"
          pb={props.mobile ? "24px" : undefined}
        >
          <Stack
            sx={{
              animation: `${spin} 5s linear infinite`,
            }}
          >
            <PinkPurpleStar height={20} width={20} />
          </Stack>
          <Typography
            variant={props.mobile ? "h4" : "h2"}
            color={PALETTE.secondary.grey[5]}
            sx={{
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Learn more about AstroPedia
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              textAlign: "center",
            }}
            color={PALETTE.secondary.grey[4]}
            variant={props.mobile ? "small" : "normal"}
          >
            Answers to a few common questions we receive.
          </Typography>
        </Stack>
        <LandingPageFAQSectionItem
          small={props.mobile}
          question="How do I access the safe video?"
          answer="After you have created the safe video link, you simply need to share the url that is created and that's it! If you are the creator you will be able to edit the title and description."
        />
        <LandingPageFAQSectionItem
          small={props.mobile}
          question="Is AstroPedia free to use?"
          answer="Yes, this page is free to use! However, after a certain limit we will ask you to create an account to avoid abuse of the product."
        />
        <LandingPageFAQSectionItem
          small={props.mobile}
          question="Is AstroPedia free to use?"
          answer="SafeTube allows for educators to share videos safely. Our mission is to enable educational videos to be accessible in classrooms and ensure more students can learn from the fantastic free content that is produced. We have no affiliation with YouTube or Vimeo. Usage is limited to videos that you own, is free of copyrights, or if explicit permission from the copyright owner has been obtained. If your content is being used without permission, please contact us to have the content removed from our website. Please use this tool responsibly."
        />
      </Stack>
    </Stack>
  );
};
