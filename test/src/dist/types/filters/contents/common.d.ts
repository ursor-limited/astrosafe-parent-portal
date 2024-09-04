import { IDevice } from '../../filter/contents/common';
export interface IFilterCategory {
    categoryId: number;
    title: string;
    permanentlyBlocked: boolean;
    subCategories: IFilterSubcategory[];
}
export interface IFilterSubcategory {
    id: number;
    categoryId: IFilterCategory['categoryId'];
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
    id: IFilter['id'];
    title: IFilter['title'];
    official: IFilter['official'];
    devices: {
        profileAvatarUrl: IDevice['profileAvatarUrl'];
        name: IDevice['name'];
    }[];
    totalDeviceCount: number;
    whitelistedCategories: number;
    blacklistedWords: number;
}
declare const AllFiltersPage: (props: {
    isMobile: boolean;
    email: string;
}) => import("react/jsx-runtime").JSX.Element;
export default AllFiltersPage;
