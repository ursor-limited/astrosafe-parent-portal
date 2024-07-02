"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";

import PlusIcon from "@/images/icons/PlusIcon.svg";
import PageLayout from "@/app/dashboard/PageLayout";
import {
  DUMMY_ALLOWED_SITES,
  DUMMY_BLOCKED_SITES,
  DUMMY_CATEGORIES,
  DUMMY_FILTERS,
  DUMMY_SERVICES,
  IFilter,
  IFilterCategory,
  IFilterUrl,
} from "../FiltersPageContents";
import { Stack } from "@mui/system";
import FilterPageServicesSection from "./components/ServicesSection";
import FilterPageCategoriesSection from "./components/CategoriesSection";
import FilterPageAllowedSitesSection from "./components/AllowedSitesSection";
import FilterPageBlockedSitesSection from "./components/BlockedSitesSection";
import FilterPageSearchWordsSection from "./components/SearchWordsSection";
import FilterPageDevicesSection from "./components/DevicesSection";

export type DeviceType = "chrome" | "android" | "ios";

export interface IDevice_new {
  id: number;
  name: string;
  backgroundColor: string;
  profileAvatarUrl: string;
  lastOnline: string;
  connected: boolean;
  deviceType: DeviceType;
  favorites: number[];
  requestedSites: IFilterUrl[];
  locked: boolean;
}

export const DUMMY_DEVICES: IDevice_new[] = [
  {
    id: 1,
    name: "Joe's iPad",
    backgroundColor: "cyan",
    profileAvatarUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+627405+(2).png",
    lastOnline: "2024-06-20",
    connected: true,
    deviceType: "ios",
    favorites: [],
    requestedSites: [],
    locked: false,
  },
  {
    id: 2,
    name: "F's N64",
    backgroundColor: "cyan",
    profileAvatarUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+627405+(2).png",
    lastOnline: "2024-06-20",
    connected: true,
    deviceType: "android",
    favorites: [],
    requestedSites: [],
    locked: false,
  },
];

export default function FilterPageContents(props: { filterId: number }) {
  const [filter, setFilter] = useState<IFilter>(DUMMY_FILTERS[0]);
  const [blockedSites, setBlockedSites] =
    useState<IFilterUrl[]>(DUMMY_BLOCKED_SITES);
  const [allowedSites, setAllowedSites] =
    useState<IFilterUrl[]>(DUMMY_ALLOWED_SITES);

  const [categories, setCategories] =
    useState<IFilterCategory[]>(DUMMY_CATEGORIES);
  const [allowedCategories, setAllowedCategories] = useState<
    IFilterUrl["id"][]
  >([]);
  useEffect(() => setAllowedServices(filter.allowedCategories), [filter]);

  const [services, setServices] = useState<IFilterUrl[]>(DUMMY_SERVICES);
  const [allowedServices, setAllowedServices] = useState<IFilterUrl["id"][]>(
    []
  );
  useEffect(() => setAllowedServices(filter.allowedServices), [filter]);

  const [blockedSearchWords, setBlockedSearchWords] = useState<string[]>([]);

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
      scrollable
    >
      <Stack pl="49px" pr="2px" spacing="20px" pb="33px">
        <FilterPageDevicesSection devices={DUMMY_DEVICES} />
        <FilterPageServicesSection
          filter={filter}
          services={services}
          allowedServices={allowedServices}
          flipService={(id) =>
            setAllowedServices(
              allowedServices.includes(id)
                ? allowedServices.filter((sid) => sid !== id)
                : [...allowedServices, id]
            )
          }
        />
        <FilterPageCategoriesSection
          filter={filter}
          categories={categories}
          allowedCategories={allowedCategories}
          flipCategory={(id) =>
            setAllowedCategories(
              allowedCategories.includes(id)
                ? allowedCategories.filter((sid) => sid !== id)
                : [...allowedCategories, id]
            )
          }
        />
        <FilterPageAllowedSitesSection
          allowedSites={allowedSites}
          addSite={(url) => null}
        />
        <FilterPageBlockedSitesSection
          blockedSites={blockedSites}
          addSite={(url) => null}
        />
        <FilterPageSearchWordsSection
          blockedSearchWords={blockedSearchWords}
          addWord={(word) =>
            setBlockedSearchWords([...blockedSearchWords, word])
          }
          removeWord={(word) =>
            setBlockedSearchWords(blockedSearchWords.filter((w) => w !== word))
          }
        />
      </Stack>
    </PageLayout>
  );
}
