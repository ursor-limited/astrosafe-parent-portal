"use client";

import React, { useCallback, useEffect, useState } from "react";

import PlusIcon from "@/images/icons/PlusIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import {
  DUMMY_ALLOWED_SITES,
  DUMMY_BLOCKED_SITES,
  DUMMY_CATEGORIES,
  DUMMY_FILTERS,
  DUMMY_SERVICES,
} from "../../contents/body-desktop";
import FilterExceptionDialog from "../components/FilterExceptionDialog";
import { PALETTE } from "ui";
import PageLayout from "@/app/components/PageLayout";
import FilterPageDesktopBody from "./body-desktop";
import { IFilter, IFilterCategory, IFilterUrl } from "../../contents/common";
import { useRouter } from "next/navigation";
import FilterPageMobileBody from "./body-mobile";

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

export default function FilterPage(props: {
  isMobile: boolean;
  filterId: number;
}) {
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
  const loadDevices = useCallback(() => null, []);

  const [allFilters, setAllFilters] = useState<IFilter[]>([]);

  const actions = [
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
  ];

  const router = useRouter();

  const titleRow = [
    {
      text: "My Filters",
      callback: () => router.push("/filters"),
    },
    {
      text: filter?.title ?? "",
      options: allFilters.map((d) => ({
        text: d.title,
        callback: () => router.push(`/filters/${d.id}`),
      })),
    },
  ];

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      {props.isMobile ? (
        <FilterPageMobileBody
          filterId={props.filterId}
          filter={filter}
          flipCategory={(id) =>
            setAllowedCategories(
              allowedCategories.includes(id)
                ? allowedCategories.filter((sid) => sid !== id)
                : [...allowedCategories, id]
            )
          }
          devices={devices}
          actions={actions}
          categories={categories}
          allowedCategories={allowedCategories}
          allowedSites={allowedSites}
          blockedSites={blockedSites}
          blockedSearchWords={blockedSearchWords}
          addToBlockedSearchWords={(word) =>
            setBlockedSearchWords([...blockedSearchWords, word])
          }
          removeFromBlockedSearchWords={(word) =>
            setBlockedSearchWords(blockedSearchWords.filter((w) => w !== word))
          }
          setExceptionDialogOpen={(url) => setExceptionDialogOpen(true)}
          titleRow={titleRow}
          onRemoveDevice={loadDevices}
          setAddDeviceDialogOpen={() => setAddDeviceDialogOpen(true)}
        />
      ) : (
        <FilterPageDesktopBody
          filterId={props.filterId}
          filter={filter}
          flipCategory={(id) =>
            setAllowedCategories(
              allowedCategories.includes(id)
                ? allowedCategories.filter((sid) => sid !== id)
                : [...allowedCategories, id]
            )
          }
          devices={devices}
          actions={actions}
          categories={categories}
          allowedCategories={allowedCategories}
          allowedSites={allowedSites}
          blockedSites={blockedSites}
          blockedSearchWords={blockedSearchWords}
          addToBlockedSearchWords={(word) =>
            setBlockedSearchWords([...blockedSearchWords, word])
          }
          removeFromBlockedSearchWords={(word) =>
            setBlockedSearchWords(blockedSearchWords.filter((w) => w !== word))
          }
          setExceptionDialogOpen={(url) => setExceptionDialogOpen(true)}
          titleRow={titleRow}
          onRemoveDevice={loadDevices}
          setAddDeviceDialogOpen={() => setAddDeviceDialogOpen(true)}
        />
      )}
      <FilterExceptionDialog
        open={exceptionDialogOpen}
        onClose={() => setExceptionDialogOpen(false)}
        onSubmit={() => null}
      />
    </>
  );
}
