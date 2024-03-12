"use client";

import { Stack } from "@mui/system";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "ui";
import Logo from "@/images/logo.svg";
import Kitemark from "@/images/coloredKitemark.svg";
import LogOutIcon from "@/images/icons/LogOutIcon.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import CreditCardIcon from "@/images/icons/CreditCard.svg";
import React, { useEffect, useState } from "react";
//import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import UpgradeDialog from "./UpgradeDialog";
import ApiController from "../api";
import UrsorFadeIn from "./UrsorFadeIn";
import dynamic from "next/dynamic";
import mixpanel from "mixpanel-browser";
import { useUserContext } from "./UserContext";
import UpgradePromptDialog from "./SignupPromptDialog";

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

const HeaderButton = (props: { text: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={props.children}
      closeCallback={() => setOpen(false)}
      placement="left"
      noPadding
      margin="26px"
    >
      <Stack
        direction="row"
        spacing="8px"
        alignItems="center"
        px="23px"
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          svg: {
            transform: `rotate(${open ? 180 : 0}deg)`,
            transition: "0.2s",
            path: {
              fill: open ? PALETTE.secondary.purple[2] : "rgb(255,255,255)",
            },
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Typography
          bold
          variant="medium"
          color={open ? PALETTE.secondary.purple[2] : "rgb(255,255,255)"}
          sx={{
            transition: "0.2s",
          }}
        >
          {props.text}
        </Typography>
        <ChevronDownIcon width="20px" height="20px" />
      </Stack>
    </UrsorPopover>
  );
};

const ProductsPopoverProductButton = (props: {
  title: string;
  body: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  url: string;
}) => {
  const router = useRouter();
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      direction="row"
      height="62px"
      alignItems="center"
      spacing="10px"
      onClick={() => router.push(props.url)}
      sx={{
        cursor: "pointer",
        transition: "0.2s",
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      bgcolor={hovering ? "rgb(255,255,255)" : undefined}
      borderRadius="10px"
      boxShadow={hovering ? "0 0 18px rgba(0,0,0,0.03)" : undefined}
    >
      <Stack
        width="46px"
        height="46px"
        bgcolor={props.color}
        borderRadius="8px"
        sx={{
          svg: {
            path: {
              fill: "rgb(255,255,255)",
            },
          },
        }}
        justifyContent="center"
        alignItems="center"
      >
        <props.icon width="24px" height="24px" />
      </Stack>
      <Stack flex={1} justifyContent="space-between">
        <Typography
          variant="small"
          bold
          color={hovering ? props.color : undefined}
        >
          {props.title}
        </Typography>
        <Typography variant="tiny" color={hovering ? props.color : undefined}>
          {props.body}
        </Typography>
      </Stack>
    </Stack>
  );
};

const ProductsPopoverColumn = (props: {
  title: string;
  links: { text: string; url: string }[];
}) => (
  <Stack spacing="12px">
    <Stack direction="row" alignItems="center" spacing="8px">
      <Typography variant="small" bold>
        {props.title}
      </Typography>
      <ChevronRightIcon width="16px" height="16px" />
    </Stack>
    {props.links.map((link, i) => (
      <Link
        key={i}
        href={link.url}
        target="_blank"
        style={{
          textDecoration: "none",
          color: "unset",
        }}
        rel="noreferrer"
      >
        <Stack
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
          }}
        >
          <Typography variant="small">{link.text}</Typography>
        </Stack>
      </Link>
    ))}
  </Stack>
);

export const Header = (props: {
  showUpgradeButtons?: boolean;
  showSigninButton?: boolean;
  createMoreVideosButton?: boolean;
  signinCallback?: () => void;
  mobile?: boolean;
  createNewButton?: boolean;
  hidePopupDashboardButton?: boolean;
}) => {
  // const { user, loginWithPopup, loginWithRedirect, logout } = useAuth0();
  const [profilePopupOpen, setProfilePopupOpen] = useState<boolean>(false);
  const router = useRouter();
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState<boolean>(false);
  const [nVideos, setNVideos] = useState<number | undefined>(undefined);
  const safeTubeUser = useUserContext().user;
  return (
    <Stack
      direction="row"
      width="100%"
      height={`${86}px`}
      minHeight={`${86}px`}
      alignItems="center"
      justifyContent="space-between"
      px="67px"
      boxSizing="border-box"
    >
      <Stack direction="row">
        <Stack
          width="fit-content"
          pr="54px"
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
            transition: "0.2s",
          }}
        >
          <Link href="https://astrosafe.co/">
            <Logo width={65} />
          </Link>
        </Stack>
        <HeaderButton text="Products">
          <Stack
            height="292px"
            width="842px"
            bgcolor="rgb(255,255,255)"
            borderRadius="12px"
            direction="row"
            p="12px"
            spacing="24px"
          >
            <Stack
              bgcolor={PALETTE.secondary.grey[1]}
              width="300px"
              p="12px"
              borderRadius="10px"
              spacing="20px"
            >
              <Typography variant="medium" bold>
                Products
              </Typography>
              <Stack flex={1} justifyContent="space-between">
                <ProductsPopoverProductButton
                  title="Worksheet generator"
                  body="Create videos with a single click. Add captions, remove background
        noise and more"
                  icon={ChecklistIcon}
                  color={PALETTE.secondary.blue[3]}
                  url="/landing/8-times-table-worksheet"
                />
                <ProductsPopoverProductButton
                  title="SafeTube - Safe Videos"
                  body="Unlike other tubes, this one is totally safe."
                  icon={CirclePlayIcon}
                  color="#FC5C5C"
                  url="https://astrosafe.co/video"
                />
                <ProductsPopoverProductButton
                  title="Browser"
                  body="Bro, it's a browser."
                  icon={GlobeIcon}
                  color={PALETTE.secondary.purple[2]}
                  url="https://app.astrosafe.co"
                />
              </Stack>
            </Stack>
            <Stack flex={1} p="12px" spacing="20px">
              <Typography variant="medium" bold>
                Tools
              </Typography>
              <Stack direction="row" spacing="56px">
                <ProductsPopoverColumn
                  title="Times tables"
                  links={[
                    {
                      text: "5 times tables",
                      url: "/landing/5-times-table-worksheet",
                    },
                    {
                      text: "6 times tables",
                      url: "/landing/6-times-table-worksheet",
                    },
                    {
                      text: "7 times tables",
                      url: "/landing/7-times-table-worksheet",
                    },
                    {
                      text: "8 times tables",
                      url: "/landing/8-times-table-worksheet",
                    },
                    {
                      text: "9 times tables",
                      url: "/landing/9-times-table-worksheet",
                    },
                    {
                      text: "10 times tables",
                      url: "/landing/10-times-table-worksheet",
                    },
                  ]}
                />
                <ProductsPopoverColumn
                  title="All tools"
                  links={[
                    {
                      text: "Chore charts",
                      url: "https://www.nintendo.com",
                    },
                    {
                      text: "Websites for kids",
                      url: "https://www.zelda.com",
                    },
                    {
                      text: "Meditation for kids",
                      url: "https://proxy.astrosafe.co/15-minutes-meditation-for-family-time-and-kids",
                    },
                    {
                      text: "Safe search engine",
                      url: "https://www.metroid.com",
                    },
                  ]}
                />
                <ProductsPopoverColumn
                  title="More"
                  links={[
                    {
                      text: "About",
                      url: "https://www.astrosafe.co/about",
                    },
                    {
                      text: "FAQs",
                      url: "https://www.astrosafe.co/faqs",
                    },
                    {
                      text: "Blogs",
                      url: "https://www.astrosafe.co/blog",
                    },
                  ]}
                />
              </Stack>
            </Stack>
          </Stack>
        </HeaderButton>
      </Stack>
      {props.showSigninButton ? (
        <UrsorButton
          dark
          variant="tertiary"
          onClick={() => {
            //props.mobile ? loginWithRedirect() : loginWithPopup();
            mixpanel.track("clicked header sign up");
          }}
          endIcon={PersonIcon}
        >
          Sign in
        </UrsorButton>
      ) : null}
      {/* {user ? (
        <UrsorFadeIn duration={800}>
          <Stack direction="row" spacing="12px">
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
      ) : ( */}
      <Stack spacing="8px" direction="row">
        <UrsorButton
          backgroundColor="transparent"
          hoverOpacity={0.7}
          onClick={() => (window.location.href = "mailto:hello@astrosafe.co")}
        >
          Contact sales
        </UrsorButton>
        {/* <UrsorButton
          dark
          variant="tertiary"
          onClick={loginWithPopup}
          endIcon={PersonIcon}
        >
          Login
        </UrsorButton> */}
      </Stack>
      {/* )} */}
      {/* <UpgradeDialog
        open={upgradeDialogOpen}
        closeCallback={() => setUpgradeDialogOpen(false)}
      /> */}
      <UpgradePromptDialog
        open={upgradeDialogOpen}
        closeCallback={() => setUpgradeDialogOpen(false)}
      />
    </Stack>
  );
};
