import { BrowserContent } from "./home/AstroContentColumns";
import { IContentBucket, IDevice } from "./home/HomePageContents";

export type ContentAgeMode = "trailblazer" | "explorer" | "adventurer";

const BACKEND_URLS = {
  development: "https://api.astrosafe.co",
  preview:
    "https://api.astrosafe.co",
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

const patch = (route: string, body: any) =>
  fetch(
    `${
      //@ts-ignore
      BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV || "development"]
    }/${route}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

class ApiController {
  static async getFolder(id: IContentBucket['id']) {
    return get(`content/buckets/${id}`).then((response: any) =>
      response.json()
    );
  }
  static async getDeviceFolders(id: IDevice['id']) {
    return get(`devices/${id}/content/buckets`).then((response: any) =>
      response.json()
    );
  }
  static async getDeviceServices(id: IDevice['id']) {
    // return get(`content/buckets/device/${id}`).then((response: any) =>
    //   response.json()
    // );
  }
  static async getFavorites(id: IDevice['id']) {
    return get(`devices/${id}/favorites`).then((response: any) =>
      response.json()
    );
  }
  // static async getChannels(deviceId: string) {
  //   return get(`schools/devices/${deviceId}/channels`).then((response: any) =>
  //     response.json()
  //   );
  // }
  // static async getGuestChannels() {
  //   return get(`schools/guest/guestchannels`).then((response: any) =>
  //     response.json()
  //   );
  // }

  // static async getStacks(deviceId: string) {
  //   return get(`schools/devices/${deviceId}/stacks`).then((response: any) =>
  //     response.json()
  //   );
  // }

  // static async getLinks(deviceId: string) {
  //   return get(`schools/devices/${deviceId}/links`).then((response: any) =>
  //     response.json()
  //   );
  // }
  // static async getGuestLinks() {
  //   return get(`schools/guest/guestlinks`).then((response: any) =>
  //     response.json()
  //   );
  // }
  // static async getApps(deviceId: string) {
  //   return get(`schools/devices/${deviceId}/platforms`).then((response: any) =>
  //     response.json()
  //   );
  // }
  // static async getGuestApps() {
  //   return get(`schools/guest/guestplatforms`).then((response: any) =>
  //     response.json()
  //   );
  // }
  // static async getVideoChannels(deviceId: string) {
  //   return get(`schools/devices/${deviceId}/videoChannels`).then(
  //     (response: any) => response.json()
  //   );
  // }
  // static async getVideos(deviceId: string) {
  //   return get(`schools/devices/${deviceId}/videos`).then((response: any) =>
  //     response.json()
  //   );
  // }

  // static async getStackLinks(stackId: string) {
  //   return get(`stacks/${stackId}/links`).then((response: any) =>
  //     response.json()
  //   );
  // }
  // static async switchFavorite(
  //   deviceId: string,
  //   contentId: string,
  //   contentType: BrowserContent
  // ) {
  //   return patch(`schools/devices/${deviceId}/favorite`, {
  //     contentId,
  //     contentType,
  //   }).then((response: any) => response.json());
  // }

  // static async getDevice(deviceId: string) {
  //   return get(`schools/devices/${deviceId}`).then((response: any) =>
  //     response.json()
  //   );
  // }

  // static async verifyJoinCode(joinCode: string) {
  //   return post("schools/verifySchool", {
  //     joinCode,
  //   }).then((response: any) => response.json());
  // }

  // static async addDeviceToSchool(schoolId: string, name: string, nativeDeviceId: string) {
  //   return post(`schools/${schoolId}/addDevice`, {
  //     name,
  //     nativeDeviceId,
  //     type: "android",
  //   }).then((response: any) => response.json());
  // }

  // static async getDiscoverContents(deviceId: string) {
  //   return get(`schools/disc/over`).then((response: any) => response.json());
  // }
}

export default ApiController;
