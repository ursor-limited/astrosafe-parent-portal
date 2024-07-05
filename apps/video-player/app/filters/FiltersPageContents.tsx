"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import PeopleIcon from "@/images/icons/PeopleIcon.svg";
import StopIcon from "@/images/icons/StopIcon.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import LockIcon from "@/images/icons/LockIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import { Stack } from "@mui/system";
import UrsorFadeIn from "../components/UrsorFadeIn";
import PageLayout from "../dashboard/PageLayout";
import { IBrowserLink } from "../safety/DomainLinksDialog";
import _ from "lodash";
import DynamicCardGrid from "../components/DynamicCardGrid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileImageRow from "./ProfileImageRow";

export const GRID_SPACING = "20px";

export interface IFilterCategory {
  id: number;
  title: string;
  groupId: number;
}

export interface IFilterUrl {
  id: number;
  url: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  groupId: number;
}

export interface IFilter {
  id: number;
  title: string;
  allowedServices: IFilterUrl["id"][];
  allowedCategories: IFilterCategory["id"][];
  allowedSiteExceptions: IFilterUrl["id"][];
  blockedSiteExceptions: IFilterUrl["id"][];
  blockedWords: string[];
  groupId: number;
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
    <ProfileImageRow imageUrls={props.deviceImageUrls} />
  </Stack>
);

export const DUMMY_GROUP_ID = 43;

export const DUMMY_SERVICES: IFilterUrl[] = [
  {
    id: 1,
    title: "Nintendo",
    url: "nintendo.com",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321192.png",
    groupId: DUMMY_GROUP_ID,
    createdAt: "2024-05-06",
  },
  {
    id: 2,
    title: "New York Times",
    url: "nytimes.com",
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug.png",
    groupId: DUMMY_GROUP_ID,
    createdAt: "2024-05-06",
  },
];

export const DUMMY_CATEGORIES: IFilterCategory[] = [
  {
    id: 1,
    title: "dog",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 2,
    title: "cat",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 3,
    title: "bunny",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 4,
    title: "parrot",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 5,
    title: "budgie",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 6,
    title: "porn",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 7,
    title: "weapons",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 8,
    title: "xxx",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 9,
    title: "meth",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 10,
    title: "cocaine",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 11,
    title: "weed",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 12,
    title: "sex",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 13,
    title: "mating",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 14,
    title: "hardcore",
    groupId: DUMMY_GROUP_ID,
  },
  {
    id: 15,
    title: "music",
    groupId: DUMMY_GROUP_ID,
  },
];

export const DUMMY_ALLOWED_SITES: IFilterUrl[] = [
  {
    id: 1,
    title: "Pornhub",
    url: "pornhub.com",
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug.png",
    groupId: DUMMY_GROUP_ID,
    createdAt: "2024-05-06",
  },
];

export const DUMMY_BLOCKED_SITES: IFilterUrl[] = [
  {
    id: 1,
    title: "FINH",
    url: "finf.cc",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321192.png",
    groupId: DUMMY_GROUP_ID,
    createdAt: "2024-05-06",
  },
  {
    id: 2,
    title: "Pokemon",
    url: "pokemon.com",
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/moonbug.png",
    groupId: DUMMY_GROUP_ID,
    createdAt: "2024-05-06",
  },
];

export const DUMMY_FILTERS: IFilter[] = [
  {
    id: 1,
    title: "Hey guys",
    allowedServices: [1],
    allowedCategories: [1, 2],
    blockedSiteExceptions: [1, 2],
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
