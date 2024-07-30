"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import FilterPageCategoriesSection from "../components/CategoriesSection";
import FilterPageAllowedSitesSection from "../components/AllowedSitesSection";
import FilterPageBlockedSitesSection from "../components/BlockedSitesSection";
import FilterPageSearchWordsSection from "../components/SearchWordsSection";
import FilterPageDevicesSection from "../components/DevicesSection";
import PageLayout from "@/app/components/PageLayout";
import { IActionPopupItem } from "@/app/components/ActionPopup";
import { IDevice, IFilterException } from "./common";
import { IFilter, IFilterCategory, IFilterUrl } from "../../contents/common";
import { ITitleRowItem } from "@/app/components/TitleRow";

export default function FilterPageDesktopBody(props: {
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
    <PageLayout
      titleRow={props.titleRow}
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="filters"
      // button={{
      //   text: "Add a Filter",
      //   callback: () => null,
      //   icon: PlusIcon,
      // }}
      maxWidth={834}
      scrollable
      actions={props.actions}
    >
      <Stack pl="49px" pr="2px" spacing="20px" pb="33px">
        <FilterPageDevicesSection
          devices={props.devices}
          onAdd={props.setAddDeviceDialogOpen}
          onRemove={props.onRemoveDevice}
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
        {/* <FilterPageCategoriesSection
          filter={props.filter}
          categories={props.categories}
          allowedCategories={props.allowedCategories}
          flipCategory={props.flipCategory}
        /> */}
        <FilterPageAllowedSitesSection
          allowedSites={props.allowedSites}
          add={props.addWhitelistException}
        />
        <FilterPageBlockedSitesSection
          blockedSites={props.blockedSites}
          add={props.addBlacklistException}
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
