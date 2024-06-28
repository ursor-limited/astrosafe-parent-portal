import { BrowserContent } from "./home/AstroContentColumns";

export interface ISchool {
  id: string;
  name: string;
  email?: string;
  emailDomain?: string;
  website?: string;
  address?: string;
  postcode?: string;
  country?: string;
  isDeleted: boolean;
  devices: IDevice[];
  lock?: ILock;
  joinCode: string;
  teacherCode: string;
  ownerId: string;
  deviceLimit?: number;
  teacherLimit: number;
  expirationDate?: string;
  free?: boolean;
}

export interface ILock {
  devices: string[];
  endTime: string;
}

export type ContentAgeMode = "trailblazer" | "explorer" | "adventurer";

export interface IDevice {
  id: string;
  name: string;
  lastOnline?: string;
  history: { studentId: string; startTime: string; endTime?: string }[];
  connected?: "approved" | "denied";
  reviewerId?: string;
  type: "chrome" | "ipad";
  contentAgeMode: ContentAgeMode;
}

export interface IChannel {
  id: string;
  creatorId?: string;
  schoolId: string;
  title: string;
  nLinks: number;
  nStacks: number;
  starter?: boolean;
  color: string;
}

export interface IStack {
  id: string;
  creatorId?: string;
  schoolId: string;
  channelId: string;
  title: string;
  description?: string;
  imageUrls: string[];
  backgroundColors: string[];
  createdAt: string;
  nLinks: number;
}

export interface IBrowserLink {
  id: string;
  creatorId?: string;
  schoolId: string;
  channelId: string;
  stackId?: string;
  title: string;
  url: string;
  accessibleUrl: string;
  imageUrl: string;
  color: string;
  starter?: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface IPlatform {
  id: string;
  title: string;
  url: string;
  accessibleUrl: string;
  img: string;
  yearGroups: number[];
  schoolId: string;
  creatorId: string;
  installed: boolean;
}

export interface IVideoChannel {
  id: string;
  creatorId?: string;
  schoolId: string;
  nativeId: string; // the youtube or vimeo id
  title: string;
  bannerImageUrl: string;
  profileImageUrl: string;
}

export interface IVideo {
  id: string;
  creatorId: string;
  videoChannelId: string;
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
  development: "http://localhost:8080",
  preview:
    "https://058vkvcapb.execute-api.eu-west-1.amazonaws.com/dev/dev-ursor-express-serverless",
  production: "https://xdt8565hsf.execute-api.eu-west-1.amazonaws.com/prod/api",
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
  static async getChannels(deviceId: string) {
    return get(`schools/devices/${deviceId}/channels`).then((response: any) =>
      response.json()
    );
  }
  static async getGuestChannels() {
    return get(`schools/guest/guestchannels`).then((response: any) =>
      response.json()
    );
  }

  static async getStacks(deviceId: string) {
    return get(`schools/devices/${deviceId}/stacks`).then((response: any) =>
      response.json()
    );
  }

  static async getLinks(deviceId: string) {
    return get(`schools/devices/${deviceId}/links`).then((response: any) =>
      response.json()
    );
  }
  static async getGuestLinks() {
    return get(`schools/guest/guestlinks`).then((response: any) =>
      response.json()
    );
  }
  static async getApps(deviceId: string) {
    return get(`schools/devices/${deviceId}/platforms`).then((response: any) =>
      response.json()
    );
  }
  static async getGuestApps() {
    return get(`schools/guest/guestplatforms`).then((response: any) =>
      response.json()
    );
  }
  static async getVideoChannels(deviceId: string) {
    return get(`schools/devices/${deviceId}/videoChannels`).then(
      (response: any) => response.json()
    );
  }
  static async getVideos(deviceId: string) {
    return get(`schools/devices/${deviceId}/videos`).then((response: any) =>
      response.json()
    );
  }

  static async getStackLinks(stackId: string) {
    return get(`stacks/${stackId}/links`).then((response: any) =>
      response.json()
    );
  }
  static async switchFavorite(
    deviceId: string,
    contentId: string,
    contentType: BrowserContent
  ) {
    return patch(`schools/devices/${deviceId}/favorite`, {
      contentId,
      contentType,
    }).then((response: any) => response.json());
  }

  static async getDevice(deviceId: string) {
    return get(`schools/devices/${deviceId}`).then((response: any) =>
      response.json()
    );
  }

  static async verifyJoinCode(joinCode: string) {
    return post("schools/verifySchool", {
      joinCode,
    }).then((response: any) => response.json());
  }

  static async addDeviceToSchool(schoolId: string, name: string, nativeDeviceId: string) {
    return post(`schools/${schoolId}/addDevice`, {
      name,
      nativeDeviceId,
      type: "android",
    }).then((response: any) => response.json());
  }

  static async getDiscoverContents(deviceId: string) {
    return get(`schools/disc/over`).then((response: any) => response.json());
  }
}

export default ApiController;
