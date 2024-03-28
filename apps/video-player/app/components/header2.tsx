"use client";

import { Stack } from "@mui/system";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "ui";
import Logo from "@/images/logo.svg";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import HomeIcon from "@/images/icons/HomeIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import ChevronLeftIcon from "@/images/icons/ChevronLeft.svg";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import ThreeBarsIcon from "@/images/icons/ThreeBarsIcon.svg";
import X from "@/images/icons/X.svg";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import mixpanel from "mixpanel-browser";
import { useUserContext } from "./UserContext";
import UpgradePromptDialog from "./UpgradeDialog";
import { useWindowSize } from "usehooks-ts";
import DynamicContainer from "./DynamicContainer";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileButton from "./ProfileButton";

const UrsorPopover = dynamic(
  () => import("@/app/components/UrsorPopover"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const HEADER_HEIGHT = 86;

export const ASTRO_MAGICAL_GRADIENT =
  "linear-gradient(150deg, #FD9B41, #F279C5, #1D62F6, #0AE799)";

const HeaderButton = (props: {
  text: string;
  url?: string;
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
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
        spacing="3px"
        alignItems="center"
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
        onClick={() => {
          props.url ? router.push(props.url) : setOpen(true);
        }}
      >
        <Typography
          bold
          color={open ? PALETTE.secondary.purple[2] : "rgb(255,255,255)"}
          sx={{
            transition: "0.2s",
          }}
        >
          {props.text}
        </Typography>
        {!props.url ? <ChevronDownIcon width="20px" height="20px" /> : null}
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
  alwaysOpen: boolean;
  title: string;
  links: { text: string; url: string }[];
  spaceBetween: boolean;
  noChevron?: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => setOpen(!!props.alwaysOpen), []);
  return (
    <DynamicContainer duration={800} fullWidth>
      <Stack spacing="12px">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={props.spaceBetween ? "space-between" : undefined}
          spacing="8px"
          onClick={() => !props.alwaysOpen && setOpen(!open)}
          sx={{
            svg: {
              transform: !props.alwaysOpen
                ? `rotate(${open ? 270 : 90}deg)`
                : undefined,
              transition: "0.2s",
            },
          }}
        >
          <Typography variant="small" bold>
            {props.title}
          </Typography>
          {!props.noChevron ? (
            <ChevronRightIcon width="16px" height="16px" />
          ) : null}
        </Stack>
        {open ? (
          <Stack spacing="12px">
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
        ) : null}
      </Stack>
    </DynamicContainer>
  );
};

const ProductsPopoverContents = (props: {
  mobile?: boolean;
  noSignIn?: boolean;
}) => {
  const { loginWithRedirect, user } = useAuth0();
  const router = useRouter();
  return (
    <Stack
      height={props.mobile ? undefined : "292px"}
      width={props.mobile ? undefined : "842px"}
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      direction={props.mobile ? "column" : "row"}
      p="12px"
      spacing="24px"
    >
      <Stack
        bgcolor={PALETTE.secondary.grey[1]}
        width={props.mobile ? undefined : "300px"}
        height={props.mobile ? "268px" : undefined}
        p="12px"
        pb={props.mobile ? "4px" : undefined}
        borderRadius="10px"
        boxSizing="border-box"
        spacing={props.mobile ? "12px" : "20px"}
      >
        <Typography variant="medium" bold>
          Products
        </Typography>
        <Stack flex={1} justifyContent="space-between">
          <ProductsPopoverProductButton
            title="Worksheet generator"
            body="Personalised and printable worksheets made in seconds."
            icon={ChecklistIcon}
            color={PALETTE.secondary.blue[3]}
            url="/tools/math-worksheet-generator"
          />
          <ProductsPopoverProductButton
            title="SafeTube - Safe Videos"
            body="Reduce ads, remove distracting content, and increase focus."
            icon={CirclePlayIcon}
            color="#FC5C5C"
            url="/tools/safetube"
          />
          <ProductsPopoverProductButton
            title="Browser"
            body="Keep students safe with a browser built for the classroom."
            icon={GlobeIcon}
            color={PALETTE.secondary.purple[2]}
            url="https://app.astrosafe.co"
          />
        </Stack>
      </Stack>
      <Stack flex={1} p="12px" spacing="20px">
        <Stack onClick={() => router.push("/seal-of-approval")}>
          <Typography variant="medium" bold>
            Safeseal
          </Typography>
        </Stack>
        <Typography variant="medium" bold>
          Tools
        </Typography>
        <Stack
          direction={props.mobile ? "column" : "row"}
          spacing={props.mobile ? "12px" : "56px"}
        >
          <ProductsPopoverColumn
            alwaysOpen={!props.mobile}
            title="Times tables"
            links={[
              {
                text: "5 times tables",
                url: "/tools/multiplication-chart/5-times-table-worksheet",
              },
              {
                text: "6 times tables",
                url: "/tools/multiplication-chart/6-times-table-worksheet",
              },
              {
                text: "7 times tables",
                url: "/tools/multiplication-chart/7-times-table-worksheet",
              },
              {
                text: "8 times tables",
                url: "/tools/multiplication-chart/8-times-table-worksheet",
              },
              {
                text: "9 times tables",
                url: "/tools/multiplication-chart/9-times-table-worksheet",
              },
              {
                text: "10 times tables",
                url: "/tools/multiplication-chart/10-times-table-worksheet",
              },
            ]}
            spaceBetween={!!props.mobile}
            noChevron={!props.mobile}
          />
          <ProductsPopoverColumn
            alwaysOpen={!props.mobile}
            title="All tools"
            links={[
              {
                text: "Chore charts",
                url: "https://www.astrosafe.co/tools/chore-charts-for-kids",
              },
              {
                text: "Websites for kids",
                url: "https://www.astrosafe.co/tools/websites-for-kids",
              },
              {
                text: "Meditation for kids",
                url: "https://www.astrosafe.co/tools/15-minutes-meditation-for-family-time-and-kids",
              },
              {
                text: "Safe search engine",
                url: "https://www.astrosafe.co/tools/kids-safe-search-engine",
              },
            ]}
            spaceBetween={!!props.mobile}
            noChevron={!props.mobile}
          />
          <ProductsPopoverColumn
            alwaysOpen={!props.mobile}
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
            spaceBetween={!!props.mobile}
            noChevron={!props.mobile}
          />
        </Stack>
      </Stack>
      <Stack spacing="8px">
        {props.mobile ? (
          <UrsorButton
            width="100%"
            variant="secondary"
            onClick={() => (window.location.href = "mailto:hello@astrosafe.co")}
            fontSize="16px"
          >
            Contact sales
          </UrsorButton>
        ) : null}
        {!user && props.mobile && !props.noSignIn ? (
          <UrsorButton width="100%" onClick={loginWithRedirect}>
            Sign in
          </UrsorButton>
        ) : null}
      </Stack>
    </Stack>
  );
};

const MobileMenuButton = (props: { noSignIn?: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { width } = useWindowSize();
  return (
    <UrsorPopover
      open={open}
      closeCallback={() => setOpen(false)}
      placement="right"
      width={`${width - 40}px`}
      content={<ProductsPopoverContents mobile noSignIn={props.noSignIn} />}
      noPadding
    >
      <Stack
        height="42px"
        width="42px"
        borderRadius="100%"
        bgcolor="rgb(255,255,255)"
        onClick={() => setOpen(true)}
        alignItems="center"
        justifyContent="center"
      >
        {open ? (
          <X width="20px" height="20px" />
        ) : (
          <ThreeBarsIcon width="20px" height="20px" />
        )}
      </Stack>
    </UrsorPopover>
  );
};

export const Header = (props: {
  showUpgradeButtons?: boolean;
  noSignIn?: boolean;
  createMoreVideosButton?: boolean;
  signinCallback?: () => void;
  mobile?: boolean;
  createNewButton?: boolean;
  hidePopupDashboardButton?: boolean;
}) => {
  const { user, loginWithPopup, loginWithRedirect, logout } = useAuth0();
  const router = useRouter();
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState<boolean>(false);
  const safeTubeUser = useUserContext();

  return (
    <>
      <Stack alignItems="center" width="100%">
        <Stack
          direction="row"
          height={`${60}px`}
          minHeight={`${60}px`}
          alignItems="center"
          justifyContent="space-between"
          px="20px"
          boxSizing="border-box"
          maxWidth={props.mobile ? "100%" : "1300px"}
          width="100%"
        >
          <Stack direction="row">
            <Stack
              width="fit-content"
              pr="51px"
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
            {!props.mobile ? (
              <Stack direction="row" spacing="20px">
                <HeaderButton text="Products">
                  <ProductsPopoverContents />
                </HeaderButton>
                <HeaderButton text="Safeseal" url="/seal-of-approval" />
              </Stack>
            ) : null}
          </Stack>
          {/* {props.showSigninButton ? (
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
        ) : null} */}

          {props.mobile ? (
            <Stack direction="row" spacing="8px">
              {user ? <ProfileButton /> : null}
              <MobileMenuButton noSignIn={props.noSignIn} />
            </Stack>
          ) : (
            <Stack spacing={"14px"} direction="row">
              {!user ? (
                <UrsorButton
                  backgroundColor="transparent"
                  hoverOpacity={0.7}
                  onClick={() =>
                    (window.location.href = "mailto:hello@astrosafe.co")
                  }
                  fontSize="16px"
                  paddingX="8px"
                >
                  Contact sales
                </UrsorButton>
              ) : (
                <UrsorButton
                  dark
                  hoverOpacity={0.7}
                  backgroundColor="transparent"
                  borderColor="rgb(255,255,255)"
                  fontColor="rgb(255,255,255)"
                  onClick={() => router.push("/dashboard")}
                  //onClick={() => ApiController.doIt()}
                  endIcon={HomeIcon}
                >
                  Go to Dashboard
                </UrsorButton>
              )}
              {user ? (
                <Stack direction="row" spacing="12px">
                  <ProfileButton />
                </Stack>
              ) : !props.noSignIn ? (
                <UrsorButton
                  dark
                  variant="tertiary"
                  onClick={() => {
                    loginWithPopup();
                    //mixpanel.track("clicked header sign up");
                  }}
                  endIcon={PersonIcon}
                  fontSize="16px"
                  height="40px"
                  paddingX="20px"
                >
                  Log in
                </UrsorButton>
              ) : null}
              {/* <UrsorButton
              dark
              variant="tertiary"
              onClick={loginWithPopup}
              endIcon={PersonIcon}
            >
              Login
            </UrsorButton> */}
            </Stack>
          )}
          {/* )} */}
          {/* <UpgradeDialog
        open={upgradeDialogOpen}
        closeCallback={() => setUpgradeDialogOpen(false)}
      /> */}
        </Stack>
        <UpgradePromptDialog
          open={upgradeDialogOpen}
          closeCallback={() => setUpgradeDialogOpen(false)}
        />
      </Stack>
    </>
  );
};
