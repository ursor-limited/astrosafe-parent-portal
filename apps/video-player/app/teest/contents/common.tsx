"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import FilterIcon from "@/images/icons/FilterIcon.svg";
import BookIcon from "@/images/icons/BookIcon.svg";
import VersionsIcon from "@/images/icons/VersionsIcon.svg";
import XIcon from "@/images/icons/X.svg";
import _ from "lodash";
import Image from "next/image";
import { useState } from "react";
import { UserInitialsCircle } from "@/app/account/AccountPageContents";

export const astroPages = [
  "profiles",
  "filters",
  "content",
  "lessons",
  "account",
] as const;
export type AstroPage = (typeof astroPages)[number];
const PAGE_ICONS: Record<AstroPage, React.FC<React.SVGProps<SVGSVGElement>>> = {
  profiles: PhoneIcon,
  filters: FilterIcon,
  content: BookIcon,
  lessons: VersionsIcon,
  account: VersionsIcon,
};

const AllFiltersPage = (props: { isMobile: boolean }) => {
  const [selectedPage, setSelectedPage] = useState<AstroPage>("profiles");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Stack
        position="absolute"
        bgcolor="rgba(0,0,0,0.2)"
        width="100%"
        height="100%"
        onClick={() => setOpen(!open)}
        sx={{
          //pointerEvents: open ? undefined : "none",
          opacity: open ? 1 : 0,
          transition: "0.6s",
        }}
      />
      <Stack
        position="absolute"
        spacing="32px"
        height="100%"
        width="272px"
        bgcolor="rgb(255,255,255)"
        px="28px"
        py="56px"
        boxSizing="border-box"
        sx={{
          transform: `translateX(${open ? 0 : "-100%"})`,
          transition: "0.6s",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image
            src="https://ursorassets.s3.eu-west-1.amazonaws.com/astroLogo!.png"
            height={20}
            width={59}
            alt="astro"
          />
          <Stack onClick={() => setOpen(false)}>
            <XIcon height="28px" width="28px" />
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" height="100%">
          <Stack spacing="24px">
            {["profiles", "filters", "content", "lessons"].map((page) => {
              const Icon = PAGE_ICONS[page as AstroPage];
              return (
                <Stack
                  direction="row"
                  spacing="12px"
                  alignItems="center"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                    transition: "0.2s",
                    svg: {
                      path: {
                        fill:
                          selectedPage === page
                            ? PALETTE.secondary.purple[2]
                            : PALETTE.primary.navy,
                      },
                    },
                  }}
                >
                  <Icon height="28px" width="28px" />
                  <Typography
                    bold
                    color={
                      selectedPage === page
                        ? PALETTE.secondary.purple[2]
                        : PALETTE.primary.navy
                    }
                  >
                    {_.capitalize(page)}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
          <Stack
            direction="row"
            spacing="12px"
            alignItems="center"
            onClick={() => setSelectedPage("account")}
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.7 },
              transition: "0.2s",
            }}
          >
            <UserInitialsCircle size={32} fontSize={12} name={"Mario Super"} />
            <Typography
              bold
              color={
                selectedPage === "account"
                  ? PALETTE.secondary.purple[2]
                  : PALETTE.primary.navy
              }
            >
              Account
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default AllFiltersPage;
