import { IUser } from './account/contents/common'
import { IGroup } from './folder/contents/common'
import { IDevice, IFilterException } from './filter/contents/common'
import {
  IFilter,
  IFilterSubcategory,
  IFilterCategory,
  IFilterUrl,
} from './filters/contents/common'
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

if (window.location.hostname !== 'localhost' && !process.env.AUTH_URL)
  throw new Error(
    'You must set AUTH_URL (Endpoint to call to login your users) in your .env'
  )

export const BACKEND_URL =
  window.location.hostname === 'localhost'
    ? 'https://localhost:8000'
    : 'https://api.astrosafe.co'

export const AUTH_URL =
  window.location.hostname === 'localhost'
    ? 'https://localhost:8000'
    : 'https://auth.astrosafe.co'

export const getAbsoluteUrl = (url: string) => `https://${url}`

export const get = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URL}/${route}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  ).catch((err) => {
    if (err.statusCode === 401) {
      Cookies.remove('access_token')

      Cookies.remove('user_info')
    }
  })

export const post = (route: string, body?: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URL}/${route}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const put = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URL}/${route}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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

export const patch = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URL}/${route}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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

const dellete = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URL}/${route}`,
    {
      method: 'DELETE',
      headers: { 'Access-Control-Allow-Origin': '*' },
      credentials: 'include',
    }
  ).catch((err) => {
    if (err.statusCode === 401) {
      Cookies.remove('access_token')

      Cookies.remove('user_info')
    }
  })

class ApiController {
  static async getDevice(id: IDevice['id']) {
    return get(`devices/${id}`).then((response: any) => response.json())
  }

  static async getEnrichedDevice(id: IDevice['id']) {
    return get(
      `devices/${id}?includeScreenTime=true&includeConfig=true&includeTimeLimits=true&includeAllowedTimes=true&includeOnlineStatus=true&includeLatestBrowsing=true`
    ).then((response: any) => response.json())
  }

  static async getDeviceWithTimesAndConfig(id: IDevice['id']) {
    return get(
      `devices/${id}?includeTimeLimits=true&includeAllowedTimes=true&includeConfig=true`
    ).then((response: any) => response.json())
  }

  static async renameDevice(id: IDevice['id'], name: IDevice['name']) {
    return patch(`devices/${id}`, { name })
  }

  static async getGroupEnrichedDevices(id: IGroup['id']) {
    return get(
      `devices?groupId=${id}&includeScreenTime=true&includeConfig=true&includeTimeLimits=true&includeAllowedTimes=true&includeOnlineStatus=true&includeLatestBrowsing=true`
    ).then((response: any) => response.json())
  }

  static async getFolderDevices(id: IContentBucket['id']) {
    return get(`devices?contentBucketId=${id}&includeConfig=true`).then(
      (response: any) => response.json()
    )
  }

  static async getDeviceFolders(id: IDevice['id']) {
    return get(`content/buckets?deviceId=${id}&includePreview=true`).then(
      (response: any) => response.json()
    )
  }

  static async getGroupFolders(id: IGroup['id']) {
    return get(`content/buckets?groupId=${id}`).then((response: any) =>
      response.json()
    )
  }

  static async addFolderToDevice(
    folderId: IContentBucket['id'],
    deviceId: IDevice['id']
  ) {
    return post(`content/buckets/${folderId}/devices`, { deviceId })
  }

  static async removeFolderFromDevice(
    folderId: IContentBucket['id'],
    deviceId: IDevice['id']
  ) {
    return dellete(`content/buckets/${folderId}/devices/${deviceId}`)
  }

  static async createFolder(
    title: IContentBucket['title'],
    groupId: IContentBucket['groupId']
  ) {
    return post('content/buckets', { title, groupId }).then((response: any) =>
      response.json()
    )
  }

  static async removeFolder(id: IContentBucket['id']) {
    return dellete(`content/buckets/${id}`)
  }

  static async getFolder(id: IContentBucket['id']) {
    return get(`content/buckets/${id}`).then((response: any) => response.json())
  }

  static async getEnrichedFolders(id: IGroup['id']) {
    return get(`content/buckets?groupId=${id}&includePreview=true`).then(
      (response: any) => response.json()
    )
  }

  static async renameFolder(
    id: IContentBucket['id'],
    title: IContentBucket['title']
  ) {
    return put(`content/buckets/${id}`, { title })
  }

  static async createLink(
    title: ILink['title'],
    url: ILink['url'],
    thumbnailUrl: ILink['thumbnailUrl'],
    contentBucketId: IContentBucket['id']
  ) {
    return post(`content/links`, { title, url, thumbnailUrl, contentBucketId })
  }

  static async updateLink(
    id: ILink['id'],
    title: ILink['title'],
    url: ILink['url'],
    thumbnailUrl: ILink['thumbnailUrl']
  ) {
    return put(`content/links/${id}`, { title, url, thumbnailUrl })
  }

  static async deleteLink(id: ILink['id']) {
    return dellete(`content/links/${id}`)
  }

  static async createVideo(
    title: ILink['title'],
    url: ILink['url'],
    thumbnailUrl: ILink['thumbnailUrl'],
    contentBucketId: IContentBucket['id']
  ) {
    return post(`content/videos`, {
      title,
      url,
      thumbnailUrl,
      contentBucketId,
    })
  }

  static async updateVideo(
    id: IVideo['id'],
    title: IVideo['title'],
    url: IVideo['url'],
    contentBucketId?: IContentBucket['id'],
    isChannel?: boolean
    //thumbnailUrl: IVideo["thumbnailUrl"]
  ) {
    return put(`content/videos/${id}${isChannel ? '?isChannel=true' : ''}`, {
      title,
      url,
      contentBucketId,
    })
  }

  static async deleteVideo(id: IVideo['id'], isChannel?: boolean) {
    return dellete(`content/videos/${id}${isChannel ? '?isChannel=true' : ''}`)
  }

  static async createChannel(
    title: IChannel['title'],
    url: IChannel['url'],
    bannerUrl: IChannel['bannerUrl'],
    profileUrl: IChannel['profileUrl'],
    contentBucketId: IContentBucket['id']
  ) {
    return post(`content/channels`, {
      title,
      url,
      bannerUrl,
      profileUrl,
      contentBucketId,
    })
  }

  static async updateChannel(
    id: IChannel['id'],
    title: IChannel['title'],
    url: IChannel['url'],
    bannerUrl: IChannel['bannerUrl'],
    profileUrl: IChannel['profileUrl']
  ) {
    return put(`content/channels/${id}`, {
      title,
      url,
      bannerUrl,
      profileUrl,
    })
  }

  static async deleteChannel(id: ILink['id']) {
    return dellete(`content/channels/${id}`)
  }

  static async getUser(id: IUser['id']) {
    return get(`users/${id}`).then((response: any) => response.json())
  }

  static async getGroupUsers(id: IUser['id']) {
    return get(`users?groupId=${id}`).then((response: any) => response.json())
  }

  static async createUser(email: IUser['email']) {
    return post('users', { email, realName: '', displayName: '' })
  }

  static async createFilter(groupId: IGroup['id'], title: IFilter['title']) {
    return post(`groups/${groupId}/filters`, { title }).then((response: any) =>
      response.json()
    )
  }

  static async changeFilterName(id: IFilter['id'], title: IFilter['title']) {
    return patch(`filters/${id}`, { title })
  }

  static async removeFilter(id: IFilter['id']) {
    return dellete(`filters/${id}`)
  }

  static async getFilter(id: IFilter['id']) {
    return get(`filters/${id}`).then((response: any) => response.json())
  }

  static async getGroupFilters(id: IGroup['id']) {
    return get(`filters?groupId=${id}`).then((response: any) => response.json())
  }

  static async getAllFilterCategories() {
    return get('filters/categories').then((response: any) => response.json())
  }

  static async getFilterCategories(id: IFilter['id']) {
    return get(`filters/${id}/whitelist/categories`).then((response: any) =>
      response.json()
    )
  }

  static async getFilterDevices(id: IFilter['id'], groupId: IGroup['id']) {
    return get(
      `devices?groupId=${groupId}&filterId=${id}&includeConfig=true`
    ).then((response: any) => response.json())
  }

  static async addFilterToDevice(
    filterId: IFilter['id'],
    deviceId: IDevice['id']
  ) {
    return post(`filters/${filterId}/devices`, { deviceId })
  }

  static async getBlockedSites(filterId: IFilter['id']) {
    return get(`filters/${filterId}/blacklist`).then((response: any) =>
      response.json()
    )
  }

  static async getAllowedSites(filterId: IFilter['id']) {
    return get(`filters/${filterId}/whitelist`).then((response: any) =>
      response.json()
    )
  }

  static async removeBlockedSite(
    filterId: IFilter['id'],
    url: IFilterException['domain']
  ) {
    return dellete(
      `filters/${filterId}/blacklist/${encodeURIComponent(
        getAbsoluteUrl(cleanUrl(url))
      )}`
    )
  }

  static async addBlockedSite(filterId: IFilter['id'], url: IFilterUrl['url']) {
    return post(`filters/${filterId}/blacklist`, {
      url: getAbsoluteUrl(cleanUrl(url)),
    })
  }

  static async removeAllowedSite(
    filterId: IFilter['id'],
    url: IFilterException['domain']
  ) {
    return dellete(
      `filters/${filterId}/whitelist/${encodeURIComponent(
        getAbsoluteUrl(cleanUrl(url))
      )}`
    )
  }

  static async addAllowedSite(filterId: IFilter['id'], url: IFilterUrl['url']) {
    return post(`filters/${filterId}/whitelist`, {
      url: getAbsoluteUrl(cleanUrl(url)),
    })
  }

  static async addWhitelistSubcategory(
    filterId: IFilter['id'],
    id: IFilterSubcategory['id']
  ) {
    return post(`filters/${filterId}/whitelist/categories`, {
      categoryId: id.toString(),
    })
  }

  static async removeWhitelistSubcategory(
    filterId: IFilter['id'],
    id: IFilterSubcategory['id']
  ) {
    return dellete(`filters/${filterId}/whitelist/categories/${id}`)
  }

  static async addWhitelistCategory(
    filterId: IFilter['id'],
    id: IFilterCategory['categoryId']
  ) {
    return post(`filters/${filterId}/whitelist/categories?isGroup=true`, {
      categoryId: id.toString(),
    })
  }

  static async removeWhitelistCategory(
    filterId: IFilter['id'],
    id: IFilterCategory['categoryId']
  ) {
    return dellete(
      `filters/${filterId}/whitelist/categories/${id}?isGroup=true`
    )
  }

  static async getBlockedSearchWords(filterId: IFilter['id']) {
    return get(`filters/${filterId}/blacklist/words`).then((response: any) =>
      response.json()
    )
  }

  static async addBlockedSearchWord(filterId: IFilter['id'], word: string) {
    return post(`filters/${filterId}/blacklist/words`, { word })
  }

  static async removeBlockedSearchWord(filterId: IFilter['id'], word: string) {
    return dellete(`filters/${filterId}/blacklist/words/${word}`)
  }

  static async getRequestedSites(deviceId: IDevice['id']) {
    return get(`devices/${deviceId}/requests?status=pending`).then(
      (response: any) => response.json()
    )
  }

  static async approveRequestedSite(id: IRequestedSite['id']) {
    return post(`devices/requests/${id}/approve`, {})
  }

  static async denyRequestedSite(id: IRequestedSite['id']) {
    return dellete(`devices/requests/${id}/deny`)
  }

  static async getLinkPreview(url: ILink['url']) {
    return get(`content/links/preview/${url}`).then((response: any) =>
      response.json()
    )
  }

  static async getVideoPreview(url: IVideo['url']) {
    return get(`content/videos/preview/${url}`).then((response: any) =>
      response.json()
    )
  }

  static async getChannelPreview(url: IChannel['url']) {
    return get(`content/channels/preview/${url}`).then((response: any) =>
      response.json()
    )
  }

  static async setTimeLimit(
    limitId: ITimeLimit['id'],
    timeLimit: ITimeLimit['allowedMinutes']
  ) {
    return patch(`devices/configs/screentime/limits/${limitId}`, { timeLimit })
  }

  static async addAllowedTimeRange(
    deviceId: IDevice['id'],
    day: IAllowedTime['day'],
    startTime: IAllowedTime['startTime'],
    endTime: IAllowedTime['endTime']
  ) {
    return post(`devices/${deviceId}/config/screentime/allowed`, {
      startTime,
      endTime,
    })
  }

  static async changeAllowedTimeRange(
    id: IAllowedTime['id'],
    startTime: IAllowedTime['startTime'],
    endTime: IAllowedTime['endTime']
  ) {
    return patch(`devices/configs/screentime/allowed/${id}`, {
      startTime,
      endTime,
    })
  }

  static async removeAllowedTimeRange(id: IAllowedTime['id']) {
    return dellete(`devices/configs/screentime/allowed/${id}`)
  }

  static async resetAllowedTimes(
    deviceId: IDevice['id'],
    day: IAllowedTime['day']
  ) {
    return put(
      `devices/${deviceId}/config/screentime/allowed/reset?day=${day}`,
      {}
    )
  }

  static async flipBrowsingAllowed(
    deviceId: IDevice['id'],
    browsingAllowed: boolean
  ) {
    return patch(`devices/${deviceId}/configs/browsing`, { browsingAllowed })
  }

  static async getQRCode(groupId: IGroup['id']) {
    return post(`groups/${groupId}/devices/qrcode`, {}).then((response: any) =>
      response.text()
    )
  }

  static async flipTimeLimitsEnabled(
    deviceId: IDevice['id'],
    enabled: boolean
  ) {
    return patch(`devices/${deviceId}/config/screentime/toggle`, {
      timeLimitsEnabled: enabled,
    })
  }

  static async flipAllowedTimesEnabled(
    deviceId: IDevice['id'],
    enabled: boolean
  ) {
    return patch(`devices/${deviceId}/config/screentime/toggle`, {
      allowedTimesEnabled: enabled,
    })
  }

  static async getStats(
    deviceId: IDevice['id'],
    startDate: string,
    endDate: string
  ) {
    return get(
      `devices/${deviceId}/statistics?startDate=${startDate}&endDate=${endDate}`
    ).then((response: any) => response.json())
  }

  static async getHistory(
    deviceId: IDevice['id'],
    date: string,
    pageIndex: number,
    pageSize: number,
    searchTerm?: string
  ) {
    return get(
      `devices/${deviceId}/history?date=${date}&page=${pageIndex}&limit=${pageSize}${
        searchTerm ? `&search=${searchTerm}` : ''
      }`
    ).then((response: any) => response.json())
  }

  static async getApps(
    deviceId: IDevice['id'],
    pageIndex: number,
    pageSize: number,
    categoryId?: IFilterSubcategory['categoryId'],
    searchTerm?: string
  ) {
    return get(
      `devices/${deviceId}/apps?page=${pageIndex}&limit=${pageSize}${
        searchTerm ? `&search=${searchTerm}` : ''
      }${categoryId ? `&categoryId=${categoryId}` : ''}`
    ).then((response: any) => response.json())
  }

  static async enableApp(deviceId: IDevice['id'], appId: IApp['id']) {
    return post(`devices/${deviceId}/apps/${appId}/enable`, {})
  }

  static async disableApp(deviceId: IDevice['id'], appId: IApp['id']) {
    return dellete(`devices/${deviceId}/apps/${appId}/disable`)
  }

  static async updateUser(
    id: IUser['id'],
    realName: IUser['realName'],
    displayName: IUser['displayName']
  ) {
    return put(`users/${id}`, { realName, displayName })
  }

  static async getChannel(id: IChannel['id']) {
    return get(`content/channels/${id}`).then((response: any) =>
      response.json()
    )
  }

  static async changeChannelName(id: IChannel['id'], title: IChannel['title']) {
    return put(`content/channels/${id}`, { title })
  }
}

export default ApiController
