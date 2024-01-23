"use client";

import { Stack } from "@mui/system";
import Logo from "@/images/logoWhite.svg";
import ChevronRight from "@/images/icons/ChevronRightIcon.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import LogOutIcon from "@/images/icons/LogOutIcon.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const UrsorPopover = dynamic(
  () => import("@/app/components/UrsorPopover"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const HEADER_HEIGHT = 86;
export const ASTRO_MAGICAL_GRADIENT =
  "linear-gradient(150deg, #FD9B41, #F279C5, #1D62F6, #0AE799)";

const ProfileButton = (props: { initials: string }) => (
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
        {props.initials}
      </Typography>
    </Stack>
  </Stack>
);

const ProfilePopupButton = (props: {
  callback: () => void;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  // hoveringOnCallback: () => void;
  // hoveringOffCallback: () => void;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      height="36px"
      minHeight="36px"
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.7 },
        transition: "0.2s",
        svg: {
          path: {
            fill: hovering
              ? PALETTE.secondary.purple[2]
              : PALETTE.secondary.grey[5],
          },
        },
      }}
      onClick={props.callback}
      direction="row"
      spacing="8px"
      alignItems="center"
      px="20px"
      bgcolor={hovering ? PALETTE.secondary.grey[1] : undefined}
      // onMouseEnter={props.hoveringOnCallback}
      // onMouseLeave={props.hoveringOffCallback}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <props.icon height="16px" width="16px" />
      <Typography
        variant="small"
        bold
        color={
          hovering ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[5]
        }
      >
        {props.text}
      </Typography>
    </Stack>
  );
};

export const Header = (props: { noCreateNew?: boolean }) => {
  const { user, logout, loginWithPopup } = useAuth0();
  const [profilePopupOpen, setProfilePopupOpen] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
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
        {!user ? (
          <UrsorButton
            dark
            variant="secondary"
            onClick={loginWithPopup}
            endIcon={PersonIcon}
          >
            Log in
          </UrsorButton>
        ) : null}
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
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.7 },
              transition: "0.2s",
            }}
          >
            <UrsorPopover
              open={profilePopupOpen}
              content={
                <Stack>
                  <Stack
                    height="40px"
                    alignItems="center"
                    sx={{
                      background: ASTRO_MAGICAL_GRADIENT,
                      "-webkit-text-fill-color": "transparent",
                      backgroundClip: "text",
                      "-webkit-background-clip": "text",
                    }}
                    px="20px"
                    justifyContent="center"
                    borderBottom={`1px solid ${PALETTE.secondary.grey[2]}`}
                  >
                    <Typography bold variant="small">
                      {user.email}
                    </Typography>
                  </Stack>
                  <ProfilePopupButton
                    callback={() => logout()}
                    icon={ListUnorderedIcon}
                    text="Dashboard"
                    // hoveringOnCallback={() => setHovering(true)}
                    // hoveringOffCallback={() => setHovering(true)}
                  />
                  <ProfilePopupButton
                    callback={() => logout()}
                    icon={LogOutIcon}
                    text="Log out"
                    // hoveringOnCallback={() => setHovering(true)}
                    // hoveringOffCallback={() => setHovering(true)}
                  />
                </Stack>
              }
              closeCallback={() => setProfilePopupOpen(false)}
              placement="right"
              noPadding
            >
              <Stack onClick={() => setProfilePopupOpen(true)}>
                <ProfileButton
                  initials={(
                    user.name?.split(" ")[0][0] +
                    (user.name?.split(" ")[1][0] || "")
                  ).toUpperCase()}
                />
              </Stack>
            </UrsorPopover>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
};
