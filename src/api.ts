import { IUser } from './account/contents/common'
import { IGroup } from './folder/contents/common'
import { IDevice, IFilterException } from './filter/contents/common'
import {
  IFilter,
  IFilterSubcategory,
  IFilterCategory,
  IFilterUrl,
} from './astrosafe/components/filters/AllFilters'
import {
  IChannel,
  IContentBucket,
  ILink,
  IVideo,
} from './profile/components/ContentTab'
import _ from 'lodash'
import {
  IAllowedTime,
  IRequestedSite,
  ITimeLimit,
} from './profile/components/LimitsTab'
import { cleanUrl } from './profile/components/MobileInsightsTab'
import { IApp } from './profile/components/AppsTab'
import Cookies from 'js-cookie'

export interface IVideoComment {
  id: string
  value: string
  time: number
}

export const getAbsoluteUrl = (url: string) => `https://${url}`

class ApiController {
  BACKEND_URL: string
  AUTH_URL: string

  constructor(isProd: boolean = false) {
    this.BACKEND_URL = isProd
      ? 'https://api.astrosafe.co'
      : 'https://dev.api.astrosafe.co'

    this.AUTH_URL = isProd
      ? 'https://auth.astrosafe.co'
      : 'https://dev.auth.astrosafe.co'
  }

  private get = (route: string) =>
    fetch(
      //@ts-ignore
      `${this.BACKEND_URL}/${route}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { Origin: 'https://localhost:3000' },
      }
    ).catch((err) => {
      if (err.statusCode === 401) {
        Cookies.remove('access_token')

        Cookies.remove('user_info')
      }
    })

  private post = (route: string, body?: any) =>
    fetch(
      //@ts-ignore
      `${this.BACKEND_URL}/${route}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://localhost:3000',
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store',
      }
    ).catch((err) => {
      if (err.statusCode === 401) {
        Cookies.remove('access_token')

        Cookies.remove('user_info')
      }
    })

  private put = (route: string, body: any) =>
    fetch(
      //@ts-ignore
      `${this.BACKEND_URL}/${route}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://localhost:3000',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      }
    ).catch((err) => {
      if (err.statusCode === 401) {
        Cookies.remove('access_token')

        Cookies.remove('user_info')
      }
    })

  private patch = (route: string, body: any) =>
    fetch(
      //@ts-ignore
      `${this.BACKEND_URL}/${route}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://localhost:3000',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      }
    ).catch((err) => {
      if (err.statusCode === 401) {
        Cookies.remove('access_token')

        Cookies.remove('user_info')
      }
    })

  private delete = (route: string) =>
    fetch(
      //@ts-ignore
      `${this.BACKEND_URL}/${route}`,
      {
        method: 'DELETE',
        headers: { Origin: 'https://localhost:3000' },
        credentials: 'include',
      }
    ).catch((err) => {
      if (err.statusCode === 401) {
        Cookies.remove('access_token')

        Cookies.remove('user_info')
      }
    })

  public async getDevice(id: IDevice['id']) {
    return this.get(`devices/${id}`).then((response: any) => response.json())
  }

  public async getEnrichedDevice(id: IDevice['id']) {
    return this.get(
      `devices/${id}?includeScreenTime=true&includeConfig=true&includeTimeLimits=true&includeAllowedTimes=true&includeOnlineStatus=true&includeLatestBrowsing=true`
    ).then((response: any) => response.json())
  }

  public async getDeviceWithTimesAndConfig(id: IDevice['id']) {
    return this.get(
      `devices/${id}?includeTimeLimits=true&includeAllowedTimes=true&includeConfig=true`
    ).then((response: any) => response.json())
  }

  public async renameDevice(id: IDevice['id'], name: IDevice['name']) {
    return this.patch(`devices/${id}`, { name })
  }

  public async getGroupEnrichedDevices(id: IGroup['id']) {
    return this.get(
      `devices?groupId=${id}&includeScreenTime=true&includeConfig=true&includeTimeLimits=true&includeAllowedTimes=true&includeOnlineStatus=true&includeLatestBrowsing=true`
    ).then((response: any) => response.json())
  }

  public async getFolderDevices(id: IContentBucket['id']) {
    return this.get(`devices?contentBucketId=${id}&includeConfig=true`).then(
      (response: any) => response.json()
    )
  }

  public async getDeviceFolders(id: IDevice['id']) {
    return this.get(`content/buckets?deviceId=${id}&includePreview=true`).then(
      (response: any) => response.json()
    )
  }

  public async getGroupFolders(id: IGroup['id']) {
    return this.get(`content/buckets?groupId=${id}`).then((response: any) =>
      response.json()
    )
  }

  public async addFolderToDevice(
    folderId: IContentBucket['id'],
    deviceId: IDevice['id']
  ) {
    return this.post(`content/buckets/${folderId}/devices`, { deviceId })
  }

  public async removeFolderFromDevice(
    folderId: IContentBucket['id'],
    deviceId: IDevice['id']
  ) {
    return this.delete(`content/buckets/${folderId}/devices/${deviceId}`)
  }

  public async createFolder(
    title: IContentBucket['title'],
    groupId: IContentBucket['groupId']
  ) {
    return this.post('content/buckets', { title, groupId }).then(
      (response: any) => response.json()
    )
  }

  public async removeFolder(id: IContentBucket['id']) {
    return this.delete(`content/buckets/${id}`)
  }

  public async getFolder(id: IContentBucket['id']) {
    return this.get(`content/buckets/${id}`).then((response: any) =>
      response.json()
    )
  }

  public async getEnrichedFolders(id: IGroup['id']) {
    return this.get(`content/buckets?groupId=${id}&includePreview=true`).then(
      (response: any) => response.json()
    )
  }

  public async renameFolder(
    id: IContentBucket['id'],
    title: IContentBucket['title']
  ) {
    return this.put(`content/buckets/${id}`, { title })
  }

  public async createLink(
    title: ILink['title'],
    url: ILink['url'],
    thumbnailUrl: ILink['thumbnailUrl'],
    contentBucketId: IContentBucket['id']
  ) {
    return this.post(`content/links`, {
      title,
      url,
      thumbnailUrl,
      contentBucketId,
    })
  }

  public async updateLink(
    id: ILink['id'],
    title: ILink['title'],
    url: ILink['url'],
    thumbnailUrl: ILink['thumbnailUrl']
  ) {
    return this.put(`content/links/${id}`, { title, url, thumbnailUrl })
  }

  public async deleteLink(id: ILink['id']) {
    return this.delete(`content/links/${id}`)
  }

  public async createVideo(
    title: ILink['title'],
    url: ILink['url'],
    thumbnailUrl: ILink['thumbnailUrl'],
    contentBucketId: IContentBucket['id']
  ) {
    return this.post(`content/videos`, {
      title,
      url,
      thumbnailUrl,
      contentBucketId,
    })
  }

  public async updateVideo(
    id: IVideo['id'],
    title: IVideo['title'],
    url: IVideo['url'],
    contentBucketId?: IContentBucket['id'],
    isChannel?: boolean
    //thumbnailUrl: IVideo["thumbnailUrl"]
  ) {
    return this.put(
      `content/videos/${id}${isChannel ? '?isChannel=true' : ''}`,
      {
        title,
        url,
        contentBucketId,
      }
    )
  }

  public async deleteVideo(id: IVideo['id'], isChannel?: boolean) {
    return this.delete(
      `content/videos/${id}${isChannel ? '?isChannel=true' : ''}`
    )
  }

  public async createChannel(
    title: IChannel['title'],
    url: IChannel['url'],
    bannerUrl: IChannel['bannerUrl'],
    profileUrl: IChannel['profileUrl'],
    contentBucketId: IContentBucket['id']
  ) {
    return this.post(`content/channels`, {
      title,
      url,
      bannerUrl,
      profileUrl,
      contentBucketId,
    })
  }

  public async updateChannel(
    id: IChannel['id'],
    title: IChannel['title'],
    url: IChannel['url'],
    bannerUrl: IChannel['bannerUrl'],
    profileUrl: IChannel['profileUrl']
  ) {
    return this.put(`content/channels/${id}`, {
      title,
      url,
      bannerUrl,
      profileUrl,
    })
  }

  public async deleteChannel(id: ILink['id']) {
    return this.delete(`content/channels/${id}`)
  }

  public async getUser(id: IUser['id']) {
    return this.get(`users/${id}`).then((response: any) => response.json())
  }

  public async getGroupUsers(id: IUser['id']) {
    return this.get(`users?groupId=${id}`).then((response: any) =>
      response.json()
    )
  }

  public async createUser(email: IUser['email']) {
    return this.post('users', { email, realName: '', displayName: '' })
  }

  public async createFilter(groupId: IGroup['id'], title: IFilter['title']) {
    return this.post(`groups/${groupId}/filters`, { title }).then(
      (response: any) => response.json()
    )
  }

  public async changeFilterName(id: IFilter['id'], title: IFilter['title']) {
    return this.patch(`filters/${id}`, { title })
  }

  public async removeFilter(id: IFilter['id']) {
    return this.delete(`filters/${id}`)
  }

  public async getFilter(id: IFilter['id']) {
    return this.get(`filters/${id}`).then((response: any) => response.json())
  }

  public async getGroupFilters(id: IGroup['id']) {
    return this.get(`filters?groupId=${id}`).then((response: any) =>
      response.json()
    )
  }

  public async getAllFilterCategories() {
    return this.get('filters/categories').then((response: any) =>
      response.json()
    )
  }

  public async getFilterCategories(id: IFilter['id']) {
    return this.get(`filters/${id}/whitelist/categories`).then(
      (response: any) => response.json()
    )
  }

  public async getFilterDevices(id: IFilter['id'], groupId?: IGroup['id']) {
    return this.get(
      `devices?filterId=${id}&includeConfig=true` +
        (groupId ? `&groupId=${groupId}` : '')
    ).then((response: any) => response.json())
  }

  public async addFilterToDevice(
    filterId: IFilter['id'],
    deviceId: IDevice['id']
  ) {
    return this.post(`filters/${filterId}/devices`, { deviceId })
  }

  public async getBlockedSites(filterId: IFilter['id']) {
    return this.get(`filters/${filterId}/blacklist`).then((response: any) =>
      response.json()
    )
  }

  public async getAllowedSites(filterId: IFilter['id']) {
    return this.get(`filters/${filterId}/whitelist`).then((response: any) =>
      response.json()
    )
  }

  public async removeBlockedSite(
    filterId: IFilter['id'],
    url: IFilterException['domain']
  ) {
    return this.delete(
      `filters/${filterId}/blacklist/${encodeURIComponent(
        getAbsoluteUrl(cleanUrl(url))
      )}`
    )
  }

  public async addBlockedSite(filterId: IFilter['id'], url: IFilterUrl['url']) {
    return this.post(`filters/${filterId}/blacklist`, {
      url: getAbsoluteUrl(cleanUrl(url)),
    })
  }

  public async removeAllowedSite(
    filterId: IFilter['id'],
    url: IFilterException['domain']
  ) {
    return this.delete(
      `filters/${filterId}/whitelist/${encodeURIComponent(
        getAbsoluteUrl(cleanUrl(url))
      )}`
    )
  }

  public async addAllowedSite(filterId: IFilter['id'], url: IFilterUrl['url']) {
    return this.post(`filters/${filterId}/whitelist`, {
      url: getAbsoluteUrl(cleanUrl(url)),
    })
  }

  public async addWhitelistSubcategory(
    filterId: IFilter['id'],
    id: IFilterSubcategory['id']
  ) {
    return this.post(`filters/${filterId}/whitelist/categories`, {
      categoryId: id.toString(),
    })
  }

  public async removeWhitelistSubcategory(
    filterId: IFilter['id'],
    id: IFilterSubcategory['id']
  ) {
    return this.delete(`filters/${filterId}/whitelist/categories/${id}`)
  }

  public async addWhitelistCategory(
    filterId: IFilter['id'],
    id: IFilterCategory['categoryId']
  ) {
    return this.post(`filters/${filterId}/whitelist/categories?isGroup=true`, {
      categoryId: id.toString(),
    })
  }

  public async removeWhitelistCategory(
    filterId: IFilter['id'],
    id: IFilterCategory['categoryId']
  ) {
    return this.delete(
      `filters/${filterId}/whitelist/categories/${id}?isGroup=true`
    )
  }

  public async getBlockedSearchWords(filterId: IFilter['id']) {
    return this.get(`filters/${filterId}/blacklist/words`).then(
      (response: any) => response.json()
    )
  }

  public async addBlockedSearchWord(filterId: IFilter['id'], word: string) {
    return this.post(`filters/${filterId}/blacklist/words`, { word })
  }

  public async removeBlockedSearchWord(filterId: IFilter['id'], word: string) {
    return this.delete(`filters/${filterId}/blacklist/words/${word}`)
  }

  public async getRequestedSites(deviceId: IDevice['id']) {
    return this.get(`devices/${deviceId}/requests?status=pending`).then(
      (response: any) => response.json()
    )
  }

  public async approveRequestedSite(id: IRequestedSite['id']) {
    return this.post(`devices/requests/${id}/approve`, {})
  }

  public async denyRequestedSite(id: IRequestedSite['id']) {
    return this.delete(`devices/requests/${id}/deny`)
  }

  public async getLinkPreview(url: ILink['url']) {
    return this.get(`content/links/preview/${url}`).then((response: any) =>
      response.json()
    )
  }

  public async getVideoPreview(url: IVideo['url']) {
    return this.get(`content/videos/preview/${url}`).then((response: any) =>
      response.json()
    )
  }

  public async getChannelPreview(url: IChannel['url']) {
    return this.get(`content/channels/preview/${url}`).then((response: any) =>
      response.json()
    )
  }

  public async setTimeLimit(
    limitId: ITimeLimit['id'],
    timeLimit: ITimeLimit['allowedMinutes']
  ) {
    return this.patch(`devices/configs/screentime/limits/${limitId}`, {
      timeLimit,
    })
  }

  public async addAllowedTimeRange(
    deviceId: IDevice['id'],
    day: IAllowedTime['day'],
    startTime: IAllowedTime['startTime'],
    endTime: IAllowedTime['endTime']
  ) {
    return this.post(`devices/${deviceId}/config/screentime/allowed`, {
      startTime,
      endTime,
    })
  }

  public async changeAllowedTimeRange(
    id: IAllowedTime['id'],
    startTime: IAllowedTime['startTime'],
    endTime: IAllowedTime['endTime']
  ) {
    return this.patch(`devices/configs/screentime/allowed/${id}`, {
      startTime,
      endTime,
    })
  }

  public async removeAllowedTimeRange(id: IAllowedTime['id']) {
    return this.delete(`devices/configs/screentime/allowed/${id}`)
  }

  public async resetAllowedTimes(
    deviceId: IDevice['id'],
    day: IAllowedTime['day']
  ) {
    return this.put(
      `devices/${deviceId}/config/screentime/allowed/reset?day=${day}`,
      {}
    )
  }

  public async flipBrowsingAllowed(
    deviceId: IDevice['id'],
    browsingAllowed: boolean
  ) {
    return this.patch(`devices/${deviceId}/configs/browsing`, {
      browsingAllowed,
    })
  }

  public async getQRCode(groupId: IGroup['id']) {
    return this.post(`groups/${groupId}/devices/qrcode`, {}).then(
      (response: any) => response.text()
    )
  }

  public async flipTimeLimitsEnabled(
    deviceId: IDevice['id'],
    enabled: boolean
  ) {
    return this.patch(`devices/${deviceId}/config/screentime/toggle`, {
      timeLimitsEnabled: enabled,
    })
  }

  public async flipAllowedTimesEnabled(
    deviceId: IDevice['id'],
    enabled: boolean
  ) {
    return this.patch(`devices/${deviceId}/config/screentime/toggle`, {
      allowedTimesEnabled: enabled,
    })
  }

  public async getStats(
    deviceId: IDevice['id'],
    startDate: string,
    endDate: string
  ) {
    return this.get(
      `devices/${deviceId}/statistics?startDate=${startDate}&endDate=${endDate}`
    ).then((response: any) => response.json())
  }

  public async getHistory(
    deviceId: IDevice['id'],
    date: string,
    pageIndex: number,
    pageSize: number,
    searchTerm?: string
  ) {
    return this.get(
      `devices/${deviceId}/history?date=${date}&page=${pageIndex}&limit=${pageSize}${
        searchTerm ? `&search=${searchTerm}` : ''
      }`
    ).then((response: any) => response.json())
  }

  public async getApps(
    deviceId: IDevice['id'],
    pageIndex: number,
    pageSize: number,
    categoryId?: IFilterSubcategory['categoryId'],
    searchTerm?: string
  ) {
    return this.get(
      `troomi/devices/${deviceId}/apps?page=${pageIndex}&limit=${pageSize}${
        searchTerm ? `&search=${searchTerm}` : ''
      }${categoryId ? `&categoryId=${categoryId}` : ''}`
    ).then((response: any) => response.json())
  }

  public async enableApp(deviceId: IDevice['id'], appId: IApp['id']) {
    return this.post(`troomi/devices/${deviceId}/apps/${appId}/enable`, {})
  }

  public async disableApp(deviceId: IDevice['id'], appId: IApp['id']) {
    return this.delete(`troomi/devices/${deviceId}/apps/${appId}/disable`)
  }

  public async updateUser(
    id: IUser['id'],
    realName: IUser['realName'],
    displayName: IUser['displayName']
  ) {
    return this.put(`users/${id}`, { realName, displayName })
  }

  public async getChannel(id: IChannel['id']) {
    return this.get(`content/channels/${id}`).then((response: any) =>
      response.json()
    )
  }

  public async changeChannelName(id: IChannel['id'], title: IChannel['title']) {
    return this.put(`content/channels/${id}`, { title })
  }

  public async getAppCategorySubGroups() {
    return this.get(`filters/appCategorySubGroups`).then((response: any) =>
      response.json()
    )
  }
}

export default ApiController
