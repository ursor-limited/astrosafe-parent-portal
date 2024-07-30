"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";

import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { PALETTE } from "ui";
import FilterPageDesktopBody from "./body-desktop";
import { IFilter, IFilterCategory, IFilterUrl } from "../../contents/common";
import { useRouter } from "next/navigation";
import FilterPageMobileBody from "./body-mobile";
import ApiController from "@/app/api";
import AddDeviceDialog from "@/app/folders/[id]/components/AddDeviceDialog";
import { DUMMY_GROUP_ID } from "../../contents/body-mobile";
import NotificationContext from "@/app/components/NotificationContext";

export type DeviceType = "chrome" | "android" | "ios";

export interface IFilterException {
  url: string;
  title: string;
  favicon: string;
}

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

export interface IDeviceConfig {
  browsingAllowed: boolean;
  videoAllowed: boolean;
}

export default function FilterPage(props: {
  isMobile: boolean;
  filterId: number;
}) {
  const [filter, setFilter] = useState<IFilter | undefined>();
  // const [blockedSites, setBlockedSites] = useState<IFilterUrl[]>([]);
  // const [allowedSites, setAllowedSites] = useState<IFilterUrl[]>([]);
  useEffect(() => {
    ApiController.getFilter(props.filterId).then(setFilter);
  }, [props.filterId]);

  const [whitelistExceptions, setWhitelistExceptions] = useState<
    IFilterException[]
  >([]);
  const loadWhitelistExceptions = useCallback(
    () =>
      ApiController.getWhitelistExceptions(props.filterId).then(
        setWhitelistExceptions
      ),
    [props.filterId]
  );
  useEffect(() => {
    loadWhitelistExceptions();
  }, [loadWhitelistExceptions]);

  const [blacklistExceptions, setBlacklistExceptions] = useState<
    IFilterException[]
  >([]);
  const loadBlacklistExceptions = useCallback(
    () =>
      ApiController.getBlacklistExceptions(props.filterId).then(
        setBlacklistExceptions
      ),
    [props.filterId]
  );
  useEffect(() => {
    loadBlacklistExceptions();
  }, [loadBlacklistExceptions]);

  const [categories, setCategories] = useState<IFilterCategory[]>([]);
  useEffect(() => {
    ApiController.getAllFilterCategories().then(setCategories);
  }, []);

  const [allowedCategories, setAllowedCategories] = useState<
    IFilterCategory["categoryId"][]
  >([]);
  useEffect(() => {
    ApiController.getFilterCategories(props.filterId).then(
      setAllowedCategories
    );
  }, [props.filterId]);

  const [blockedSearchWords, setBlockedSearchWords] = useState<string[]>([]);
  useEffect(() => {
    ApiController.getBlockedSearchWords(props.filterId).then(
      setBlockedSearchWords
    );
  }, [props.filterId]);

  const [exceptionDialogOpen, setExceptionDialogOpen] =
    useState<boolean>(false);

  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);

  const [devices, setDevices] = useState<IDevice[]>([]);
  const loadDevices = useCallback(
    () => ApiController.getFilterDevices(props.filterId).then(setDevices),
    [props.filterId]
  );
  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  const [allFilters, setAllFilters] = useState<IFilter[]>([]);
  useEffect(() => {
    ApiController.getGroupFilters(DUMMY_GROUP_ID).then(setAllFilters);
  }, []);

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

  const notificationCtx = useContext(NotificationContext);

  return filter ? (
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
          allowedSites={whitelistExceptions}
          blockedSites={blacklistExceptions}
          blockedSearchWords={blockedSearchWords}
          addToBlockedSearchWords={(word) => {
            setBlockedSearchWords([...blockedSearchWords, word]);
            ApiController.addBlockedSearchWord(props.filterId, word);
          }}
          removeFromBlockedSearchWords={(word) => {
            setBlockedSearchWords(blockedSearchWords.filter((w) => w !== word));
            ApiController.removeBlockedSearchWord(props.filterId, word);
          }}
          setExceptionDialogOpen={(url) => setExceptionDialogOpen(true)}
          titleRow={titleRow}
          onRemoveDevice={loadDevices}
          setAddDeviceDialogOpen={() => setAddDeviceDialogOpen(true)}
          addWhitelistException={(url: string) =>
            ApiController.addWhitelistException(props.filterId, url).then(
              loadWhitelistExceptions
            )
          }
          addBlacklistException={(url: string) =>
            ApiController.addBlacklistException(props.filterId, url).then(
              loadBlacklistExceptions
            )
          }
        />
      ) : (
        <FilterPageDesktopBody
          filterId={props.filterId}
          filter={filter}
          flipCategory={(id) => {
            if (allowedCategories.includes(id)) {
              setAllowedCategories(
                allowedCategories.filter((sid) => sid !== id)
              );
              ApiController.removeWhitelistCategory(props.filterId, id);
            } else {
              setAllowedCategories([...allowedCategories, id]);
              ApiController.addWhitelistCategory(props.filterId, id);
            }
          }}
          devices={devices}
          actions={actions}
          categories={categories}
          allowedCategories={allowedCategories}
          allowedSites={whitelistExceptions}
          blockedSites={blacklistExceptions}
          blockedSearchWords={blockedSearchWords}
          addToBlockedSearchWords={(word) => {
            setBlockedSearchWords([...blockedSearchWords, word]);
            ApiController.addBlockedSearchWord(props.filterId, word);
          }}
          removeFromBlockedSearchWords={(word) => {
            setBlockedSearchWords(blockedSearchWords.filter((w) => w !== word));
            ApiController.removeBlockedSearchWord(props.filterId, word);
          }}
          setExceptionDialogOpen={(url) => setExceptionDialogOpen(true)}
          titleRow={titleRow}
          onRemoveDevice={loadDevices}
          setAddDeviceDialogOpen={() => setAddDeviceDialogOpen(true)}
          addWhitelistException={(url: string) =>
            ApiController.addWhitelistException(props.filterId, url).then(
              loadWhitelistExceptions
            )
          }
          addBlacklistException={(url: string) =>
            ApiController.addBlacklistException(props.filterId, url).then(
              loadBlacklistExceptions
            )
          }
        />
      )}
      {devices ? (
        <AddDeviceDialog
          open={addDeviceDialogOpen}
          groupId={DUMMY_GROUP_ID}
          onClose={() => setAddDeviceDialogOpen(false)}
          title="Apply to a Device"
          subtitle={["Replace a Device's current Filter", "with this one."]}
          addedDevices={devices}
          onAdd={(id) => {
            ApiController.addFilterToDevice(props.filterId, id).then(() => {
              setAddDeviceDialogOpen(false);
              loadDevices();
              notificationCtx.success("Applied this Filter to Device.");
            });
          }}
          isMobile={props.isMobile}
        />
      ) : null}
    </>
  ) : null;
}
