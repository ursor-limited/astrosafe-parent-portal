"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import LockIcon from "@/images/icons/LockIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import { Stack } from "@mui/system";
import UrsorFadeIn from "../../components/UrsorFadeIn";
import _ from "lodash";
import DynamicCardGrid from "../../components/DynamicCardGrid";
import { useRouter } from "next/navigation";
import ProfileImageRow from "../[id]/components/ProfileImageRow";
import PageLayout from "../../components/PageLayout";
import FilterCard from "../[id]/components/FilterCard";
import { IFilter, IFilterCategory, IFilterUrl } from "./common";

export const GRID_SPACING = "20px";

export const DUMMY_GROUP_ID = 1;

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

export default function AllFiltersPageDesktopBody(props: {
  filters: IFilter[];
  createFilter: () => void;
}) {
  const router = useRouter();
  return (
    <PageLayout
      title="My Filters"
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="filters"
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
