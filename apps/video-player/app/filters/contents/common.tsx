"use client";

import { useEffect, useState } from "react";
import AllFiltersPageDesktopBody from "./body-desktop";
import AllFiltersPageMobileBody, { DUMMY_GROUP_ID } from "./body-mobile";
import ApiController from "@/app/api";
import { useRouter } from "next/navigation";
import FilterCreationDialog from "../[id]/components/FilterCreationDialog";
import { IDevice } from "../[id]/contents/common";

export interface IFilterCategory {
  categoryId: number;
  title: string;
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

export interface IGroupFilter {
  id: IFilter["id"];
  title: IFilter["title"];
  profileAvatarUrls: IDevice["profileAvatarUrl"][];
  devices: number;
  whitelistedCategories: number;
  blacklistedWords: number;
}

const AllFiltersPage = (props: { isMobile: boolean }) => {
  const [filters, setFilters] = useState<IGroupFilter[]>([]);
  useEffect(() => {
    ApiController.getGroupFilters(DUMMY_GROUP_ID).then((f) => setFilters(f));
  }, []);
  const [filterCreationDialogOpen, setFilterCreationDialogOpen] =
    useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      {props.isMobile ? (
        <AllFiltersPageMobileBody
          filters={filters}
          setCreateFilterDialogOpen={() => setFilterCreationDialogOpen(true)}
        />
      ) : (
        <AllFiltersPageDesktopBody
          filters={filters}
          setCreateFilterDialogOpen={() => setFilterCreationDialogOpen(true)}
        />
      )}
      <FilterCreationDialog
        open={filterCreationDialogOpen}
        onClose={() => setFilterCreationDialogOpen(false)}
        onSubmit={(title: IFilter["title"]) =>
          ApiController.createFilter(DUMMY_GROUP_ID, title).then((f) =>
            router.push(`/filters/${f.id}`)
          )
        }
      />
    </>
  );
};

export default AllFiltersPage;
