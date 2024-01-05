"use client";

import { Stack } from "@mui/system";
import Logo from "@/images/logoWhite.svg";
import ChevronRight from "@/images/icons/ChevronRightIcon.svg";
import { Typography, UrsorButton } from "ui";
import { useRouter } from "next/navigation";
import { IPediaCollectionPage } from "../p/[pageId]/PediaPageContents";

export const HEADER_HEIGHT = 86;

//export const Header = (props: { collapsed: boolean }) => {
export const Header = (props: { noCreateNew?: boolean }) => {
  const router = useRouter();
  return (
    <Stack
      //position="absolute"
      // zIndex={999}
      // top={0}
      // left={0}
      //bgcolor="rgba(0,0,0,0.05)"
      // sx={{
      //   backdropFilter: "blur(8px)",
      // }}
      direction="row"
      width="100%"
      height={`${86}px`}
      minHeight={`${86}px`}
      alignItems="center"
      justifyContent="space-between"
      px="30px"
      boxSizing="border-box"
    >
      <a
        target="_blank"
        href="astrosafe.co"
        style={{
          textDecoration: "none",
        }}
        rel="noreferrer"
      >
        <Stack
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
            transition: "0.2s",
          }}
          width="170px"
        >
          <Logo width={80} />
        </Stack>
      </a>
      {/* <SearchBar /> */}
      <Stack direction="row" spacing="12px">
        <a
          target="_blank"
          href="https://astrosafe.co"
          style={{
            textDecoration: "none",
          }}
          rel="noreferrer"
        >
          <UrsorButton
            dark
            variant="tertiary"
            onClick={() => null}
            endIcon={ChevronRight}
          >
            Get Browser
          </UrsorButton>
        </a>
      </Stack>
    </Stack>
  );
};
