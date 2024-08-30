import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/system';
import FilterPageAllowedSitesSection from '../components/AllowedSitesSection';
import FilterPageBlockedSitesSection from '../components/BlockedSitesSection';
import FilterPageSearchWordsSection from '../components/SearchWordsSection';
import { IActionPopupItem } from './../../components/ActionPopup';
import { IDevice, IFilterException } from './common';
import {
  IFilter,
  IFilterSubcategory,
  IFilterCategory,
  IFilterUrl,
} from '../../filters/contents/common';
import MobilePageLayout from './../../components/MobilePageLayout';
import { ITitleRowItem } from './../../components/TitleRow';
import MobileFilterPageDevicesSection from '../components/MobileFilterDevicesSection';
import MobileFilterPageCategoriesSection from '../components/MobileCategoriesSection';
import { useNavigate } from 'react-router-dom';

export default function FilterPageMobileBody(props: {
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
    <MobilePageLayout
      actions={props.actions}
      titleRow={props.titleRow.slice(-1)[0]}
      titleBackButtonCallback={() => navigate('/filters')}
      selectedPage="filters"
    >
      <Stack spacing="20px" pb="33px">
        <MobileFilterPageDevicesSection
          devices={props.devices}
          onAdd={props.setAddDeviceDialogOpen}
          openChangeFilterDialogForDevice={
            props.openChangeFilterDialogForDevice
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
          flipSubcategory={props.flipSubcategory}
        />
        <FilterPageAllowedSitesSection
          allowedSites={props.allowedSites}
          add={props.addAllowedSite}
          delete={props.removeAllowedSite}
          isMobile
        />
        <FilterPageBlockedSitesSection
          blockedSites={props.blockedSites}
          add={props.addBlockedSite}
          delete={props.removeBlockedSite}
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
