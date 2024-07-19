"use client";

import { useEffect, useState } from "react";
import AllFiltersPageDesktopBody from "./body-desktop";
import AllFiltersPageMobileBody, { DUMMY_GROUP_ID } from "./body-mobile";
import ApiController from "@/app/api";

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

export interface IFilterBlacklistedWord {
  id: number;
  word: string;
}

export interface IFilter {
  id: number;
  title: string;
  filterWordBlacklist: IFilterBlacklistedWord[];
  filterCategoryWhitelist: IFilterCategory[];
  allowedSiteExceptions: IFilterUrl[];
  blockedSiteExceptions: IFilterUrl[];
  groupId: number;
}

const AllFiltersPage = (props: { isMobile: boolean }) => {
  const [filters, setFilters] = useState<IFilter[]>([]);
  useEffect(() => {
    ApiController.getGroupFilters(DUMMY_GROUP_ID).then((f) => setFilters(f));
  }, []);
  return props.isMobile ? (
    <AllFiltersPageMobileBody filters={filters} createFilter={() => null} />
  ) : (
    <AllFiltersPageDesktopBody filters={filters} createFilter={() => null} />
  );
};

export default AllFiltersPage;
