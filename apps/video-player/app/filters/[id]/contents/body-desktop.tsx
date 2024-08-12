"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import FilterPageCategoriesSection from "../components/CategoriesSection";
import FilterPageAllowedSitesSection from "../components/AllowedSitesSection";
import FilterPageBlockedSitesSection from "../components/BlockedSitesSection";
import FilterPageSearchWordsSection from "../components/SearchWordsSection";
import FilterPageDevicesSection from "../components/FilterDevicesSection";
import PageLayout from "@/app/components/PageLayout";
import { IActionPopupItem } from "@/app/components/ActionPopup";
import { IDevice, IFilterException } from "./common";
import {
  IFilter,
  IFilterCategory,
  IFilterCategoryGroup,
  IFilterUrl,
} from "../../contents/common";
import { ITitleRowItem } from "@/app/components/TitleRow";

export default function FilterPageDesktopBody(props: {
  filterId: number;
  filter: IFilter;
  categoryGroups: IFilterCategoryGroup[];
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
  addBlockedSite: (url: IFilterUrl["url"]) => void;
  addAllowedSite: (url: IFilterUrl["url"]) => void;
  removeBlockedSite: (url: IFilterUrl["url"]) => void;
  removeAllowedSite: (url: IFilterUrl["url"]) => void;
  openChangeFilterDialogForDevice: (device: IDevice) => void;
}) {
  return (
    <PageLayout
      titleRow={props.titleRow}
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="filters"
      maxWidth={834}
      scrollable
      actions={props.actions}
    >
      <Stack pl="49px" pr="2px" spacing="20px" pb="33px">
        <FilterPageDevicesSection
          devices={props.devices}
          onAdd={props.setAddDeviceDialogOpen}
          onRemove={props.onRemoveDevice}
          openChangeFilterDialogForDevice={
            props.openChangeFilterDialogForDevice
          }
        />
        <FilterPageCategoriesSection
          filter={props.filter}
          categoryGroups={props.categoryGroups}
          allowedCategories={props.allowedCategories}
          flipCategory={props.flipCategory}
        />
        <FilterPageAllowedSitesSection
          allowedSites={props.allowedSites}
          add={props.addAllowedSite}
          delete={props.removeAllowedSite}
        />
        <FilterPageBlockedSitesSection
          blockedSites={props.blockedSites}
          add={props.addBlockedSite}
          delete={props.removeBlockedSite}
        />
        <FilterPageSearchWordsSection
          blockedSearchWords={props.blockedSearchWords}
          addWord={props.addToBlockedSearchWords}
          removeWord={props.removeFromBlockedSearchWords}
        />
      </Stack>
    </PageLayout>
  );
}
