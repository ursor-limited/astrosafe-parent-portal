"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { IActionPopupItem } from "../components/ActionPopup";
import PencilIcon from "@/images/icons/Pencil.svg";
import ClippyIcon from "@/images/icons/ClippyIcon.svg";
import StopIcon from "@/images/icons/StopIcon.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import NotificationContext from "../components/NotificationContext";
import BrowserApiController, { IStack } from "../browserApi";
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

export const GRID_SPACING = "20px";

interface IFilterCategory {
  id: string;
  title: string;
  groupId: string;
}

interface IFilterUrl {
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

const FilterCard = (props: IFilter) => (
  <Stack
    height="213px"
    borderRadius="12px"
    bgcolor="#EDEAFF"
    p="16px"
    boxSizing="border-box"
  >
    <Stack spacing="12px">
      <Stack direction="row" spacing="4px">
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
  </Stack>
);

const DUMMY_GROUP_ID = "iuiubifbekjfnlej";

const DUMMY_SERVICES: IFilterUrl[] = [
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

const DUMMY_CATEGORIES: IFilterCategory[] = [
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
];

const DUMMY_BLOCKED_SITES: IFilterUrl[] = [
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

const DUMMY_FILTERS: IFilter[] = [
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
          {DUMMY_FILTERS.map((f) => (
            <FilterCard key={f.id} {...f} />
          ))}
        </DynamicCardGrid>
      </Stack>
    </PageLayout>
  );
}
