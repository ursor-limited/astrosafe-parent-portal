import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/system';
import FilterPageCategoriesSection from '../components/CategoriesSection';
import FilterPageAllowedSitesSection from '../components/AllowedSitesSection';
import FilterPageBlockedSitesSection from '../components/BlockedSitesSection';
import FilterPageSearchWordsSection from '../components/SearchWordsSection';
import FilterPageDevicesSection from '../components/FilterDevicesSection';
import PageLayout from '@/app/components/PageLayout';
import { IActionPopupItem } from '@/app/components/ActionPopup';
import { IDevice, IFilterException } from './common';
import {
  IFilter,
  IFilterSubcategory,
  IFilterCategory,
  IFilterUrl,
} from '../../contents/common';
import { ITitleRowItem } from '@/app/components/TitleRow';
import { useNavigate } from 'react-router-dom';

export default function FilterPageDesktopBody(props: {
  filterId: number;
  filter: IFilter;
  categories: IFilterCategory[];
  allowedCategories: IFilterSubcategory['id'][];
  flipCategory: (id: IFilterCategory['categoryId']) => void;
  flipSubcategory: (id: IFilterSubcategory['id']) => void;
  allowedSites: IFilterException[];
  blockedSites: IFilterException[];
  blockedSearchWords: string[];
  addToBlockedSearchWords: (word: string) => void;
  removeFromBlockedSearchWords: (word: string) => void;
  devices: IDevice[];
  actions: IActionPopupItem[];
  setExceptionDialogOpen: (url: IFilterUrl['url']) => void;
  titleRow: ITitleRowItem[];
  setAddDeviceDialogOpen: () => void;
  onRemoveDevice: () => void;
  addBlockedSite: (url: IFilterUrl['url']) => void;
  addAllowedSite: (url: IFilterUrl['url']) => void;
  removeBlockedSite: (url: IFilterUrl['url']) => void;
  removeAllowedSite: (url: IFilterUrl['url']) => void;
  openChangeFilterDialogForDevice: (device: IDevice) => void;
}) {
  const navigate = useNavigate();
  return (
    <PageLayout
      titleRow={props.titleRow}
      titleBackButtonCallback={() => navigate('/filters')}
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
          categories={props.categories}
          allowedCategories={props.allowedCategories}
          flipCategory={props.flipCategory}
          flipSubcategory={props.flipSubcategory}
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
