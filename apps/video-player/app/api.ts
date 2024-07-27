import { IUser } from "./account/contents/common";
import { IGroup } from "./folders/[id]/contents/common";
import { IDevice } from "./filters/[id]/contents/common";
import {
  IFilter,
  IFilterCategory,
  IFilterUrl,
} from "./filters/contents/common";
import {
  IChannel,
  IContentBucket,
  ILink,
  IVideo,
} from "./profiles/[id]/components/ContentTab";
import _ from "lodash";

export interface IVideo_DEPRECATED {
  id: string;
  creatorId: string;
  url: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  startTime?: number;
  endTime?: number;
  comments: IVideoComment[];
  createdAt: string;
  updatedAt: string;
}

export interface IVideoComment {
  id: string;
  value: string;
  time: number;
}

const BACKEND_URLS = {
  development: "https://api.astrosafe.co",
  preview: "https://api.astrosafe.co",
  production: "https://api.astrosafe.co",
};

export const getAbsoluteUrl = (url: string) => `https://${url}`;

const get = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`
  );

const post = (route: string, body?: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    }
  );

const put = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

const dellete = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "DELETE",
    }
  );

// const api = axios.create({
//   //@ts-ignore
//   baseURL: BACKEND_URLS[process.env.REACT_APP_BUILD_ENV],
// });

// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     Sentry.captureException(error);
//     throw error;
//   }
// );

// axiosRetry(api, {
//   retries: 3, // number of retries
//   retryDelay: (retryCount: number) => {
//     console.log(`retry attempt: ${retryCount}`);
//     return retryCount * 2000; // time interval between retries
//   },
// });

class ApiController {
  static async getDevice(id: number) {
    return get(`devices/${id}`).then((response: any) => response.json());
  }

  static async renameDevice(id: IDevice["id"], name: IDevice["name"]) {
    return put(`devices/${id}`, { name });
  }

  static async getGroupDevices(id: IGroup["id"]) {
    return get(`devices?groupId=${id}`).then((response: any) =>
      response.json()
    );
  }

  static async getFolderDevices(id: IContentBucket["id"]) {
    return get(`devices?contentBucketId=${id}`).then((response: any) =>
      response.json()
    );
  }

  static async getDeviceFolders(id: IDevice["id"]) {
    return get(`content/buckets?deviceId=${id}&includePreview=true`).then((response: any) =>
      response.json()
    );
  }

  static async addFolderToDevice(
    folderId: IContentBucket["id"],
    deviceId: IDevice["id"]
  ) {
    return post(`content/buckets/${folderId}/devices`, { deviceId });
  }

  static async removeFolderFromDevice(
    folderId: IContentBucket["id"],
    deviceId: IDevice["id"]
  ) {
    return dellete(`content/buckets/${folderId}/devices/${deviceId}`);
  }

  static async createFolder(
    title: IContentBucket["title"],
    groupId: IContentBucket["groupId"]
  ) {
    return post("content/buckets", { title, groupId }).then((response: any) =>
      response.json()
    );
  }

  static async getFolder(id: number) {
    return get(`content/buckets/${id}`).then((response: any) =>
      response.json()
    );
  }

  static async getGroupFolders(id: number) {
    return get(`content/buckets/group/${id}`).then((response: any) =>
      response.json()
    );
  }

  static async renameFolder(id: number, title: IContentBucket["title"]) {
    return put(`content/buckets/${id}`, { title });
  }

  static async createLink(
    title: ILink["title"],
    url: ILink["url"],
    thumbnailUrl: ILink["thumbnailUrl"],
    contentBucketId: IContentBucket["id"]
  ) {
    return post(`content/links`, { title, url, thumbnailUrl, contentBucketId });
  }

  static async updateLink(
    id: ILink["id"],
    title: ILink["title"],
    url: ILink["url"],
    thumbnailUrl: ILink["thumbnailUrl"]
  ) {
    return put(`content/links/${id}`, { title, url, thumbnailUrl });
  }

  static async deleteLink(id: ILink["id"]) {
    return dellete(`content/links/${id}`);
  }

  static async createVideo(
    title: ILink["title"],
    url: ILink["url"],
    thumbnailUrl: ILink["thumbnailUrl"],
    contentBucketId: IContentBucket["id"]
  ) {
    return post(`content/videos`, {
      title,
      url,
      thumbnailUrl,
      contentBucketId,
    });
  }

  static async updateVideo(
    id: IVideo["id"],
    title: IVideo["title"],
    url: IVideo["url"],
    thumbnailUrl: IVideo["thumbnailUrl"]
  ) {
    return put(`content/videos/${id}`, { title, url, thumbnailUrl });
  }

  static async deleteVideo(id: IVideo["id"]) {
    return dellete(`content/videos/${id}`);
  }

  static async createChannel(
    title: IChannel["title"],
    url: IChannel["url"],
    bannerUrl: IChannel["bannerUrl"],
    profileUrl: IChannel["profileUrl"],
    contentBucketId: IContentBucket["id"]
  ) {
    return post(`content/channels`, {
      title,
      url,
      bannerUrl,
      profileUrl,
      contentBucketId,
    });
  }

  static async updateChannel(
    id: IChannel["id"],
    title: IChannel["title"],
    url: IChannel["url"],
    bannerUrl: IChannel["bannerUrl"],
    profileUrl: IChannel["profileUrl"]
  ) {
    return put(`content/channels/${id}`, {
      title,
      url,
      bannerUrl,
      profileUrl,
    });
  }

  static async deleteChannel(id: ILink["id"]) {
    return dellete(`content/channels/${id}`);
  }

  static async getUser(id: IUser["id"]) {
    return get(`users/${id}`).then((response: any) => response.json());
  }

  static async getGroupUsers(id: IUser["id"]) {
    return get(`users/${id}`).then((response: any) => response.json());
  }

  static async createUser(email: IUser["email"]) {
    return post("users", { email, realName: "", displayName: "" });
  }

  static async createFilter(groupId: IGroup["id"], title: IFilter["title"]) {
    return post(`groups/${groupId}/filters`, { title }).then((response: any) =>
      response.json()
    );
  }

  static async getFilter(id: IFilter["id"]) {
    return get(`filters/${id}`).then((response: any) => response.json());
  }

  static async getGroupFilters(id: IGroup["id"]) {
    return get(`filters?groupId=${id}`).then((response: any) =>
      response.json()
    );
  }

  static async getAllFilterCategories() {
    return get("filters/categories").then((response: any) => response.json());
  }

  static async getFilterCategories(id: IFilter["id"]) {
    return get(`filters/${id}/whitelist/categories`).then((response: any) =>
      response.json()
    );
  }

  static async getFilterDevices(id: IFilter["id"]) {
    return get(`devices?filterId=${id}`).then((response: any) =>
      response.json()
    );
  }

  static async addFilterToDevice(
    filterId: IFilter["id"],
    deviceId: IDevice["id"]
  ) {
    return post(`filters/${filterId}/devices`, { deviceId });
  }

  static async getWhitelistExceptions(filterId: IFilter["id"]) {
    return get(`filters/${filterId}/whitelist/exceptions`).then(
      (response: any) => response.json()
    );
  }

  static async getBlacklistExceptions(filterId: IFilter["id"]) {
    return get(`filters/${filterId}/blacklist/exceptions`).then(
      (response: any) => response.json()
    );
  }

  static async addWhitelistException(
    filterId: IFilter["id"],
    url: IFilterUrl["url"]
  ) {
    return post(`filters/${filterId}/whitelist/exceptions`, { url, title: _.uniqueId() });
  }

  static async addBlacklistException(
    filterId: IFilter["id"],
    url: IFilterUrl["url"]
  ) {
    return post(`filters/${filterId}/blacklist/exceptions`,  { url, title: _.uniqueId() });
  }

  static async addWhitelistCategory(
    filterId: IFilter["id"],
    categoryId: IFilterCategory["categoryId"]
  ) {
    return post(`filters/${filterId}/whitelist/categories`, {
      categoryId: categoryId.toString(),
    });
  }

  static async removeWhitelistCategory(
    filterId: IFilter["id"],
    categoryId: IFilterCategory["categoryId"]
  ) {
    return dellete(`filters/${filterId}/whitelist/categories/${categoryId}`);
  }

  static async getBlockedSearchWords(filterId: IFilter["id"]) {
    return get(`filters/${filterId}/blacklist/words`).then((response: any) =>
      response.json()
    );
  }

  static async addBlockedSearchWord(filterId: IFilter["id"], word: string) {
    return post(`filters/${filterId}/blacklist/words`, { word });
  }

  static async removeBlockedSearchWord(filterId: IFilter["id"], word: string) {
    return dellete(`filters/${filterId}/blacklist/words/${word}`);
  }
}

export default ApiController;
