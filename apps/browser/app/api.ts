import {
  AstroContent,
  IChannel,
  IContent,
  IContentBucket,
  IDevice,
} from "./home/HomePageContents";

export type ContentAgeMode = "trailblazer" | "explorer" | "adventurer";

const BACKEND_URLS = {
  development: "https://api.astrosafe.co",
  preview: "https://api.astrosafe.co",
  production: "https://api.astrosafe.co",
};

export const getAbsoluteUrl = (url: string) => `https://${url}`;

export const getPrefixRemovedUrl = (url: string) =>
  url
    .replace(/^(https\:\/\/)/, "")
    .replace(/^(http\:\/\/)/, "")
    .replace(/^(www\.)/, "");

const get = (route: string) =>
  fetch(
    `${
      //@ts-ignore
      BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV || "development"]
    }/${route}`
  );

//@ts-ignore
const post = (route: string, body?: any) =>
  fetch(
    `${
      //@ts-ignore
      BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV || "development"]
    }/${route}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    }
  );

const dellete = (route: string) =>
  fetch(
    `${
      //@ts-ignore
      BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV || "development"]
    }/${route}`,
    {
      method: "DELETE",
    }
  );

class ApiController {
  static async getFolder(id: IContentBucket["id"]) {
    return get(`content/buckets/${id}`).then((response: any) =>
      response.json()
    );
  }
  static async getDeviceFolders(id: IDevice["id"]) {
    return get(`content/buckets?deviceId=${id}`).then((response: any) =>
      response.json()
    );
  }
  static async getDeviceServices(id: IDevice["id"]) {
    // return get(`content/buckets/device/${id}`).then((response: any) =>
    //   response.json()
    // );
  }
  static async getFavorites(id: IDevice["id"]) {
    return get(`devices/${id}/favorites`).then((response: any) =>
      response.json()
    );
  }
  static async setFavorite(
    id: IDevice["id"],
    contentId: IContent["id"],
    contentType: AstroContent
  ) {
    return post(`devices/${id}/favorites`, { contentId, contentType });
  }
  static async removeFavorite(
    id: IDevice["id"],
    contentId: IContent["id"],
    contentType: AstroContent
  ) {
    return dellete(`devices/${id}/favorites/${contentType}/${contentId}`);
  }

  static async getHistory(
    deviceId: IDevice["id"],
    pageIndex: number,
    pageSize: number,
    searchTerm?: string
  ) {
    return get(
      `devices/${deviceId}/history?page=${pageIndex}&limit=${pageSize}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`
    ).then((response: any) => response.json());
  }

  static async getApps(
    deviceId: IDevice["id"],
    pageIndex: number,
    pageSize: number,
  ) {
    return get(
      `devices/${deviceId}/apps?page=${pageIndex}&limit=${pageSize}`
    ).then((response: any) => response.json());
  }

  static async getChannel(id: IChannel['id']) {
    return get(`content/channels/${id}`).then((response: any) => response.json());
  }
}

export default ApiController;
