"use client";

import { Stack } from "@mui/system";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "ui";
import Logo from "@/images/logo.svg";
import Kitemark from "@/images/coloredKitemark.svg";
import LogOutIcon from "@/images/icons/LogOutIcon.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import ChevronLeftIcon from "@/images/icons/ChevronLeft.svg";
import CreditCardIcon from "@/images/icons/CreditCard.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import UpgradeDialog from "./UpgradeDialog";
import ApiController from "../api";
import UrsorFadeIn from "./UrsorFadeIn";
import dynamic from "next/dynamic";
import mixpanel from "mixpanel-browser";
import { FREE_VIDEO_LIMIT } from "../dashboard/DashboardPageContents";
import { useUserContext } from "../UserContext";

const UrsorPopover = dynamic(
  () => import("@/app/components/UrsorPopover"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const HEADER_HEIGHT = 86;

export const ASTRO_MAGICAL_GRADIENT =
  "linear-gradient(150deg, #FD9B41, #F279C5, #1D62F6, #0AE799)";

export const STRIPE_CUSTOMER_PORTAL_URL =
  "https://billing.stripe.com/p/login/test_8wMfZYfAK4M2fJe4gg";

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

export const Header = (props: {
  showUpgradeButtons?: boolean;
  showSigninButton?: boolean;
  createMoreVideosButton?: boolean;
  signinCallback?: () => void;
  mobile?: boolean;
  createNewButton?: boolean;
  hidePopupDashboardButton?: boolean;
}) => {
  const { user, loginWithPopup, loginWithRedirect, logout } = useAuth0();
  const [profilePopupOpen, setProfilePopupOpen] = useState<boolean>(false);
  const router = useRouter();
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState<boolean>(false);
  const [nVideos, setNVideos] = useState<number | undefined>(undefined);
  useEffect(() => {
    user?.email &&
      ApiController.getNumberOfUserVideos(user.email).then((n) =>
        setNVideos(n)
      );
  }, [user?.email]);
  const safeTubeUser = useUserContext().user;
  return (
    <Stack
      direction="row"
      width="100%"
      height={`${86}px`}
      minHeight={`${86}px`}
      alignItems="center"
      justifyContent="space-between"
      px="28px"
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
      {props.showSigninButton ? (
        <UrsorButton
          dark
          variant="tertiary"
          onClick={() => {
            props.mobile ? loginWithRedirect() : loginWithPopup();
            mixpanel.track("clicked header sign up");
          }}
          endIcon={PersonIcon}
        >
          Sign in
        </UrsorButton>
      ) : null}
      {user ? (
        <UrsorFadeIn duration={800}>
          <Stack direction="row" spacing="12px">
            {!props.mobile ? (
              <Stack>
                {props.showUpgradeButtons ? (
                  <UrsorButton
                    dark
                    variant="secondary"
                    endIcon={Kitemark}
                    iconSize={13}
                    iconSpin
                    useNaturalIconColor
                    onClick={() => setUpgradeDialogOpen(true)}
                  >
                    Unlock more Videos
                  </UrsorButton>
                ) : null}
                {props.createMoreVideosButton ? (
                  <UrsorButton
                    dark
                    variant="tertiary"
                    onClick={() => router.push("/dashboard")}
                    endIcon={Kitemark}
                    iconSize={13}
                    iconSpin
                    iconColor="rgba(255,255,255,0.7)"
                  >
                    Create more Videos
                  </UrsorButton>
                ) : null}
              </Stack>
            ) : null}
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
                  <Stack minWidth="250px">
                    <Stack
                      height="40px"
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
                    {nVideos && !safeTubeUser?.subscribed ? (
                      <Stack
                        height="40px"
                        direction="row"
                        spacing="6px"
                        px="20px"
                        width="100%"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack direction="row" spacing="4px">
                          <Typography
                            sx={{
                              fontWeight: 500,
                            }}
                            bold
                            variant="small"
                            color={PALETTE.secondary.grey[5]}
                          >{`${Math.max(
                            0,
                            FREE_VIDEO_LIMIT - nVideos
                          )}/${FREE_VIDEO_LIMIT}`}</Typography>
                          <Typography
                            bold
                            variant="small"
                            color={PALETTE.secondary.grey[5]}
                          >
                            Videos left
                          </Typography>
                        </Stack>
                        <UrsorButton
                          dark
                          variant="tertiary"
                          size="small"
                          onClick={() => setUpgradeDialogOpen(true)}
                        >
                          Upgrade
                        </UrsorButton>
                      </Stack>
                    ) : null}
                    {!props.hidePopupDashboardButton ? (
                      <ProfilePopupButton
                        callback={() => router.push("/dashboard")}
                        icon={ListUnorderedIcon}
                        text="Dashboard"
                      />
                    ) : null}
                    {nVideos && safeTubeUser?.subscribed ? (
                      <a
                        target="_blank"
                        href={STRIPE_CUSTOMER_PORTAL_URL}
                        style={{
                          textDecoration: "none",
                        }}
                        rel="noreferrer"
                      >
                        <ProfilePopupButton
                          callback={() => setProfilePopupOpen(false)}
                          icon={CreditCardIcon}
                          text="Manage plan"
                        />
                      </a>
                    ) : null}
                    <ProfilePopupButton
                      callback={() => {
                        logout();
                        mixpanel.reset();
                      }}
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
        </UrsorFadeIn>
      ) : props.createNewButton ? (
        <UrsorButton
          dark
          variant="tertiary"
          startIcon={ChevronLeftIcon}
          onClick={() => router.push("/video")}
        >
          Create new
        </UrsorButton>
      ) : null}
      <UpgradeDialog
        open={upgradeDialogOpen}
        closeCallback={() => setUpgradeDialogOpen(false)}
      />
    </Stack>
  );
};
