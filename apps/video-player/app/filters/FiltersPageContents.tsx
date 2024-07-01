"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { IActionPopupItem } from "../components/ActionPopup";
import PencilIcon from "@/images/icons/Pencil.svg";
import PeopleIcon from "@/images/icons/PeopleIcon.svg";
import StopIcon from "@/images/icons/StopIcon.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import LockIcon from "@/images/icons/LockIcon.svg";
import NotificationContext from "../components/NotificationContext";
import BrowserApiController, { IDevice, IStack } from "../browserApi";
import { PALETTE, Typography, UrsorButton } from "ui";
import { Stack } from "@mui/system";
import UrsorActionButton from "../components/UrsorActionButton";
import {
  ITeacher,
  useBrowserUserContext,
} from "../components/BrowserUserContext";
import UrsorFadeIn from "../components/UrsorFadeIn";
import ChannelDialog from "../safety/ChannelDialog";
import PageLayout, {
  SIDEBAR_X_MARGIN,
  SIDEBAR_Y_MARGIN,
} from "../dashboard/PageLayout";
import { IBrowserLink } from "../safety/DomainLinksDialog";
import _ from "lodash";
import DynamicCardGrid from "../components/DynamicCardGrid";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const GRID_SPACING = "20px";

export interface IFilterCategory {
  id: string;
  title: string;
  groupId: string;
}

export interface IFilterUrl {
  id: string;
  url: string;
  title: string;
  imageUrl: string;
  groupId: string;
}

export interface IFilter {
  id: string;
  title: string;
  allowedServices: IFilterUrl["id"][];
  allowedCategories: IFilterCategory["id"][];
  allowedSiteExceptions: IFilterUrl["id"][];
  blockedSiteExceptions: IFilterUrl["id"][];
  blockedWords: string[];
  groupId: string;
}

const FilterCard = (props: IFilter & { deviceImageUrls: string[] }) => (
  <Stack
    height="213px"
    borderRadius="12px"
    bgcolor="#EDEAFF"
    p="16px"
    boxSizing="border-box"
    justifyContent="space-between"
    position="relative"
    overflow="hidden"
  >
    <Stack spacing="12px">
      <Stack direction="row" spacing="4px" alignItems="center">
        <Typography variant="h5">{props.title}</Typography>
        <VerifiedIcon height="20px" width="20px" />
      </Stack>
      <Typography variant="small" bold color={PALETTE.secondary.grey[4]}>
        <Stack
          spacing="4px"
          sx={{ svg: { path: { fill: PALETTE.secondary.grey[4] } } }}
        >
          <Stack spacing="4px" direction="row" alignItems="center">
            <ListUnorderedIcon width="12px" height="12px" />
            <div>{`${props.allowedSiteExceptions.length} ${
              props.allowedSiteExceptions.length === 1
                ? "Category"
                : "Categories"
            } allowed`}</div>
          </Stack>
          <Stack spacing="4px" direction="row" alignItems="center">
            <StopIcon width="12px" height="12px" />
            <div>{`${props.blockedWords.length} blocked ${
              props.blockedWords.length === 1 ? "word" : "words"
            }`}</div>
          </Stack>
        </Stack>
      </Typography>
    </Stack>
    <Stack
      position="absolute"
      right={0}
      top="75px"
      sx={{
        svg: {
          path: {
            fill: "rgba(0,0,0,0.06)",
          },
        },
      }}
    >
      <LockIcon height="171px" width="171px" />
    </Stack>
    <Stack direction="row" spacing="4px">
      <Stack direction="row" spacing="36px">
        {props.deviceImageUrls.slice(0, 3).map((url, i) => (
          <Stack key={i} width={0} position="relative" overflow="visible">
            <Stack position="absolute" bottom={0} left={0}>
              <Stack
                borderRadius="100%"
                overflow="hidden"
                boxShadow="0 0 16px rgba(0,0,0,0.1)"
              >
                <Image src={url} width={42} height={42} alt="profile image" />
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
      {props.deviceImageUrls.length > 3 ? (
        <Stack
          direction="row"
          spacing="4px"
          alignItems="center"
          sx={{
            transform: "translate(48px, -10px)",
            svg: {
              path: {
                fill: PALETTE.secondary.grey[4],
              },
            },
          }}
        >
          <Typography
            variant="small"
            bold
            color={PALETTE.secondary.grey[4]}
          >{`+${props.deviceImageUrls.length - 3}`}</Typography>
          <PeopleIcon height="12px" width="12px" />
        </Stack>
      ) : null}
    </Stack>
  </Stack>
);

const DUMMY_GROUP_ID = "iuiubifbekjfnlej";

export const DUMMY_SERVICES: IFilterUrl[] = [
  {
    id: "4icuheiuf",
    title: "Nintendo",
    url: "nintendo.com",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321192.png",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: "defefe3e",
    title: "New York Times",
    url: "nytimes.com",
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug.png",
    groupId: DUMMY_GROUP_ID,
  },
];

export const DUMMY_CATEGORIES: IFilterCategory[] = [
  {
    id: "ioiojiolkm",
    title: "dog",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: "fefef",
    title: "cat",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: "cococooclcclcl",
    title: "bunny",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: "ddddwdw",
    title: "parrot",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: "danger",
    title: "parrot",
    groupId: DUMMY_GROUP_ID,
  },
];

export const DUMMY_BLOCKED_SITES: IFilterUrl[] = [
  {
    id: "lolololololoklo8787878787",
    title: "FINH",
    url: "finf.cc",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321192.png",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: "doddodjo",
    title: "Pornhub",
    url: "pornhub.com",
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug.png",
    groupId: DUMMY_GROUP_ID,
  },
];

export const DUMMY_FILTERS: IFilter[] = [
  {
    id: "boo",
    title: "Hey guys",
    allowedServices: ["4icuheiuf"],
    allowedCategories: ["ioiojiolkm", "cococooclcclcl"],
    blockedSiteExceptions: ["lolololololoklo8787878787", "doddodjo"],
    allowedSiteExceptions: [],
    blockedWords: [""],
    groupId: DUMMY_GROUP_ID,
  },
];

export default function FiltersPage() {
  // const [fl, setChannels] = useState<IChannel[] | undefined>(undefined);
  // const loadChannels = () =>
  //   BrowserApiController.getChannelsInSchool(userDetails?.schoolId ?? "")
  //     .then((c) => setChannels(c))
  //     .catch((error) => notificationCtx.error(error.message));
  // useEffect(() => {
  //   userDetails?.schoolId && loadChannels();
  // }, [userDetails?.schoolId]);

  const [filters, setFilters] = useState<IFilter[]>(DUMMY_FILTERS);

  const router = useRouter();

  return (
    <PageLayout
      title="My Filters"
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="channels"
      button={{
        text: "Add a Filter",
        callback: () => null,
        icon: PlusIcon,
      }}
      maxWidth={834}
    >
      <Stack px="50px">
        <DynamicCardGrid cardWidth="350px" rowGap="20px" columnGap="20px">
          {DUMMY_FILTERS.map((f, i) => (
            <Stack
              key={f.id}
              sx={{
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { opacity: 0.6 },
              }}
              onClick={() => router.push(`/filters/${f.id}`)}
            >
              <UrsorFadeIn duration={800} delay={i * 150}>
                <FilterCard
                  {...f}
                  deviceImageUrls={[
                    "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
                    "https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp",
                    "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
                    "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
                    "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
                  ]}
                />
              </UrsorFadeIn>
            </Stack>
          ))}
        </DynamicCardGrid>
      </Stack>
    </PageLayout>
  );
}
