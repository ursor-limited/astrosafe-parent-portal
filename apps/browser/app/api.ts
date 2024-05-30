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

const BACKEND_URLS = {
  development: "http://localhost:8080",
  preview:
    "https://058vkvcapb.execute-api.eu-west-1.amazonaws.com/dev/dev-ursor-express-serverless",
  production: "https://xdt8565hsf.execute-api.eu-west-1.amazonaws.com/prod/api",
};

export const getAbsoluteUrl = (url: string) => `https://${url}`;

const get = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`
  );

//@ts-ignore
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

const patch = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "PATCH",
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

class ApiController {
  // static async getSchool(id: string) {
  //   return get(`schools/${id}`).then((response: any) => response.json());
  // }
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
}

export default ApiController;
