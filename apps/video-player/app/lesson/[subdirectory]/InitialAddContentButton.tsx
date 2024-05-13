import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { DOT_CARD_Y } from "./Timeline";
import { useState } from "react";
import Image from "next/image";

const InitialAddContentButton = (props: {
  setStarterAddContentPopoverOpen: () => void;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack position="relative">
      <UrsorFadeIn delay={1000} duration={800}>
        <Stack
          key="starter"
          width="94%"
          onMouseEnter={() => {
            setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
          }}
          onClick={props.setStarterAddContentPopoverOpen}
        >
          <Stack
            height="230px"
            border={`2px solid ${
              hovering ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[3]
            }`}
            borderRadius="12px"
            justifyContent="center"
            alignItems="center"
            sx={{
              transition: "0.2s",
              cursor: "pointer",
              svg: {
                path: {
                  transition: "0.2s",
                  fill: hovering
                    ? PALETTE.secondary.purple[2]
                    : PALETTE.secondary.grey[3],
                },
              },
            }}
          >
            <Stack
              sx={{
                transform: "translateY(5px)",
                filter: `grayscale(${hovering ? 0 : 100}%)`,
                opacity: hovering ? 1 : 0.5,
                transition: "0.2s",
              }}
            >
              <Image
                src="https://ursorassets.s3.eu-west-1.amazonaws.com/Untitled_Artwork+21+1.png"
                height={170}
                width={170}
                alt="graph illustration"
              />
            </Stack>

            <Stack
              direction="row"
              spacing="7px"
              justifyContent="center"
              alignItems="center"
              sx={{
                transform: "translateY(-20px)",
              }}
            >
              <PlusIcon height="24px" width="24px" />
              <Typography
                color={
                  hovering
                    ? PALETTE.secondary.purple[2]
                    : PALETTE.secondary.grey[3]
                }
                sx={{
                  transition: "0.2s",
                }}
                bold
                variant="large"
              >
                Add
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </UrsorFadeIn>
      <Stack position="absolute" top={`${DOT_CARD_Y}px`} right="-8px">
        <Stack
          // @ts-ignore
          id="starterdot"
          bgcolor={PALETTE.secondary.purple[1]}
          height="16px"
          width="16px"
          borderRadius="100%"
        />
      </Stack>
    </Stack>
  );
};

export default InitialAddContentButton;
