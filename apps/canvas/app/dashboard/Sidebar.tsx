"use client";

import * as React from "react";
import { Stack, keyframes } from "@mui/system";
import { useElementSize, useLocalStorage } from "usehooks-ts";
import { PALETTE, Typography } from "ui";
import HomeIcon from "@/images/icons/HomeIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import GearIcon from "@/images/icons/GearIcon.svg";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../components/UserContext";

export const WIDTH = "106px";
const Y_PADDING = "26px";

const ICON_SIZE = "28px";
const SMALL_ICON_SIZE = "22px";

const BUTTON_Y_PADDING = "10px";
const BUTTON_X_PADDING = "23px";

const BUTTON_SELECTED_BACKGROUND = PALETTE.secondary.purple[2];

const SMALL_ICON_HEIGHT_THRESHOLD = 630;
const NO_TEXT_HEIGHT_THRESHOLD = 469;

export const slideIn = keyframes`
from {
  transform: translateX(-1000px);
}
to {
  transform: translateX(40px);
}
`;

export const slideOut = keyframes`
from {
  transform: translateX(40px);
}
to {
  transform: translateX(-1000px);
}
`;

export type SideBarItemId =
  | "home"
  | "classroom"
  | "people"
  | "teachers"
  | "students"
  | "homepages"
  | "contact"
  | "logout"
  | "browser"
  | "account"
  | "search"
  | "tutorials"
  | "filter"
  | "apps"
  | "monitor"
  | "devices"
  | "library"
  | "plugins";

export interface ISidebarItem {
  id?: SideBarItemId;
  tourId?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  noPathFill?: boolean; // unfortunately some svgs have to be colored by stroke instead of path fill
  title: string;
  callback: () => void;
  notificationCount?: number;
}

export interface ISidebarProps {
  selectedItemId: SideBarItemId;
  classroomId?: string;
}

export const getListButtonStyle = (
  selected: boolean,
  disabled?: boolean,
  center?: boolean
) => {
  const backgroundColor = selected ? BUTTON_SELECTED_BACKGROUND : null;
  return {
    fontFamily: "Rubik",
    color: selected ? PALETTE.font.light : PALETTE.font.dark,
    background: backgroundColor,
    borderRadius: "60px",
    px: BUTTON_X_PADDING,
    py: BUTTON_Y_PADDING,
    opacity: disabled ? 0.3 : 1,
    "&:hover": {
      background: selected ? backgroundColor : PALETTE.secondary.grey[2],
    },
    "&& .MuiTouchRipple-child": {
      background: "linear-gradient(90deg, #1D62F6, #F279C5)",
    },
    cursor: "pointer",
    ...(center ? { display: "flex", justifyContent: "center" } : null),
  };
};

const SidebarItem = (props: {
  selected?: boolean;
  title: string;
  callback: () => void;
  children: React.ReactNode;
  small?: boolean;
  noText?: boolean;
  tourId?: string;
  notificationCount?: number;
}) => (
  <Stack
    id={props.tourId}
    width="100%"
    alignItems="center"
    justifyContent="center"
    sx={{
      cursor: "pointer",
      "&:hover": { opacity: 0.6 },
      transition: "0.2s",
      svg: {
        path: {
          fill: props.selected
            ? PALETTE.secondary.purple[2]
            : PALETTE.secondary.grey[5],
        },
        rect: {
          stroke: props.selected
            ? PALETTE.secondary.purple[2]
            : PALETTE.secondary.grey[5],
        },
      },
    }}
    onClick={props.callback}
    position="relative"
  >
    {props.notificationCount ? (
      <Stack
        top="-3px"
        right="26px"
        position="absolute"
        height="20px"
        width="20px"
        justifyContent="center"
        alignItems="center"
        borderRadius="100%"
        bgcolor={PALETTE.system.orange}
      >
        <Typography variant="tiny" bold color="rgb(255,255,255)">
          {props.notificationCount}
        </Typography>
      </Stack>
    ) : null}
    <Stack flex={1} spacing="4px" justifyContent="center" alignItems="center">
      {props.children}
      {!props.noText ? (
        <Typography
          variant={props.small ? "tiny" : "small"}
          bold
          color={
            props.selected
              ? PALETTE.secondary.purple[2]
              : PALETTE.secondary.grey[5]
          }
        >
          {props.title}
        </Typography>
      ) : null}
    </Stack>
  </Stack>
);

export default function Sidebar(props: ISidebarProps) {
  const router = useRouter();
  const userCtx = useUserContext();
  const { logout } = useAuth0();
  const [signedIn, setSignedIn] = useLocalStorage<boolean>("signedIn", false);
  const topItems: ISidebarItem[] = [
    {
      id: "home",
      tourId: "home-button",
      icon: HomeIcon,
      title: "Home",
      callback: () => null, //navigate("/library"),
    },
    {
      id: "browser",
      //tourId: "devices-button",
      icon: GlobeIcon,
      title: "Browser",
      callback: () => router.push("https://app.astrosafe.co"), //navigate("/devices"),
    },
  ];

  const bottomItems: ISidebarItem[] = [
    {
      id: "account",
      icon: GearIcon,
      title: "Account",
      callback: () => router.push("/account"),
    },
  ];

  const getList = (items: ISidebarItem[], small: boolean, noText: boolean) => (
    <Stack spacing={small ? "16px" : "24px"} width="100%">
      {items.map((item, index) => {
        const selected = item.id === props.selectedItemId;
        return (
          <SidebarItem
            key={index}
            title={item.title}
            callback={item.callback}
            selected={selected}
            small={small}
            noText={noText}
            tourId={item.tourId}
            notificationCount={item.notificationCount}
          >
            <item.icon height={small ? SMALL_ICON_SIZE : ICON_SIZE} />
          </SidebarItem>
        );
      })}
    </Stack>
  );

  const [ref, { width, height }] = useElementSize();
  const small = height > 0 && height < SMALL_ICON_HEIGHT_THRESHOLD;
  const noText = height < NO_TEXT_HEIGHT_THRESHOLD;

  return (
    <Stack
      ref={ref}
      height="100%"
      width={WIDTH}
      sx={{ background: "white", fontSize: "10px" }}
      borderRadius="20px"
      py={Y_PADDING}
      justifyContent="space-between"
      id="my-first-step"
    >
      <Stack spacing={small ? "16px" : "24px"} alignItems="center">
        {getList(topItems, small, noText)}
      </Stack>
      {getList(bottomItems, small, noText)}
    </Stack>
  );
}
