"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import FilterPageAllowedSitesSection from "../components/AllowedSitesSection";
import FilterPageBlockedSitesSection from "../components/BlockedSitesSection";
import FilterPageSearchWordsSection from "../components/SearchWordsSection";
import { IActionPopupItem } from "@/app/components/ActionPopup";
import { IDevice, IFilterException } from "./common";
import { IFilter, IFilterCategory, IFilterUrl } from "../../contents/common";
import MobilePageLayout from "@/app/components/MobilePageLayout";
import { ITitleRowItem } from "@/app/components/TitleRow";
import MobileDevicesSection from "@/app/folders/[id]/components/MobileDevicesSection";
import ApiController from "@/app/api";
import MobileFilterPageCategoriesSection from "../components/MobileCategoriesSection";

export default function FilterPageMobileBody(props: {
  filterId: number;
  filter: IFilter;
  categories: IFilterCategory[];
  allowedCategories: IFilterCategory["categoryId"][];
  flipCategory: (id: IFilterCategory["categoryId"]) => void;
  allowedSites: IFilterException[];
  blockedSites: IFilterException[];
  blockedSearchWords: string[];
  addToBlockedSearchWords: (word: string) => void;
  removeFromBlockedSearchWords: (word: string) => void;
  devices: IDevice[];
  actions: IActionPopupItem[];
  setExceptionDialogOpen: (url: IFilterUrl["url"]) => void;
  titleRow: ITitleRowItem[];
  setAddDeviceDialogOpen: () => void;
  onRemoveDevice: () => void;
  addWhitelistException: (url: IFilterUrl["url"]) => void;
  addBlacklistException: (url: IFilterUrl["url"]) => void;
}) {
  return (
    <MobilePageLayout
      actions={props.actions}
      titleRow={props.titleRow}
      selectedPage="filters"
    >
      <Stack spacing="20px" pb="33px">
        <MobileDevicesSection
          title={`Filter applied to ${props.devices.length} Devices.`}
          devices={props.devices}
          folderId={props.filterId}
          onAdd={props.setAddDeviceDialogOpen}
          onRemove={(id: IDevice["id"]) =>
            ApiController.removeFolderFromDevice(props.filterId, id).then(
              props.onRemoveDevice
            )
          }
        />
        {/* <FilterPageServicesSection
          filter={props.filter}
          services={services}
          allowedServices={allowedServices}
          flipService={(id) =>
            setAllowedServices(
              allowedServices.includes(id)
                ? allowedServices.filter((sid) => sid !== id)
                : [...allowedServices, id]
            )
          }
        /> */}
        <MobileFilterPageCategoriesSection
          filter={props.filter}
          categories={props.categories}
          allowedCategories={props.allowedCategories}
          flipCategory={props.flipCategory}
        />
        <FilterPageAllowedSitesSection
          allowedSites={props.allowedSites}
          add={props.addWhitelistException}
          isMobile
        />
        <FilterPageBlockedSitesSection
          blockedSites={props.blockedSites}
          add={props.addBlacklistException}
          isMobile
        />
        <FilterPageSearchWordsSection
          blockedSearchWords={props.blockedSearchWords}
          addWord={props.addToBlockedSearchWords}
          removeWord={props.removeFromBlockedSearchWords}
          isMobile
        />
      </Stack>
    </MobilePageLayout>
  );
}
