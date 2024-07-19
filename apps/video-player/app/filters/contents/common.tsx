"use client";

import { useState } from "react";
import AllFiltersPageDesktopBody, { DUMMY_FILTERS } from "./body-desktop";
import AllFiltersPageMobileBody from "./body-mobile";

export interface IFilterCategory {
  id: number;
  title: string;
  groupId: number;
}

export interface IFilterUrl {
  id: number;
  url: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  groupId: number;
}

export interface IFilterDomain {
  id: number;
  domain: string;
  title: string;
  faviconUrl: string;
  urls: IFilterUrl[];
}

export interface IFilter {
  id: number;
  title: string;
  allowedServices: IFilterUrl["id"][];
  allowedCategories: IFilterCategory["id"][];
  allowedSiteExceptions: IFilterUrl["id"][];
  blockedSiteExceptions: IFilterUrl["id"][];
  blockedWords: string[];
  groupId: number;
}

const AllFiltersPage = (props: { isMobile: boolean }) => {
  const [filters, setFilters] = useState<IFilter[]>(DUMMY_FILTERS);
  return props.isMobile ? (
    <AllFiltersPageMobileBody filters={filters} createFilter={() => null} />
  ) : (
    <AllFiltersPageDesktopBody filters={filters} createFilter={() => null} />
  );
};

export default AllFiltersPage;
