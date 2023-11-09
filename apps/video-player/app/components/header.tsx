"use client";

import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { UrsorButton } from "ui";
import Logo from "@/images/logo.svg";
import Kitemark from "@/images/kiteMark.svg";
import ChevronLeft from "@/images/icons/ChevronLeftLight.svg";

export const Header = () => {
  return (
    <Stack
      direction="row"
      width="100%"
      height="86px"
      alignItems="center"
      justifyContent="space-between"
      px="28px"
    >
      <Stack width="fit-content">
        <Link href="/">
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
        <Link href={"https://astrosafe.co/"} target={"_blank"}>
          <UrsorButton
            dark
            variant="secondary"
            startIcon={
              <Image src={ChevronLeft} height={20} alt="Chevron left" />
            }
          >
            Create new
          </UrsorButton>
        </Link>
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
