"use client";

import { useEffect, useState } from "react";
import AllFiltersPageDesktopBody from "./body-desktop";
import AllFiltersPageMobileBody, { DUMMY_GROUP_ID } from "./body-mobile";
import ApiController from "@/app/api";
import FilterRenameDialog from "../[id]/components/FilterRenameDialog";
import { useRouter } from "next/navigation";
import FilterCreationDialog from "../[id]/components/FilterCreationDialog";

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
