"use client";

import { Stack } from "@mui/system";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "ui";
import Logo from "@/images/logo.svg";
import Kitemark from "@/images/coloredKitemark.svg";
import LogOutIcon from "@/images/icons/LogOutIcon.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UrsorPopover from "./UrsorPopover";
import { useRouter } from "next/navigation";

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

//export const Header = (props: { collapsed: boolean }) => {
export const Header = (props: {
  showUpgradeButton?: boolean;
  mobile?: boolean;
}) => {
  const { user, loginWithPopup, loginWithRedirect, logout } = useAuth0();
  const [profilePopupOpen, setProfilePopupOpen] = useState<boolean>(false);
  const router = useRouter();
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
            <Logo width={80} />
          </Stack>
        </Link>
      </Stack>
      {/* <Stack direction="row" spacing="12px">
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
        {!props.noDiscover ? (
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
        ) : null}
      </Stack> */}
      {user ? (
        <Stack direction="row" spacing="12px">
          {props.showUpgradeButton ? (
            <UrsorButton
              dark
              variant="secondary"
              endIcon={Kitemark}
              iconSize={13}
              iconSpin
              useNaturalIconColor
              //or={PALETTE.secondary.pink[2]}
            >
              Unlock more Videos
            </UrsorButton>
          ) : (
            <UrsorButton
              dark
              variant="tertiary"
              onClick={() => router.push("/dashboard")}
              endIcon={Kitemark}
              iconSize={13}
              iconSpin
              iconColor="rgba(255,255,255,0.7)"
            >
              Go to Dashboard
            </UrsorButton>
          )}
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
                  />
                  <ProfilePopupButton
                    callback={() => logout()}
                    icon={LogOutIcon}
                    text="Log out"
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
        </Stack>
      ) : null}
    </Stack>
  );
};
