"use client";

import { useEffect, useState } from "react";
import AllFiltersPageDesktopBody from "./body-desktop";
import AllFiltersPageMobileBody from "./body-mobile";
import ApiController from "@/app/api";
import { useRouter } from "next/navigation";
import FilterCreationDialog from "../[id]/components/FilterCreationDialog";
import { IDevice } from "../[id]/contents/common";
import _ from "lodash";
import useAuth from "@/app/hooks/useAuth";

export interface IFilterCategory {
  categoryId: number;
  title: string;
  permanentlyBlocked: boolean;
  subCategories: IFilterSubcategory[];
}

export interface IFilterSubcategory {
  id: number;
  categoryId: IFilterCategory["categoryId"];
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
  filterCategoryWhitelist: IFilterSubcategory[];
  allowedSiteExceptions: IFilterUrl[];
  blockedSiteExceptions: IFilterUrl[];
  official: boolean;
  groupId: number;
}

export interface IGroupFilter {
  id: IFilter["id"];
  title: IFilter["title"];
  official: IFilter["official"];
  devices: {
    profileAvatarUrl: IDevice["profileAvatarUrl"];
    name: IDevice["name"];
  }[];
  totalDeviceCount: number;
  whitelistedCategories: number;
  blacklistedWords: number;
}

const AllFiltersPage = (props: { isMobile: boolean }) => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<IGroupFilter[]>([]);
  useEffect(() => {
    user?.group_id &&
      ApiController.getGroupFilters(user.group_id).then((filtahs) =>
        setFilters(_.sortBy(filtahs, (f) => f.id))
      );
  }, [user?.group_id]);
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
          user?.group_id &&
          ApiController.createFilter(user.group_id, title).then((f) =>
            router.push(`/filters/${f.filterId}`)
          )
        }
        isMobile={props.isMobile}
      />
    </>
  );
};

export default AllFiltersPage;
