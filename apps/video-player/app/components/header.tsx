"use client";

import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { PALETTE, UrsorButton } from "ui";
import Logo from "@/images/logo.svg";
import Kitemark from "@/images/kiteMark.svg";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";

export const HEADER_HEIGHT = 86;

//export const Header = (props: { collapsed: boolean }) => {
export const Header = (props: { noCreateNew?: boolean; noLogo?: boolean }) => {
  return (
    <Stack
      direction="row"
      width="100%"
      height={`${86}px`}
      minHeight={`${86}px`}
      alignItems="center"
      justifyContent="space-between"
      px="28px"
      // sx={{
      //   display: props.collapsed ? "none" : undefined,
      // }}
    >
      {!props.noLogo ? (
        <Stack width="fit-content">
          <Link href="https://astrosafe.co/">
            <Stack
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
                transition: "0.2s",
              }}
            >
              <Logo width={80} />
            </Stack>
          </Link>
        </Stack>
      ) : null}
      <Stack direction="row" spacing="12px">
        {!props.noCreateNew ? (
          <Link href={"https://astrosafe.co/video"} target={"_blank"}>
            <UrsorButton
              dark
              variant="secondary"
              startIcon={ChevronLeft}
              iconSize={22}
            >
              Create new
            </UrsorButton>
          </Link>
        ) : null}
        <Link href={"https://astrosafe.co/"} target={"_blank"}>
          <UrsorButton
            dark
            variant="tertiary"
            endIcon={Kitemark}
            iconColor="rgba(255,255,255,0.7)"
            iconSize={15}
          >
            Discover AstroSafe
          </UrsorButton>
        </Link>
      </Stack>
    </Stack>
  );
};
