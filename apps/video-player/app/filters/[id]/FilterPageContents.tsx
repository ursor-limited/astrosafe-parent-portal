"use client";

import React, { useEffect, useState } from "react";

import PlusIcon from "@/images/icons/PlusIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import DuplicateIcon from "@/images/icons/DuplicateIcon.svg";
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
import FilterExceptionDialog from "./components/FilterExceptionDialog";
import { PALETTE } from "ui";
import PageLayout from "@/app/components/PageLayout";

export type DeviceType = "chrome" | "android" | "ios";

export interface IDevice {
  id: number;
  name: string;
  backgroundColor: string;
  profileAvatarUrl: string;
  lastOnline: string;
  connected: boolean;
  deviceType: DeviceType;
  favorites: number[];
  requestedSites: IFilterUrl[];
  createdAt: string;
}

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

  const [exceptionDialogOpen, setExceptionDialogOpen] =
    useState<boolean>(false);

  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);

  const [devices, setDevices] = useState<IDevice[]>([]);

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
      actions={[
        {
          text: "Edit name",
          kallback: () => setRenameDialogOpen(true),
          icon: PencilIcon,
        },
        // {
        //   text: "Duplicate",
        //   kallback: () => null,
        //   icon: DuplicateIcon,
        // },
        {
          text: "Delete",
          kallback: () => null,
          icon: TrashcanIcon,
          color: PALETTE.system.red,
        },
      ]}
    >
      <Stack pl="49px" pr="2px" spacing="20px" pb="33px">
        <FilterPageDevicesSection devices={devices} />
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
          addSite={(url) => setExceptionDialogOpen(true)}
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
        <FilterExceptionDialog
          open={exceptionDialogOpen}
          onClose={() => setExceptionDialogOpen(false)}
          onSubmit={() => null}
        />
      </Stack>
    </PageLayout>
  );
}
