import { IUser } from './account/contents/common';
import { IGroup } from './folder/contents/common';
import { IDevice, IFilterException } from './filter/contents/common';
import { IFilter, IFilterSubcategory, IFilterCategory, IFilterUrl } from './filters/contents/common';
import { IChannel, IContentBucket, ILink, IVideo } from './profile/components/ContentTab';
import { IAllowedTime, IRequestedSite, ITimeLimit } from './profile/components/LimitsTab';
import { IApp } from './profile/components/AppsTab';
export interface IVideoComment {
    id: string;
    value: string;
    time: number;
}
export declare const BACKEND_URL = "https://api.astrosafe.co";
export declare const AUTH_URL = "https://auth.astrosafe.co";
export declare const getAbsoluteUrl: (url: string) => string;
export declare const get: (route: string) => Promise<void | Response>;
export declare const post: (route: string, body?: any) => Promise<void | Response>;
export declare const put: (route: string, body: any) => Promise<void | Response>;
export declare const patch: (route: string, body: any) => Promise<void | Response>;
declare class ApiController {
    static getDevice(id: IDevice['id']): Promise<any>;
    static getEnrichedDevice(id: IDevice['id']): Promise<any>;
    static getDeviceWithTimesAndConfig(id: IDevice['id']): Promise<any>;
    static renameDevice(id: IDevice['id'], name: IDevice['name']): Promise<void | Response>;
    static getGroupEnrichedDevices(id: IGroup['id']): Promise<any>;
    static getFolderDevices(id: IContentBucket['id']): Promise<any>;
    static getDeviceFolders(id: IDevice['id']): Promise<any>;
    static getGroupFolders(id: IGroup['id']): Promise<any>;
    static addFolderToDevice(folderId: IContentBucket['id'], deviceId: IDevice['id']): Promise<void | Response>;
    static removeFolderFromDevice(folderId: IContentBucket['id'], deviceId: IDevice['id']): Promise<void | Response>;
    static createFolder(title: IContentBucket['title'], groupId: IContentBucket['groupId']): Promise<any>;
    static removeFolder(id: IContentBucket['id']): Promise<void | Response>;
    static getFolder(id: IContentBucket['id']): Promise<any>;
    static getEnrichedFolders(id: IGroup['id']): Promise<any>;
    static renameFolder(id: IContentBucket['id'], title: IContentBucket['title']): Promise<void | Response>;
    static createLink(title: ILink['title'], url: ILink['url'], thumbnailUrl: ILink['thumbnailUrl'], contentBucketId: IContentBucket['id']): Promise<void | Response>;
    static updateLink(id: ILink['id'], title: ILink['title'], url: ILink['url'], thumbnailUrl: ILink['thumbnailUrl']): Promise<void | Response>;
    static deleteLink(id: ILink['id']): Promise<void | Response>;
    static createVideo(title: ILink['title'], url: ILink['url'], thumbnailUrl: ILink['thumbnailUrl'], contentBucketId: IContentBucket['id']): Promise<void | Response>;
    static updateVideo(id: IVideo['id'], title: IVideo['title'], url: IVideo['url'], contentBucketId?: IContentBucket['id'], isChannel?: boolean): Promise<void | Response>;
    static deleteVideo(id: IVideo['id'], isChannel?: boolean): Promise<void | Response>;
    static createChannel(title: IChannel['title'], url: IChannel['url'], bannerUrl: IChannel['bannerUrl'], profileUrl: IChannel['profileUrl'], contentBucketId: IContentBucket['id']): Promise<void | Response>;
    static updateChannel(id: IChannel['id'], title: IChannel['title'], url: IChannel['url'], bannerUrl: IChannel['bannerUrl'], profileUrl: IChannel['profileUrl']): Promise<void | Response>;
    static deleteChannel(id: ILink['id']): Promise<void | Response>;
    static getUser(id: IUser['id']): Promise<any>;
    static getGroupUsers(id: IUser['id']): Promise<any>;
    static createUser(email: IUser['email']): Promise<void | Response>;
    static createFilter(groupId: IGroup['id'], title: IFilter['title']): Promise<any>;
    static changeFilterName(id: IFilter['id'], title: IFilter['title']): Promise<void | Response>;
    static removeFilter(id: IFilter['id']): Promise<void | Response>;
    static getFilter(id: IFilter['id']): Promise<any>;
    static getGroupFilters(id: IGroup['id']): Promise<any>;
    static getAllFilterCategories(): Promise<any>;
    static getFilterCategories(id: IFilter['id']): Promise<any>;
    static getFilterDevices(id: IFilter['id'], groupId: IGroup['id']): Promise<any>;
    static addFilterToDevice(filterId: IFilter['id'], deviceId: IDevice['id']): Promise<void | Response>;
    static getBlockedSites(filterId: IFilter['id']): Promise<any>;
    static getAllowedSites(filterId: IFilter['id']): Promise<any>;
    static removeBlockedSite(filterId: IFilter['id'], url: IFilterException['domain']): Promise<void | Response>;
    static addBlockedSite(filterId: IFilter['id'], url: IFilterUrl['url']): Promise<void | Response>;
    static removeAllowedSite(filterId: IFilter['id'], url: IFilterException['domain']): Promise<void | Response>;
    static addAllowedSite(filterId: IFilter['id'], url: IFilterUrl['url']): Promise<void | Response>;
    static addWhitelistSubcategory(filterId: IFilter['id'], id: IFilterSubcategory['id']): Promise<void | Response>;
    static removeWhitelistSubcategory(filterId: IFilter['id'], id: IFilterSubcategory['id']): Promise<void | Response>;
    static addWhitelistCategory(filterId: IFilter['id'], id: IFilterCategory['categoryId']): Promise<void | Response>;
    static removeWhitelistCategory(filterId: IFilter['id'], id: IFilterCategory['categoryId']): Promise<void | Response>;
    static getBlockedSearchWords(filterId: IFilter['id']): Promise<any>;
    static addBlockedSearchWord(filterId: IFilter['id'], word: string): Promise<void | Response>;
    static removeBlockedSearchWord(filterId: IFilter['id'], word: string): Promise<void | Response>;
    static getRequestedSites(deviceId: IDevice['id']): Promise<any>;
    static approveRequestedSite(id: IRequestedSite['id']): Promise<void | Response>;
    static denyRequestedSite(id: IRequestedSite['id']): Promise<void | Response>;
    static getLinkPreview(url: ILink['url']): Promise<any>;
    static getVideoPreview(url: IVideo['url']): Promise<any>;
    static getChannelPreview(url: IChannel['url']): Promise<any>;
    static setTimeLimit(limitId: ITimeLimit['id'], timeLimit: ITimeLimit['allowedMinutes']): Promise<void | Response>;
    static addAllowedTimeRange(deviceId: IDevice['id'], day: IAllowedTime['day'], startTime: IAllowedTime['startTime'], endTime: IAllowedTime['endTime']): Promise<void | Response>;
    static changeAllowedTimeRange(id: IAllowedTime['id'], startTime: IAllowedTime['startTime'], endTime: IAllowedTime['endTime']): Promise<void | Response>;
    static removeAllowedTimeRange(id: IAllowedTime['id']): Promise<void | Response>;
    static resetAllowedTimes(deviceId: IDevice['id'], day: IAllowedTime['day']): Promise<void | Response>;
    static flipBrowsingAllowed(deviceId: IDevice['id'], browsingAllowed: boolean): Promise<void | Response>;
    static getQRCode(groupId: IGroup['id']): Promise<any>;
    static flipTimeLimitsEnabled(deviceId: IDevice['id'], enabled: boolean): Promise<void | Response>;
    static flipAllowedTimesEnabled(deviceId: IDevice['id'], enabled: boolean): Promise<void | Response>;
    static getStats(deviceId: IDevice['id'], startDate: string, endDate: string): Promise<any>;
    static getHistory(deviceId: IDevice['id'], date: string, pageIndex: number, pageSize: number, searchTerm?: string): Promise<any>;
    static getApps(deviceId: IDevice['id'], pageIndex: number, pageSize: number, categoryId?: IFilterSubcategory['categoryId'], searchTerm?: string): Promise<any>;
    static enableApp(deviceId: IDevice['id'], appId: IApp['id']): Promise<void | Response>;
    static disableApp(deviceId: IDevice['id'], appId: IApp['id']): Promise<void | Response>;
    static updateUser(id: IUser['id'], realName: IUser['realName'], displayName: IUser['displayName']): Promise<void | Response>;
    static getChannel(id: IChannel['id']): Promise<any>;
    static changeChannelName(id: IChannel['id'], title: IChannel['title']): Promise<void | Response>;
}
export default ApiController;
