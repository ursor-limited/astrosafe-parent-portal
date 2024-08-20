"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";

import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import FilterIcon from "@/images/icons/FilterIcon.svg";
import { PALETTE } from "ui";
import FilterPageDesktopBody from "./body-desktop";
import {
  IFilter,
  IFilterSubcategory,
  IFilterCategory,
  IFilterUrl,
} from "../../contents/common";
import { useRouter } from "next/navigation";
import FilterPageMobileBody from "./body-mobile";
import ApiController from "@/app/api";
import AddDeviceDialog from "@/app/folders/[id]/components/AddDeviceDialog";
import { DUMMY_GROUP_ID } from "../../contents/body-mobile";
import NotificationContext from "@/app/components/NotificationContext";
import DeletionDialog from "@/app/components/DeletionDialog";
import FilterRenameDialog from "../components/FilterRenameDialog";
import ChangeFilterDialog from "../components/ChangeFilterDialog";
import { Stack } from "@mui/system";
import _ from "lodash";
import useDeviceOnlineStatus from "@/app/profiles/components/useDeviceOnlineStatus";

export type DeviceType = "chrome" | "android" | "ios";

export interface IFilterException {
  domain: string;
  title: string;
  favicon: string;
  createdAt: string;
}

export interface IDevice {
  id: number;
  name: string;
  backgroundColor: string;
  profileAvatarUrl: string;
  lastOnline: string;
  deviceType: DeviceType;
  favorites: number[];
  requestedSites: IFilterUrl[];
  createdAt: string;
  online: boolean;
  filterId: IFilter["id"];
}

export interface IDeviceConfig {
  browsingAllowed: boolean;
  videoAllowed: boolean;
  timeLimitsEnabled: boolean;
  allowedTimesEnabled: boolean;
}

export default function FilterPage(props: {
  isMobile: boolean;
  filterId: number;
}) {
  const [filter, setFilter] = useState<IFilter | undefined>();
  const loadFilter = useCallback(
    () => ApiController.getFilter(props.filterId).then(setFilter),
    [props.filterId]
  );
  useEffect(() => {
    loadFilter();
  }, [loadFilter]);

  const [blockedSites, setBlockedSites] = useState<IFilterException[]>([]);
  const loadBlockedSites = useCallback(
    () => ApiController.getBlockedSites(props.filterId).then(setBlockedSites),
    [props.filterId]
  );
  useEffect(() => {
    loadBlockedSites();
  }, [loadBlockedSites]);

  const [allowedSites, setAllowedSites] = useState<IFilterException[]>([]);
  const loadAllowedSites = useCallback(
    () => ApiController.getAllowedSites(props.filterId).then(setAllowedSites),
    [props.filterId]
  );
  useEffect(() => {
    loadAllowedSites();
  }, [loadAllowedSites]);

  const [categories, setCategories] = useState<IFilterCategory[]>([]);
  useEffect(() => {
    ApiController.getAllFilterCategories().then(setCategories);
  }, []);

  const [allowedSubcategories, setAllowedSubcategories] = useState<
    IFilterSubcategory["id"][]
  >([]);
  useEffect(() => {
    ApiController.getFilterCategories(props.filterId).then((response) =>
      setAllowedSubcategories(response.map((x: any) => x.categoryId))
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
  const cuttingEdgeOnlineStatusDevices = useDeviceOnlineStatus(devices);

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
      kallback: () => {
        devices.length > 0
          ? notificationCtx.negativeSuccess(
              "Cannot delete a Filter that is applied to Devices."
            )
          : setDeletionDialogOpen(true);
      },
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
      options: allFilters
        .filter((f) => f.id !== props.filterId)
        .map((f) => ({
          text: f.title,
          image: (
            <Stack
              sx={{
                svg: {
                  path: {
                    fill: PALETTE.secondary.orange[3],
                  },
                },
              }}
              height="16px"
              width="16px"
            >
              <FilterIcon height="16px" width="16px" />
            </Stack>
          ),
          callback: () => router.push(`/filters/${f.id}`),
        })),
    },
  ];

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] =
    useState<boolean>(false);

  const notificationCtx = useContext(NotificationContext);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const [changeFilterDialogOpenForDevice, setChangeFilterDialogOpenForDevice] =
    useState<IDevice | undefined>();

  const deleteFilter = () =>
    ApiController.removeFilter(props.filterId).then(() =>
      router.push("/filters")
    );

  const flipSubcategory = (id: IFilterSubcategory["id"]) => {
    if (allowedSubcategories.includes(id)) {
      setAllowedSubcategories(allowedSubcategories.filter((sid) => sid !== id));
      ApiController.removeWhitelistSubcategory(props.filterId, id);
    } else {
      setAllowedSubcategories([...allowedSubcategories, id]);
      ApiController.addWhitelistSubcategory(props.filterId, id);
    }
  };

  const flipCategory = (id: IFilterCategory["categoryId"]) => {
    const subcategoryIds = categories
      .find((cg) => cg.categoryId === id)
      ?.subCategories.map((c) => c.id);
    if (!subcategoryIds) return;
    if (subcategoryIds?.every((cid) => allowedSubcategories.includes(cid))) {
      setAllowedSubcategories(
        allowedSubcategories.filter((acid) => !subcategoryIds.includes(acid))
      );
      ApiController.removeWhitelistCategory(props.filterId, id);
    } else {
      setAllowedSubcategories(
        _.uniq([...allowedSubcategories, ...subcategoryIds])
      );
      ApiController.addWhitelistCategory(props.filterId, id);
    }
  };

  const addToBlockedSearchWords = (word: string) => {
    setBlockedSearchWords([...blockedSearchWords, word]);
    ApiController.addBlockedSearchWord(props.filterId, word);
  };

  const removeFromBlockedSearchWords = (word: string) => {
    setBlockedSearchWords(blockedSearchWords.filter((w) => w !== word));
    ApiController.removeBlockedSearchWord(props.filterId, word);
  };

  const addBlockedSite = (url: string) =>
    ApiController.addBlockedSite(props.filterId, url)
      .then(loadBlockedSites)
      .then(() => notificationCtx.success("Added blocked site."));

  const addAllowedSite = (url: string) =>
    ApiController.addAllowedSite(props.filterId, url)
      .then(loadAllowedSites)
      .then(() => notificationCtx.success("Added allowed site."));

  const removeBlockedSite = (url: string) =>
    ApiController.removeBlockedSite(props.filterId, url)
      .then(loadBlockedSites)
      .then(() => notificationCtx.negativeSuccess("Removed blocked site."));

  const removeAllowedSite = (url: string) =>
    ApiController.removeAllowedSite(props.filterId, url)
      .then(loadAllowedSites)
      .then(() => notificationCtx.negativeSuccess("Removed allowed site."));

  const applyFilterToDevice = (id: IDevice["id"]) =>
    ApiController.addFilterToDevice(props.filterId, id).then(() => {
      setAddDeviceDialogOpen(false);
      loadDevices();
      notificationCtx.success("Applied this Filter to Device.");
    });

  return filter ? (
    <>
      {props.isMobile ? (
        <FilterPageMobileBody
          filterId={props.filterId}
          filter={filter}
          flipCategory={flipCategory}
          flipSubcategory={flipSubcategory}
          devices={cuttingEdgeOnlineStatusDevices}
          actions={actions}
          categories={categories}
          allowedCategories={allowedSubcategories}
          allowedSites={allowedSites}
          blockedSites={blockedSites}
          blockedSearchWords={blockedSearchWords}
          addToBlockedSearchWords={addToBlockedSearchWords}
          removeFromBlockedSearchWords={removeFromBlockedSearchWords}
          setExceptionDialogOpen={() => setExceptionDialogOpen(true)}
          titleRow={titleRow}
          onRemoveDevice={loadDevices}
          setAddDeviceDialogOpen={() => setAddDeviceDialogOpen(true)}
          addBlockedSite={addBlockedSite}
          addAllowedSite={addAllowedSite}
          removeBlockedSite={removeBlockedSite}
          removeAllowedSite={removeAllowedSite}
          openChangeFilterDialogForDevice={setChangeFilterDialogOpenForDevice}
        />
      ) : (
        <FilterPageDesktopBody
          filterId={props.filterId}
          filter={filter}
          flipCategory={flipCategory}
          flipSubcategory={flipSubcategory}
          devices={cuttingEdgeOnlineStatusDevices}
          actions={actions}
          categories={categories}
          allowedCategories={allowedSubcategories}
          allowedSites={allowedSites}
          blockedSites={blockedSites}
          blockedSearchWords={blockedSearchWords}
          addToBlockedSearchWords={addToBlockedSearchWords}
          removeFromBlockedSearchWords={removeFromBlockedSearchWords}
          setExceptionDialogOpen={() => setExceptionDialogOpen(true)}
          titleRow={titleRow}
          onRemoveDevice={loadDevices}
          setAddDeviceDialogOpen={() => setAddDeviceDialogOpen(true)}
          addBlockedSite={addBlockedSite}
          addAllowedSite={addAllowedSite}
          removeBlockedSite={removeBlockedSite}
          removeAllowedSite={removeAllowedSite}
          openChangeFilterDialogForDevice={setChangeFilterDialogOpenForDevice}
        />
      )}
      {devices ? (
        <AddDeviceDialog
          open={addDeviceDialogOpen}
          groupId={DUMMY_GROUP_ID}
          onClose={() => setAddDeviceDialogOpen(false)}
          title="Apply to a Device"
          subtitle={["Replace a Device's current Filter", "with this one."]}
          addedDevices={cuttingEdgeOnlineStatusDevices}
          onAdd={applyFilterToDevice}
          isMobile={props.isMobile}
        />
      ) : null}
      <DeletionDialog
        open={deletionDialogOpen}
        type="Filter"
        onClose={() => setDeletionDialogOpen(false)}
        subtitle="If you delete this Filter all of the Category configurations, blocked search terms, and blocked and allowed sites will be lost. Any Device still connected to this Filter will be set to the default."
        onSubmit={deleteFilter}
        isMobile={props.isMobile}
      />
      <FilterRenameDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        name={filter.title}
        onSubmit={(name) =>
          ApiController.changeFilterName(props.filterId, name)
            .then(loadFilter)
            .then(() => notificationCtx.success("Renamed Filter"))
        }
        isMobile={props.isMobile}
      />
      {changeFilterDialogOpenForDevice ? (
        <ChangeFilterDialog
          open
          onClose={() => setChangeFilterDialogOpenForDevice(undefined)}
          submitChange={(id) =>
            ApiController.addFilterToDevice(
              id,
              changeFilterDialogOpenForDevice.id
            )
              .then(loadDevices)
              .then(() =>
                notificationCtx.success(
                  `${changeFilterDialogOpenForDevice.name} changed to new Filter`
                )
              )
          }
          currentFilterId={props.filterId}
          groupId={DUMMY_GROUP_ID}
          deviceName={changeFilterDialogOpenForDevice.name}
          isMobile={props.isMobile}
        />
      ) : null}
    </>
  ) : null;
}
