"use client";

import { Stack } from "@mui/system";
import Logo from "@/images/logoWhite.svg";
import ChevronRight from "@/images/icons/ChevronRightIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import { useAuth0 } from "@auth0/auth0-react";

export const HEADER_HEIGHT = 86;
export const ASTRO_MAGICAL_GRADIENT =
  "linear-gradient(150deg, #FD9B41, #F279C5, #1D62F6, #0AE799)";

export const Header = (props: { noCreateNew?: boolean }) => {
  const { user, loginWithPopup, logout } = useAuth0();
  return (
    <Stack
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
          {user ? (
            <UrsorButton dark variant="secondary" onClick={() => null}>
              Try ASTRO
            </UrsorButton>
          ) : (
            <UrsorButton
              dark
              variant="tertiary"
              onClick={() => null}
              endIcon={ChevronRight}
            >
              Get Browser
            </UrsorButton>
          )}
        </a>
        {user ? (
          <Stack
            p="2px"
            boxSizing="border-box"
            sx={{
              background: ASTRO_MAGICAL_GRADIENT,
            }}
            borderRadius="100%"
            height="42px"
            width="42px"
          >
            <Stack
              flex={1}
              borderRadius="100%"
              justifyContent="center"
              alignItems="center"
              bgcolor="#253D4D"
            >
              <Typography bold color={PALETTE.font.light}>
                {(
                  user.name?.split(" ")[0][0] +
                  (user.name?.split(" ")[1][0] || "")
                ).toUpperCase()}
              </Typography>
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
};
