"use client";

import { Stack } from "@mui/system";
import Logo from "@/images/logoWhite.svg";
import ChevronRight from "@/images/icons/ChevronRightIcon.svg";
import { Typography, UrsorButton } from "ui";
import { useRouter } from "next/navigation";
import { IPediaCollectionPage } from "../p/[pageId]/PediaPageContents";

export const HEADER_HEIGHT = 86;

//export const Header = (props: { collapsed: boolean }) => {
export const Header = (props: {
  noCreateNew?: boolean;
  parentPages: IPediaCollectionPage[];
}) => {
  const router = useRouter();
  return (
    <Stack
      position="absolute"
      zIndex={999}
      top={0}
      left={0}
      bgcolor="rgba(0,0,0,0.05)"
      sx={{
        backdropFilter: "blur(6px)",
      }}
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
        {props.parentPages?.map((p) => (
          <Stack
            key={p.id}
            height="37px"
            borderRadius="8px"
            px="12px"
            boxSizing="border-box"
            bgcolor="rgb(255,255,255)"
            justifyContent="center"
            sx={{
              "&:hover": { opacity: 0.7 },
              transition: "0.2s",
              cursor: "pointer",
            }}
            boxShadow="0 0 25px rgba(0,0,0,0.2)"
            onClick={() => router.push(`/c/${p.id}`)}
          >
            <Typography bold>{p.title}</Typography>
          </Stack>
        ))}
      </Stack>
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
