"use client";

import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { PALETTE, UrsorButton } from "ui";
import Logo from "@/images/logo.svg";
import Kitemark from "@/images/kiteMark.svg";
import ChevronLeftLight from "@/images/icons/ChevronLeftLight.svg";

export const HEADER_HEIGHT = 86;

//export const Header = (props: { collapsed: boolean }) => {
export const Header = (props: { noCreateNew?: boolean }) => {
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
      <Stack width="fit-content">
        <Link href="https://astrosafe.co/">
          <Stack
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.8 },
              transition: "0.2s",
            }}
          >
            <Image width={80} src={Logo} alt="Astro" />
          </Stack>
        </Link>
      </Stack>
      <Stack direction="row" spacing="12px">
        {!props.noCreateNew ? (
          <Link href={"https://astrosafe.co/video"} target={"_blank"}>
            <UrsorButton dark variant="secondary" startIcon={ChevronLeftLight}>
              Create new
            </UrsorButton>
          </Link>
        ) : null}
        <Link href={"https://astrosafe.co/"} target={"_blank"}>
          <UrsorButton
            dark
            variant="tertiary"
            endIcon={<Image src={Kitemark} height={14} alt="Astro kitemark" />}
          >
            Discover AstroSafe
          </UrsorButton>
        </Link>
      </Stack>
    </Stack>
  );
};
